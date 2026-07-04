import React, { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt, FaVideo, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { ThemeContext } from "../Context/ThemeContext";
import axiosClient from "../Api/axiosClient";

function LocationMarker({ setFormData }) {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await res.json();
        setFormData(prev => ({
          ...prev,
          latitude: lat,
          longitude: lng,
          address_name: data.display_name || prev.address_name,
        }));
      } catch (err) {
        console.error(err);
      }
    },
  });
  return null;
}

// يحوّل formData (فيها ملفات ومصفوفات متداخلة) إلى FormData حقيقي بصيغة يفهمها Laravel
function buildFormData(data, form = new FormData(), parentKey = null) {
  if (data === null || data === undefined) return form;

  if (data instanceof File) {
    form.append(parentKey, data);
    return form;
  }

  if (Array.isArray(data) || (typeof data === 'object' && !(data instanceof File))) {
    Object.keys(data).forEach((key) => {
      const value = data[key];
      const formKey = parentKey ? `${parentKey}[${key}]` : key;
      if (value instanceof File || typeof value !== 'object' || value === null) {
        if (value !== null && value !== undefined && value !== '') {
          form.append(formKey, value);
        }
      } else {
        buildFormData(value, form, formKey);
      }
    });
    return form;
  }

  form.append(parentKey, data);
  return form;
}

export default function AddServices({ config = {}, serviceType, formData, setFormData, onNext, onSuccess, children }) {
  const { mode } = useContext(ThemeContext);
  const isDark = mode === "dark";

  const [cities, setCities] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  useEffect(() => {
    // عدّلي هالمسار حسب راوت جلب المدن الحقيقي عندك
    axiosClient.get('/api/cities')
      .then(res => setCities(res.data.data || res.data || []))
      .catch((err) => {
        console.error('فشل جلب المدن:', err.response?.status, err.response?.data || err.message);
        setCities([]);
      });
  }, []);

  const colors = {
    bg: isDark ? '#121212' : '#FFF8F6',
    card: isDark ? '#1e1e1e' : '#FFFFFF',
    border: isDark ? '#2d2d2d' : '#f1dede',
    text: isDark ? '#f5f5f5' : '#2d1f1f',
    subtext: isDark ? '#a8a8a8' : '#8a7a7a',
    accent: '#be185d',
    accentSoft: isDark ? '#3a1a28' : '#fce7f0',
    inputBg: isDark ? '#252525' : '#fff',
  };

  const cardStyle = {
    backgroundColor: colors.card,
    padding: '28px',
    borderRadius: '20px',
    marginBottom: '24px',
    border: `1px solid ${colors.border}`,
    boxShadow: isDark ? 'none' : '0 8px 24px rgba(190,24,93,0.06)',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: colors.text,
  };

  const inputStyle = {
    width: '100%',
    padding: '13px 16px',
    borderRadius: '12px',
    marginBottom: '18px',
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.inputBg,
    color: colors.text,
    fontSize: '15px',
    boxSizing: 'border-box',
    outline: 'none',
  };

  const handleSubmit = async () => {
    setSubmitError(null);
    setSubmitSuccess(null);

    if (!formData.name) {
      setSubmitError('اسم الخدمة مطلوب.');
      return;
    }
    if (!formData.latitude || !formData.longitude || !formData.address_name) {
      setSubmitError('لازم تحددي الموقع بالضغط على الخريطة.');
      return;
    }
    if (!formData.city_id) {
      setSubmitError('لازم تختاري المدينة.');
      return;
    }
    if (!formData.images || formData.images.length === 0) {
      setSubmitError('لازم ترفعي صورة واحدة على الأقل.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { videoPreviewUrl, ...cleanData } = formData;
      const cleanImages = (cleanData.images || []).map(({ previewUrl, ...rest }) => rest);
      const payload = { ...cleanData, images: cleanImages, service_type: serviceType };
      const form = buildFormData(payload);

      // عدّلي المسار حسب راوت إضافة الخدمة الحقيقي عندك
      const { data } = await axiosClient.post('/api/provider/services', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSubmitSuccess(data.message || 'تم حفظ الخدمة بنجاح.');
      if (onSuccess) onSuccess(data);
      if (onNext) onNext(data);
    } catch (err) {
      const res = err.response?.data;
      let msg = res?.message || 'حصل خطأ أثناء حفظ الخدمة.';
      if (res?.errors) {
        const firstError = Object.values(res.errors)[0];
        msg = Array.isArray(firstError) ? firstError[0] : msg;
      }
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '40px 20px', backgroundColor: colors.bg, minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {config?.bannerImage && (
          <div style={{ ...cardStyle, padding: 0, overflow: 'hidden', position: 'relative' }}>
            <img
              src={config.bannerImage}
              alt=""
              style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent 60%)',
              display: 'flex', alignItems: 'flex-end', padding: '24px',
            }}>
              <h1 style={{ color: '#fff', fontSize: '32px', fontWeight: '800', margin: 0 }}>
                {config?.title}
              </h1>
            </div>
          </div>
        )}

        {!config?.bannerImage && (
          <h1 style={{ textAlign: 'center', color: colors.text, fontSize: '30px', fontWeight: '800', marginBottom: '24px' }}>
            {config?.title}
          </h1>
        )}

        {(submitError || submitSuccess) && (
          <div style={{
            ...cardStyle,
            display: 'flex', alignItems: 'center', gap: '10px',
            backgroundColor: submitSuccess ? (isDark ? '#12301c' : '#e6f4ea') : (isDark ? '#3a1616' : '#fdecea'),
            border: `1px solid ${submitSuccess ? '#7fc79a' : '#f3b8b8'}`,
            color: submitSuccess ? '#2e7d4f' : '#c0392b',
            fontWeight: '600',
          }}>
            {submitSuccess ? <FaCheckCircle /> : <FaExclamationCircle />}
            {submitSuccess || submitError}
          </div>
        )}

        {/* الحقول المشتركة لكل الخدمات */}
        <div style={cardStyle}>
          <label style={labelStyle}>اسم الخدمة *</label>
          <input
            type="text"
            placeholder="مثال: كيكة شوكولاتة فاخرة"
            value={formData.name || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            style={inputStyle}
          />

          <label style={labelStyle}>الفيديو (اختياري)</label>
          <div style={{ position: 'relative' }}>
            <input
              type="file"
              accept="video/mp4,video/quicktime,video/ogg"
              onChange={(e) => {
                const file = e.target.files[0];
                setFormData(prev => {
                  if (prev.videoPreviewUrl) URL.revokeObjectURL(prev.videoPreviewUrl);
                  return {
                    ...prev,
                    video: file,
                    videoPreviewUrl: file ? URL.createObjectURL(file) : null,
                  };
                });
              }}
              style={{ ...inputStyle, padding: '10px', marginBottom: formData.videoPreviewUrl ? '12px' : '18px' }}
            />
          </div>
          {formData.videoPreviewUrl && (
            <video
              src={formData.videoPreviewUrl}
              controls
              style={{ width: '100%', maxHeight: '260px', borderRadius: '14px', backgroundColor: '#000', marginBottom: '4px' }}
            />
          )}
        </div>

        {/* حقول خاصة بنوع الخدمة (تجي من الصفحة اللي فوق - Cake/Hall/...) */}
        <div style={cardStyle}>
          {children}
        </div>

        {/* الموقع */}
        <div style={cardStyle}>
          <label style={labelStyle}><FaMapMarkerAlt style={{ color: colors.accent }} /> المدينة *</label>
          <select
            value={formData.city_id || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, city_id: e.target.value }))}
            style={inputStyle}
          >
            <option value="">اختاري المدينة</option>
            {cities.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <label style={labelStyle}>اضغطي على الخريطة لتحديد الموقع بالضبط *</label>
          <div style={{ borderRadius: '14px', overflow: 'hidden', marginBottom: '12px' }}>
            <MapContainer center={[24.7136, 46.6753]} zoom={13} style={{ height: "280px", width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {formData.latitude && formData.longitude && (
                <Marker position={[formData.latitude, formData.longitude]} />
              )}
              <LocationMarker setFormData={setFormData} />
            </MapContainer>
          </div>
          {formData.address_name && (
            <div style={{ fontSize: '14px', color: colors.subtext }}>
              📍 {formData.address_name}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={{
              padding: '15px 56px',
              borderRadius: '999px',
              border: 'none',
              background: isSubmitting ? '#d98cae' : `linear-gradient(135deg, ${colors.accent}, #e0447a)`,
              color: '#FFF',
              fontSize: '16px',
              fontWeight: '700',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              boxShadow: '0 8px 20px rgba(190,24,93,0.35)',
            }}
          >
            {isSubmitting ? 'جاري الحفظ...' : (config?.buttonText || "Next")}
          </button>
        </div>
      </div>
    </div>
  );
}