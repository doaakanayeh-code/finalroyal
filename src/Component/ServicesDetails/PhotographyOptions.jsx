import React from 'react';

export default function PhotographyOptions({ formData, setFormData }) {
  const handleSelect = (field, value) => {
    setFormData({
      ...formData,
      photoDetails: { ...formData.photoDetails, [field]: value }
    });
  };

  const activeStyle = { backgroundColor: '#4A1525', color: '#FFF', border: '1px solid #4A1525' };
  const inactiveStyle = { backgroundColor: '#FFF', color: '#4A1525', border: '1px solid #E8D0CB' };

  return (
    <div style={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '16px', border: '1px solid #E8D0CB', marginTop: '20px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>📷 Photography Settings</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Shooting Location</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['Indoor Studio', 'Outdoor Session', 'Both'].map(loc => (
            <button
              key={loc}
              type="button"
              onClick={() => handleSelect('location', loc)}
              style={{ padding: '8px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', ...((formData.photoDetails?.location === loc) ? activeStyle : inactiveStyle) }}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}