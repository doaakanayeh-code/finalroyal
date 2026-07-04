import React, { useEffect, useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import axiosClient from "../Api/axiosClient"; // عدّلي المسار إذا مختلف عندك
import Formdialog, { extractErrorMessage } from "./Formdialog";
const SERVICE_TYPE_OPTIONS = [
  { value: 'decoration', label: 'تنسيق' },
  { value: 'cake', label: 'كيك' },
  { value: 'hall', label: 'قاعة' },
  { value: 'photographer', label: 'تصوير' },
  { value: 'music', label: 'موسيقى' },
  { value: 'public_event', label: 'فعالية عامة' },
];

// ============================================================
// مودال تعديل خدمة - بيستدعي تابع update($id) بالباك اند
// ============================================================
export default function EditServiceModal({ serviceId, open, onClose, onUpdated }) {
  const [cities, setCities] = useState([]);
  const [form, setForm] = useState({
    name: '',
    service_type: '', // ⚠️ الباك اند بيطلبها required حتى بالتعديل - لازم تجي من بيانات الخدمة الحقيقية
    price: '',
    city_id: '',
    address_name: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (!open) return;
    axiosClient.get('/api/cities')
      .then(res => setCities(res.data.data || res.data || []))
      .catch(() => setCities([]));

    // ⚠️ TODO: هون لازم نجيب بيانات الخدمة الحقيقية الحالية ونعبّي الفورم فيها، مثلاً:
    // axiosClient.get(`/api/provider/services/${serviceId}`).then(res => setForm(res.data.data));
    // حالياً الفورم بتفتح فاضية لأنه ما في راوت "عرض خدمة وحدة" أعطيتيني ياه لسا.
  }, [open, serviceId]);

  const handleSave = async () => {
    setError(null);
    setSuccess(null);

    if (!form.service_type) {
      setError('نوع الخدمة مطلوب (لازم يجي من بيانات الخدمة الأصلية).');
      return;
    }

    setIsSaving(true);
    try {
      const fd = new FormData();
      fd.append('_method', 'PUT'); // Laravel method spoofing - ضرورية لأنه multipart ما بيدعم PUT مباشرة
      Object.entries(form).forEach(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          fd.append(key, value);
        }
      });

      // ⚠️ عدّلي المسار حسب الراوت الحقيقي المربوط بـ update()
      const { data } = await axiosClient.post(`/api/provider/services/${serviceId}`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccess(data.message || 'تم التعديل بنجاح.');
      if (onUpdated) onUpdated(data);
    } catch (err) {
      setError(extractErrorMessage(err, 'حصل خطأ أثناء التعديل.'));
    } finally {
      setIsSaving(false);
    }
  };

  const cityOptions = cities.map(c => ({ value: c.id, label: c.name }));

  return (
    <Formdialog
      open={open}
      onClose={onClose}
      icon={<CalendarMonthIcon sx={{ color: "#fff", fontSize: 26 }} />}
      title={`تعديل الخدمة #${serviceId}`}
      error={error}
      success={success}
      isSaving={isSaving}
      onSave={handleSave}
      fields={[
        {
          name: 'service_type',
          type: 'select',
          label: 'نوع الخدمة *',
          value: form.service_type,
          onChange: (v) => setForm({ ...form, service_type: v }),
          options: SERVICE_TYPE_OPTIONS,
          helperText: '⚠️ لازم يجي من بيانات الخدمة الأصلية - حالياً اختاري يدوياً للتجربة',
        },
        {
          name: 'name',
          type: 'text',
          label: 'اسم الخدمة',
          value: form.name,
          onChange: (v) => setForm({ ...form, name: v }),
        },
        {
          name: 'price',
          type: 'number',
          label: 'السعر',
          value: form.price,
          onChange: (v) => setForm({ ...form, price: v }),
        },
        {
          name: 'city_id',
          type: 'select',
          label: 'المدينة',
          value: form.city_id,
          onChange: (v) => setForm({ ...form, city_id: v }),
          options: cityOptions,
        },
        {
          name: 'address_name',
          type: 'text',
          label: 'العنوان',
          value: form.address_name,
          onChange: (v) => setForm({ ...form, address_name: v }),
        },
      ]}
    />
  );
}