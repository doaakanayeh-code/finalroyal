import React, { useState, useContext } from 'react';
import MediaUploader from '../../Allcomponent/MediaUploader'; 
import PackageSystem from '../../Allcomponent/PackageSystem';
import { ThemeContext } from "../../Context/ThemeContext";

export default function FloralDesigner() {
  const { mode } = useContext(ThemeContext);
  const isDark = mode === "dark";

  const [formData, setFormData] = useState({
    category: 'Floral & Kosha',
    brandName: '',
    isLocked: false,
    workingHours: { openAt: '9:00 AM', closeAt: '9:00 PM' },
    workingDays: [], 
    packages: [] 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleDay = (day) => {
    const days = [...formData.workingDays];
    if (days.includes(day)) {
      setFormData({ ...formData, workingDays: days.filter(d => d !== day) });
    } else {
      setFormData({ ...formData, workingDays: [...days, day] });
    }
  };

  const isDarkStyle = {
    bg: isDark ? '#121212' : '#FFF8F6',
    cardBg: isDark ? '#1e1e1e' : '#FFFFFF',
    text: isDark ? '#FFF' : '#4A1525',
    subText: isDark ? '#aaa' : '#6B5259',
    borderColor: isDark ? '#443235' : '#E8D0CB',
    btnColor: '#CD8282', 
    inputBg: isDark ? '#251c1d' : '#FFF',
    tagBg: isDark ? '#2d1f21' : '#FCEEEB',
  };

  const cardStyle = {
    backgroundColor: isDarkStyle.cardBg,
    padding: '24px',
    borderRadius: '16px',
    border: `1px solid ${isDarkStyle.borderColor}`,
    marginBottom: '20px',
  };

  const inputStyles = {
    width: '100%', 
    padding: '12px 16px', 
    borderRadius: '12px', 
    border: `1px solid ${isDarkStyle.borderColor}`, 
    backgroundColor: isDarkStyle.inputBg, 
    color: isDarkStyle.text, 
    outline: 'none', 
    boxSizing: 'border-box',
  };

  const daysOfWeek = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: isDarkStyle.bg, color: isDarkStyle.text, fontFamily: 'sans-serif', padding: '20px', boxSizing: 'border-box' }}>
      
      <div style={{ width: '100%', height: '180px', borderRadius: '0 0 24px 24px', backgroundImage: "url('https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600')", backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', marginBottom: '24px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)', borderRadius: '0 0 24px 24px' }}></div>
        <h1 style={{ position: 'absolute', bottom: '20px', left: '20px', margin: 0, color: '#FFF', fontSize: '28px', fontFamily: 'cursive' }}>
          Floral Atelier
        </h1>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        <div style={cardStyle}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', textTransform: 'uppercase' }}>Atelier Brand Name</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              name="brandName" 
              value={formData.brandName} 
              onChange={handleInputChange} 
              style={inputStyles} 
              placeholder="Enter Your Luxury Brand Name..." 
              disabled={formData.isLocked}
            />
            <button 
              onClick={() => setFormData({ ...formData, isLocked: !formData.isLocked })}
              style={{ backgroundColor: isDarkStyle.btnColor, color: '#FFF', border: 'none', padding: '0 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {formData.isLocked ? '🔓 UNLOCK' : '✓ LOCK'}
            </button>
          </div>
        </div>

        <div style={cardStyle}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', textTransform: 'uppercase' }}>Working Hours, Days & Location</label>
          
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '12px', color: isDarkStyle.subText }}>Open At</span>
              <input type="text" value={formData.workingHours.openAt} style={{ ...inputStyles, textAlign: 'center', marginTop: '4px' }} readOnly />
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '12px', color: isDarkStyle.subText }}>Close At</span>
              <input type="text" value={formData.workingHours.closeAt} style={{ ...inputStyles, textAlign: 'center', marginTop: '4px' }} readOnly />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {daysOfWeek.map(day => {
              const isSelected = formData.workingDays.includes(day);
              return (
                <button 
                  key={day} 
                  onClick={() => toggleDay(day)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: `1px solid ${isDarkStyle.borderColor}`,
                    backgroundColor: isSelected ? isDarkStyle.btnColor : isDarkStyle.tagBg,
                    color: isSelected ? '#FFF' : isDarkStyle.text,
                    cursor: 'pointer',
                    fontWeight: '500', fontSize: '13px'
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* <div style={{ ...inputStyles, display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <span>🗺️</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '11px', color: isDarkStyle.subText, textTransform: 'uppercase' }}>Operational Region</div>
              <div style={{ fontSize: '13px', fontWeight: '500' }}>Tap to Select Location from Map</div>
            </div>
            <span style={{ marginLeft: 'auto' }}>›</span>
          </div> */}
        </div>

        <div style={cardStyle}>
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', margin: 0, textTransform: 'uppercase' }}>Kosha Inventory</h3>
          <MediaUploader category="Kosha" />
        </div>

        <div style={cardStyle}>
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', margin: 0, textTransform: 'uppercase' }}>Decoration Inventory</h3>
          <MediaUploader category="Decoration" />
        </div>

        <div style={cardStyle}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '16px', textTransform: 'uppercase' }}>Create New Bundle</label>
          <PackageSystem formData={formData} setFormData={setFormData} />
        </div>

        <button 
          onClick={() => console.log('Final Data sent:', formData)} 
          style={{ width: '100%', backgroundColor: isDarkStyle.btnColor, color: '#FFF', border: 'none', padding: '16px', borderRadius: '30px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
        >
          PUBLISH PORTFOLIO
        </button>

      </div>
    </div>
  );
}