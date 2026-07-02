import React, { useState } from 'react';
import AddServices from '../../Allcomponent/AddServices';
import MediaUploader from '../../Allcomponent/MediaUploader';
import PackageSystem from '../../Allcomponent/PackageSystem';

export default function AddCakePage() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    weight: '1KG',
    flavor: 'Chocolate',
    filling: 'Nutella',
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
          // ما نسمح بأصفار أو أرقام سالبة
          if (val === '' || Number(val) >= 1) {
            setFormData({ ...formData, price: val });
          }
        }}
        style={inputStyle}
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

        <label style={labelStyle}>النكهة</label>
        <select
          value={formData.flavor}
          onChange={(e) => setFormData({ ...formData, flavor: e.target.value })}
          style={inputStyle}
        >
          <option value="Chocolate">🍫 شوكولاتة</option>
          <option value="Vanilla">🍦 فانيليا</option>
          <option value="RedVelvet">❤️ ريد فيلفت</option>
          <option value="Strawberry">🍓 فراولة</option>
          <option value="Lemon">🍋 ليمون</option>
          <option value="Pistachio">🌰 فستق</option>
          <option value="Caramel">🍮 كراميل</option>
          <option value="Coffee">☕ قهوة</option>
        </select>

        <label style={labelStyle}>الحشوة</label>
        <select
          value={formData.filling}
          onChange={(e) => setFormData({ ...formData, filling: e.target.value })}
          style={{ ...inputStyle, marginBottom: 0 }}
        >
          <option value="Nutella">🍫 نوتيلا</option>
          <option value="Cream">🥛 كريمة</option>
          <option value="Fruits">🍇 فواكه طازجة</option>
          <option value="Caramel">🍯 كراميل</option>
          <option value="Cheesecake">🧀 تشيز كيك</option>
          <option value="Oreo">🍪 أوريو</option>
          <option value="Pistachio">🌰 فستق</option>
        </select>
      </div>

      {/*
        ⚠️ افتراض: MediaUploader لازم يحدّث formData.images بالشكل:
        [{ file: File, price: number, title: string }, ...]
        لأنه هيك بالضبط بيطلب الباك اند لنوع cake. لو الشكل الحالي مختلف
        (مثلاً بيرجع روابط بس بدون price/title) لازم نعدله - ابعتيلي كود
        MediaUploader نظبطه مع بعض.
      */}
      <MediaUploader category="Cake" formData={formData} setFormData={setFormData} />

      {/* معاينة الصور المرفوعة - بتقرأ من formData.images مباشرة */}
      {formData.images && formData.images.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', margin: '16px 0' }}>
          {formData.images.map((img, idx) => {
            const file = img.file || img;
            const previewUrl = file instanceof File ? URL.createObjectURL(file) : null;
            return (
              <div key={idx} style={{ position: 'relative', width: '110px' }}>
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt=""
                    style={{ width: '110px', height: '110px', objectFit: 'cover', borderRadius: '12px', border: '1px solid #f1dede' }}
                  />
                )}
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
                {img.title && (
                  <div style={{ fontSize: '12px', marginTop: '4px', textAlign: 'center', color: '#8a7a7a' }}>
                    {img.title}
                  </div>
                )}
              </div>
            );
          })}
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