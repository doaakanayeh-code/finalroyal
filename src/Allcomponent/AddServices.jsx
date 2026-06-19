import React, { useState, useContext } from 'react';
import CakeOptions from '../Component/ServicesDetails/CakeOptions';
import PhotographyOptions from '../Component/ServicesDetails/PhotographyOptions';
import MediaUploader from './MediaUploader'; 
import PackageSystem from './PackageSystem';
import { ThemeContext } from "../Context/ThemeContext";
export default function AddServices() {
  const { mode } = useContext(ThemeContext);
  const isDark = mode === "dark";

  const [formData, setFormData] = useState({
    category: 'Cake', 
    title: '',
    description: '',
    basePrice: '',
    cakeDetails: { weight: '1KG', flavor: 'Chocolate', filling: 'Nutella' }, 
    photoDetails: { location: 'Indoor Studio' },
    packages: [] 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const inputStyles = {
    width: '100%', 
    padding: '12px', 
    borderRadius: '8px', 
    border: isDark ? '1px solid #443235' : '1px solid #E8D0CB', 
    backgroundColor: isDark ? '#1e1e1e' : '#FFF', 
    color: isDark ? '#FFF' : '#4A1525', 
    outline: 'none', 
    boxSizing: 'border-box',
    transition: 'background-color 0.3s ease, border 0.3s ease, color 0.3s ease'
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: isDark ? '#121212' : '#FFF8F6', color: isDark ? '#FFF' : '#4A1525', fontFamily: 'sans-serif', padding: '40px 20px', boxSizing: 'border-box', transition: 'background-color 0.3s ease, color 0.3s ease' }}>
      <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
        
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', textAlign: 'center', marginBottom: '40px' }}>Add Your Service</h1>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '24px' }}>Describe Your New Service</h2>

        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Service Category</label>
              <select name="category" value={formData.category} onChange={handleInputChange} style={inputStyles}>
                <option value="Cake" style={{ background: isDark ? '#1e1e1e' : '#FFF' }}>Cake 🎂</option>
                <option value="Photography" style={{ background: isDark ? '#1e1e1e' : '#FFF' }}>Photography 📷</option>
                <option value="Music & DJ" style={{ background: isDark ? '#1e1e1e' : '#FFF' }}>Music & DJ 🎵</option> 
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Service Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} style={inputStyles} placeholder="e.g. Royal Strawberry Cake" />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Short Description</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" style={{ ...inputStyles, resize: 'none' }} placeholder="Describe your service..."></textarea>
            </div>
          </div>

          <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Base Price (SAR)</label>
              <input type="number" name="basePrice" value={formData.basePrice} onChange={handleInputChange} style={inputStyles} placeholder="0.00" />
            </div>
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <MediaUploader category={formData.category} />
        </div>

        {formData.category === 'Cake' && (
          <CakeOptions formData={formData} setFormData={setFormData} />
        )}

        {formData.category === 'Photography' && (
          <PhotographyOptions formData={formData} setFormData={setFormData} />
        )}

        <PackageSystem formData={formData} setFormData={setFormData} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '48px', paddingTop: '24px', borderTop: isDark ? '1px solid #2d2d2d' : '1px solid #F5E6E1' }}>
          <button style={{ backgroundColor: isDark ? '#1e1e1e' : '#FFF', border: isDark ? '1px solid #FFF' : '1px solid #4A1525', color: isDark ? '#FFF' : '#4A1525', padding: '10px 24px', borderRadius: '24px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}>
            Save Draft
          </button>
          <button 
            onClick={() => console.log('Data to send to Backend:', formData)} 
            style={{ backgroundColor: isDark ? '#FFF' : '#4A1525', color: isDark ? '#121212' : '#FFF', border: 'none', padding: '12px 32px', borderRadius: '24px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}
          >
            Next Step →
          </button>
        </div>

      </div>
    </div>
  );
}