import React, { useState } from 'react';
import AddServices from '../../Allcomponent/AddServices'; 
import MediaUploader from '../../Allcomponent/MediaUploader';
import PackageSystem from '../../Allcomponent/PackageSystem';

export default function AddCakePage() {
  const [formData, setFormData] = useState({
    category: 'Cake',
    basePrice: '',
    weight: '1KG',
    flavor: 'Chocolate',
    filling: 'Nutella',
    packages: []
  });

  const cakeConfig = {
    title: "Add Your Cake Design",
    bannerImage: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    showMap: true,
    buttonText: "Publish Cake Design"
  };

  const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', marginBottom: '15px', border: '1px solid #ccc' };

  return (
    <AddServices
      config={cakeConfig} 
      formData={formData} 
      setFormData={setFormData} 
      onNext={() => console.log('Final Cake Data:', formData)} 
    >
      {/* كل الحقول هنا مباشرة بدون استدعاء ملفات خارجية */}
      <>
        {/* السعر */}
        <input 
          type="number" 
          placeholder="Base Price (SAR)" 
          value={formData.basePrice} 
          onChange={(e) => setFormData({...formData, basePrice: e.target.value})}
          style={inputStyle} 
        />

        {/* تفاصيل الكيك المدمجة */}
        <div style={{ border: '1px solid #eee', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Weight</label>
          <select value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} style={inputStyle}>
            <option value="1KG">1 KG</option>
            <option value="2KG">2 KG</option>
            <option value="3KG">3 KG</option>
          </select>

          <label style={{ display: 'block', marginBottom: '5px' }}>Flavor</label>
          <input 
            type="text" placeholder="Flavor (e.g. Chocolate)" 
            value={formData.flavor}
            onChange={(e) => setFormData({...formData, flavor: e.target.value})}
            style={inputStyle} 
          />

          <label style={{ display: 'block', marginBottom: '5px' }}>Filling</label>
          <input 
            type="text" placeholder="Filling (e.g. Nutella)" 
            value={formData.filling}
            onChange={(e) => setFormData({...formData, filling: e.target.value})}
            style={inputStyle} 
          />
        </div>

        <MediaUploader category="Cake" />
        <PackageSystem formData={formData} setFormData={setFormData} />
      </>
    </AddServices>
  );
}