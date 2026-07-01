import React, { useState, useContext } from 'react';
import MediaUploader from '../../Allcomponent/MediaUploader';;
import { ThemeContext } from "../../Context/ThemeContext";

export default function CakeOptions() {
  const { mode } = useContext(ThemeContext);
  const isDark = mode === "dark";

  const [formData, setFormData] = useState({
    category: 'Cake Artisan',
    brandName: '',
    isLocked: false,
    workingHours: { openAt: '9:00 AM', closeAt: '9:00 PM' },
    workingDays: [],
    flavor: 'Vanilla',
    filling: 'Chocolate',
    stockQuantity: 10,
    deliveryType: 'Inside',
    deliveryFee: '1.50 BD'
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

  const changeQuantity = (amount) => {
    setFormData(prev => ({
      ...prev,
      stockQuantity: Math.max(0, prev.stockQuantity + amount)
    }));
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
    activeTagBg: '#CD8282',
    activeTagText: '#FFFFFF'
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
    padding: '14px 16px',
    borderRadius: '14px',
    border: `1px solid ${isDarkStyle.borderColor}`,
    backgroundColor: isDarkStyle.inputBg,
    color: isDarkStyle.text,
    outline: 'none',
    boxSizing: 'border-box',
    fontSize: '15px'
  };

  const daysOfWeek = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const flavors = ['Vanilla', 'Chocolate', 'Red Velvet'];
  const fillings = ['Chocolate', 'Oreo', 'Kinder', 'Strawberry'];

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: isDarkStyle.bg, color: isDarkStyle.text, fontFamily: 'sans-serif', padding: '20px', boxSizing: 'border-box' }}>
      
      <div style={{ width: '100%', height: '180px', borderRadius: '0 0 24px 24px', backgroundImage: "url('https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600')", backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', marginBottom: '24px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)', borderRadius: '0 0 24px 24px' }}></div>
        <h1 style={{ position: 'absolute', bottom: '20px', left: '20px', margin: 0, color: '#FFF', fontSize: '28px', fontFamily: 'cursive' }}>
          Cake Artisan
        </h1>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '18px' }}>🏪</span>
            <label style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', color: isDarkStyle.subText }}>Atelier Brand Name</label>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
              style={{ backgroundColor: isDarkStyle.btnColor, color: '#FFF', border: 'none', padding: '14px 24px', borderRadius: '14px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', height: '48px', whiteSpace: 'nowrap' }}
            >
              {formData.isLocked ? '🔓' : '✓'} {formData.isLocked ? 'UNLOCK' : 'LOCK'}
            </button>
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span style={{ fontSize: '18px' }}>📖</span>
            <label style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', color: isDarkStyle.subText }}>Working Hours, Days & Location</label>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '12px', color: isDarkStyle.subText, display: 'block', marginBottom: '6px', textAlign: 'center' }}>Open At</span>
              <div style={{ ...inputStyles, textAlign: 'center', backgroundColor: isDarkStyle.tagBg, border: 'none', fontWeight: '500' }}>
                {formData.workingHours.openAt}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '12px', color: isDarkStyle.subText, display: 'block', marginBottom: '6px', textAlign: 'center' }}>Close At</span>
              <div style={{ ...inputStyles, textAlign: 'center', backgroundColor: isDarkStyle.tagBg, border: 'none', fontWeight: '500' }}>
                {formData.workingHours.closeAt}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {daysOfWeek.map(day => {
              const isSelected = formData.workingDays.includes(day);
              return (
                <button 
                  key={day} 
                  type="button"
                  onClick={() => toggleDay(day)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '12px',
                    border: isSelected ? 'none' : `1px solid ${isDarkStyle.borderColor}`,
                    backgroundColor: isSelected ? isDarkStyle.btnColor : isDarkStyle.tagBg,
                    color: isSelected ? '#FFF' : isDarkStyle.text,
                    cursor: 'pointer',
                    fontWeight: '500', 
                    fontSize: '13px'
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* <div style={{ ...inputStyles, display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', backgroundColor: isDarkStyle.tagBg, border: 'none', padding: '16px' }}>
            <span style={{ fontSize: '20px' }}>📍</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '14px', fontWeight: '500', color: isDarkStyle.text }}>Tap to Select Store Location</div>
            </div>
            <span style={{ marginLeft: 'auto', fontSize: '18px', color: isDarkStyle.btnColor }}>›</span>
          </div> */}
        </div>

        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span style={{ fontSize: '18px' }}>🎂</span>
            <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0, textTransform: 'uppercase', color: isDarkStyle.subText }}>Manage Cake Designs</h3>
          </div>
          <MediaUploader category="Cake" isDark={isDark} />
          <button 
            style={{ width: '100%', backgroundColor: 'transparent', color: isDarkStyle.text, border: `1px dashed ${isDarkStyle.borderColor}`, padding: '14px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <span>➕</span> ADD NEW CAKE DESIGN
          </button>
        </div>

        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span style={{ fontSize: '18px' }}>🍴</span>
            <label style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', color: isDarkStyle.subText }}>Flavor & Filling</label>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', color: isDarkStyle.subText, display: 'block', marginBottom: '8px' }}>Flavor</span>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {flavors.map(f => (
                <button
                  key={f}
                  onClick={() => setFormData({ ...formData, flavor: f })}
                  style={{ padding: '10px 20px', borderRadius: '12px', border: `1px solid ${isDarkStyle.borderColor}`, backgroundColor: formData.flavor === f ? isDarkStyle.activeTagBg : isDarkStyle.tagBg, color: formData.flavor === f ? isDarkStyle.activeTagText : isDarkStyle.text, cursor: 'pointer', fontWeight: '500' }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: `1px solid ${isDarkStyle.borderColor}`, margin: '16px 0' }} />

          <div>
            <span style={{ fontSize: '13px', color: isDarkStyle.subText, display: 'block', marginBottom: '8px' }}>Filling</span>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {fillings.map(f => (
                <button
                  key={f}
                  onClick={() => setFormData({ ...formData, filling: f })}
                  style={{ padding: '10px 20px', borderRadius: '12px', border: `1px solid ${isDarkStyle.borderColor}`, backgroundColor: formData.filling === f ? isDarkStyle.activeTagBg : isDarkStyle.tagBg, color: formData.filling === f ? isDarkStyle.activeTagText : isDarkStyle.text, cursor: 'pointer', fontWeight: '500' }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span style={{ fontSize: '18px' }}>📦</span>
            <label style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', color: isDarkStyle.subText }}>Weight & Stock</label>
          </div>
          <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', width: '100%' }}>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>In Stock Quantity</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginLeft: 'auto' }}>
              <button 
                onClick={() => changeQuantity(-1)}
                style={{ width: '36px', height: '36px', borderRadius: '10px', border: 'none', backgroundColor: isDarkStyle.btnColor, color: '#FFF', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                −
              </button>
              <span style={{ fontSize: '16px', fontWeight: 'bold', minWidth: '24px', textAlign: 'center' }}>{formData.stockQuantity}</span>
              <button 
                onClick={() => changeQuantity(1)}
                style={{ width: '36px', height: '36px', borderRadius: '10px', border: 'none', backgroundColor: isDarkStyle.btnColor, color: '#FFF', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span style={{ fontSize: '18px' }}>📍</span>
            <label style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', color: isDarkStyle.subText }}>Delivery & Location</label>
          </div>
          
          <div style={{ display: 'flex', backgroundColor: isDarkStyle.tagBg, borderRadius: '14px', padding: '4px', marginBottom: '16px' }}>
            <button
              onClick={() => setFormData({ ...formData, deliveryType: 'Inside' })}
              style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', backgroundColor: formData.deliveryType === 'Inside' ? isDarkStyle.btnColor : 'transparent', color: formData.deliveryType === 'Inside' ? '#FFF' : isDarkStyle.text, fontWeight: 'bold', cursor: 'pointer' }}
            >
              Inside
            </button>
            <button
              onClick={() => setFormData({ ...formData, deliveryType: 'Pickup' })}
              style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', backgroundColor: formData.deliveryType === 'Pickup' ? isDarkStyle.btnColor : 'transparent', color: formData.deliveryType === 'Pickup' ? '#FFF' : isDarkStyle.text, fontWeight: 'bold', cursor: 'pointer' }}
            >
              Pickup
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Delivery Fee:</span>
            <span style={{ marginLeft: 'auto', fontSize: '15px', fontWeight: 'bold', color: isDarkStyle.subText }}>{formData.deliveryFee}</span>
          </div>
        </div>

        <button 
          onClick={() => console.log('Cake Design Data sent:', formData)} 
          style={{ width: '100%', backgroundColor: isDarkStyle.btnColor, color: '#FFF', border: 'none', padding: '16px', borderRadius: '30px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', boxShadow: '0 4px 12px rgba(205, 130, 130, 0.3)' }}
        >
          PUBLISH DESIGN
        </button>

      </div>
    </div>
  );
}