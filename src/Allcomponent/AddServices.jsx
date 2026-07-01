import React, { useContext } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import { ThemeContext } from "../Context/ThemeContext";

function LocationMarker({ setFormData }) {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await res.json();
        setFormData(prev => ({ ...prev, location: { lat, lng, address: data.display_name } }));
      } catch (err) { console.error(err); }
    },
  });
  return null;
}

// التعديل هنا: إضافة = {} كقيمة افتراضية للـ config
export default function AddServices({ config = {}, formData, setFormData, onNext, children }) {
  const { mode } = useContext(ThemeContext);
  const isDark = mode === "dark";

  const cardStyle = { 
    backgroundColor: isDark ? '#1e1e1e' : '#FFFFFF', 
    padding: '24px', borderRadius: '16px', marginBottom: '24px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
  };

  return (
    <div style={{ padding: '40px 20px', backgroundColor: isDark ? '#121212' : '#FFF8F6', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* التعديل هنا: استخدام ?. للحماية من الخطأ */}
        {config?.bannerImage && (
          <div style={cardStyle}>
            <img src={config.bannerImage} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px' }} />
          </div>
        )}

        <h1 style={{ textAlign: 'center' }}>{config?.title}</h1>

        <div style={cardStyle}>
          {children}
        </div>

        {config?.showMap && (
          <div style={cardStyle}>
            <MapContainer center={[24.7136, 46.6753]} zoom={13} style={{ height: "250px" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker setFormData={setFormData} />
            </MapContainer>
          </div>
        )}

        <div style={{ textAlign: 'center' }}>
          <button onClick={onNext} style={{ padding: '12px 48px', borderRadius: '30px', border: 'none', backgroundColor: '#be185d', color: '#FFF' }}>
            {config?.buttonText || "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}