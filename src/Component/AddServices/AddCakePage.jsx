import React, { useState } from 'react';
import AddServices from '../../Allcomponent/AddServices';
import PackageSystem from '../../Allcomponent/PackageSystem';

const DAYS = [
  { value: 'Saturday', label: 'السبت' },
  { value: 'Sunday', label: 'الأحد' },
  { value: 'Monday', label: 'الإثنين' },
  { value: 'Tuesday', label: 'الثلاثاء' },
  { value: 'Wednesday', label: 'الأربعاء' },
  { value: 'Thursday', label: 'الخميس' },
  { value: 'Friday', label: 'الجمعة' },
];

const FLAVORS = [
  { value: 'Chocolate', label: '🍫 شوكولاتة' },
  { value: 'Vanilla', label: '🍦 فانيليا' },
  { value: 'RedVelvet', label: '❤️ ريد فيلفت' },
  { value: 'Strawberry', label: '🍓 فراولة' },
  { value: 'Lemon', label: '🍋 ليمون' },
  { value: 'Pistachio', label: '🌰 فستق' },
  { value: 'Caramel', label: '🍮 كراميل' },
  { value: 'Coffee', label: '☕ قهوة' },
];

const FILLINGS = [
  { value: 'Nutella', label: '🍫 نوتيلا' },
  { value: 'Cream', label: '🥛 كريمة' },
  { value: 'Fruits', label: '🍇 فواكه طازجة' },
  { value: 'Caramel', label: '🍯 كراميل' },
  { value: 'Cheesecake', label: '🧀 تشيز كيك' },
  { value: 'Oreo', label: '🍪 أوريو' },
  { value: 'Pistachio', label: '🌰 فستق' },
];

const COLORS = [
  { value: 'White', label: '⚪ أبيض' },
  { value: 'Pink', label: '🩷 وردي' },
  { value: 'Gold', label: '🟡 ذهبي' },
  { value: 'Red', label: '🔴 أحمر' },
  { value: 'Brown', label: '🟤 بني' },
  { value: 'Black', label: '⚫ أسود' },
];

export default function AddCakePage() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    weight: '1KG',
    flavor: [],      // ⚠️ لازم array حسب رسالة الباك اند
    filling: [],      // ⚠️ لازم array حسب رسالة الباك اند
    colors: [],       // ⚠️ افتراض: array متعدد الاختيار - تأكدي من الباك اند
    working_days: '', // ⚠️ نص مفصول بفواصل (مثال: "Sunday,Monday") - الباك اند طلبها string مش array
    working_hours: '',// ⚠️ افتراض: نص حر مثل "10:00 - 22:00"
    quantity: '',
    description: '',
    delivery_type: '',// ⚠️ افتراض القيم: pickup / delivery / both - تأكدي من enum الحقيقي بالباك اند
    city_id: '',
    address_name: '',
    latitude: null,
    longitude: null,
    video: null,
    images: [],   // [{ file, price, title }] - MediaUploader لازم يعبّي هالشكل بالضبط
    packages: [], // [{ name, price, description, feature_ids, image_indices }]
  });

  const cakeConfig = {
    title: "Add Your Cake Design",
    bannerImage: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    buttonText: "Publish Cake Design",
  };

  const cardBoxStyle = {
    border: '1px solid #f1dede',
    padding: '20px',
    borderRadius: '14px',
    marginBottom: '18px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#2d1f1f',
  };

  const inputStyle = {
    width: '100%',
    padding: '13px 16px',
    borderRadius: '12px',
    marginBottom: '16px',
    border: '1px solid #f1dede',
    fontSize: '15px',
    boxSizing: 'border-box',
    outline: 'none',
  };

  const chipsWrapStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '16px',
  };

  // حقول بتخزن نتيجتها كنص مفصول بفواصل (مو array) - حسب متطلبات الباك اند الفعلية
  const STRING_FIELDS = ['working_days'];

  // تبديل عنصر داخل مصفوفة أو نص مفصول بفواصل (إضافة/حذف)
  const toggleArrayValue = (field, value) => {
    const isStringField = STRING_FIELDS.includes(field);
    setFormData(prev => {
      const current = isStringField
        ? (prev[field] ? prev[field].split(',').filter(Boolean) : [])
        : (prev[field] || []);
      const exists = current.includes(value);
      const updated = exists ? current.filter(v => v !== value) : [...current, value];
      return {
        ...prev,
        [field]: isStringField ? updated.join(',') : updated,
      };
    });
  };

  const renderChips = (options, field) => {
    const isStringField = STRING_FIELDS.includes(field);
    const currentValues = isStringField
      ? (formData[field] ? formData[field].split(',').filter(Boolean) : [])
      : (formData[field] || []);

    return (
      <div style={chipsWrapStyle}>
        {options.map(opt => {
          const active = currentValues.includes(opt.value);
          return (
            <button
              type="button"
              key={opt.value}
              onClick={() => toggleArrayValue(field, opt.value)}
              style={{
                padding: '9px 16px',
                borderRadius: '999px',
                border: active ? '2px solid #be185d' : '1px solid #f1dede',
              backgroundColor: active ? '#fce7f0' : '#fff',
              color: active ? '#be185d' : '#2d1f1f',
              fontWeight: active ? '700' : '500',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
    );
  };

  return (
    <AddServices
      config={cakeConfig}
      serviceType="cake"
      formData={formData}
      setFormData={setFormData}
      onSuccess={(data) => console.log('تم حفظ الكيك:', data)}
    >
      <label style={labelStyle}>السعر الأساسي (SAR) *</label>
      <input
        type="number"
        min="1"
        placeholder="مثال: 250"
        value={formData.price}
        onChange={(e) => {
          const val = e.target.value;
          if (val === '' || Number(val) >= 1) {
            setFormData({ ...formData, price: val });
          }
        }}
        style={inputStyle}
      />

      <label style={labelStyle}>الكمية المتوفرة *</label>
      <input
        type="number"
        min="1"
        placeholder="مثال: 10"
        value={formData.quantity}
        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
        style={inputStyle}
      />

      <label style={labelStyle}>الوصف *</label>
      <textarea
        placeholder="اكتبي وصف مختصر عن الكيكة..."
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        rows={4}
        style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
      />

      <div style={cardBoxStyle}>
        <label style={labelStyle}>الوزن</label>
        <select
          value={formData.weight}
          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
          style={inputStyle}
        >
          <option value="1KG">1 KG</option>
          <option value="2KG">2 KG</option>
          <option value="3KG">3 KG</option>
        </select>

        <label style={labelStyle}>النكهة (اختيار متعدد) *</label>
        {renderChips(FLAVORS, 'flavor')}

        <label style={labelStyle}>الحشوة (اختيار متعدد) *</label>
        {renderChips(FILLINGS, 'filling')}

        <label style={labelStyle}>الألوان المتاحة (اختيار متعدد) *</label>
        {renderChips(COLORS, 'colors')}
      </div>

      <div style={cardBoxStyle}>
        <label style={labelStyle}>أيام العمل (اختيار متعدد) *</label>
        {renderChips(DAYS, 'working_days')}

        <label style={labelStyle}>ساعات العمل *</label>
        <input
          type="text"
          placeholder="مثال: 10:00 صباحاً - 10:00 مساءً"
          value={formData.working_hours}
          onChange={(e) => setFormData({ ...formData, working_hours: e.target.value })}
          style={{ ...inputStyle, marginBottom: 0 }}
        />
      </div>

      <label style={labelStyle}>نوع التوصيل *</label>
      <select
        value={formData.delivery_type}
        onChange={(e) => setFormData({ ...formData, delivery_type: e.target.value })}
        style={inputStyle}
      >
        <option value="">اختاري نوع التوصيل</option>
        <option value="pickup">استلام من المكان</option>
        <option value="delivery">توصيل</option>
        <option value="both">الاثنين معاً</option>
      </select>

      <label style={labelStyle}>الصور * (لغاية 5 صور، لكل صورة سعر وعنوان)</label>
      <label
        htmlFor="cakeImagesInput"
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          border: '2px dashed #e6b9c0', borderRadius: '16px', padding: '36px 20px',
          backgroundColor: '#fff5f5', cursor: 'pointer', marginBottom: '16px', textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '28px' }}>📤</div>
        <div style={{ fontWeight: '700', marginTop: '8px' }}>Drag & Drop Photos</div>
        <div style={{ fontSize: '13px', color: '#8a7a7a', marginTop: '4px' }}>
          حتى 5 صور - JPG أو PNG
        </div>
        <input
          id="cakeImagesInput"
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          multiple
          style={{ display: 'none' }}
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            if (files.length === 0) return;

            setFormData(prev => {
              const currentCount = prev.images.length;
              const room = Math.max(0, 5 - currentCount);
              const filesToAdd = files.slice(0, room);
              const newItems = filesToAdd.map(file => ({
                file,
                price: '',
                title: '',
                previewUrl: URL.createObjectURL(file),
              }));
              return { ...prev, images: [...prev.images, ...newItems] };
            });
            e.target.value = ''; // تسمح باختيار نفس الملف مرة ثانية لو حذفته
          }}
        />
      </label>

      {/* معاينة الصور + إدخال سعر وعنوان لكل وحدة */}
      {formData.images.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
          {formData.images.map((img, idx) => (
            <div
              key={idx}
              style={{
                width: '160px', border: '1px solid #f1dede', borderRadius: '14px',
                padding: '10px', position: 'relative', backgroundColor: '#fff',
              }}
            >
              <img
                src={img.previewUrl}
                alt=""
                style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '10px', marginBottom: '8px' }}
              />
              <button
                type="button"
                onClick={() => {
                  const updated = formData.images.filter((_, i) => i !== idx);
                  setFormData({ ...formData, images: updated });
                }}
                style={{
                  position: 'absolute', top: '-8px', right: '-8px',
                  width: '24px', height: '24px', borderRadius: '50%',
                  background: '#d67c8a', color: '#fff', border: 'none',
                  cursor: 'pointer', fontWeight: '700', lineHeight: '24px',
                }}
              >
                ×
              </button>
              <input
                type="text"
                placeholder="عنوان الصورة"
                value={img.title}
                onChange={(e) => {
                  const updated = [...formData.images];
                  updated[idx] = { ...updated[idx], title: e.target.value };
                  setFormData({ ...formData, images: updated });
                }}
                style={{ ...inputStyle, padding: '8px 10px', fontSize: '13px', marginBottom: '8px' }}
              />
              <input
                type="number"
                min="0"
                placeholder="السعر (SAR)"
                value={img.price}
                onChange={(e) => {
                  const updated = [...formData.images];
                  updated[idx] = { ...updated[idx], price: e.target.value };
                  setFormData({ ...formData, images: updated });
                }}
                style={{ ...inputStyle, padding: '8px 10px', fontSize: '13px', marginBottom: 0 }}
              />
            </div>
          ))}
        </div>
      )}

      {/*
        ⚠️ افتراض مماثل: PackageSystem لازم يحدّث formData.packages بالشكل:
        [{ name, price, description, feature_ids: [], image_indices: [] }, ...]
      */}
      <PackageSystem formData={formData} setFormData={setFormData} />
    </AddServices>
  );
}