import React, { useContext } from 'react';
import { ThemeContext } from "../../Context/ThemeContext";
export default function CakeOptions({ formData, setFormData }) {
  const { mode } = useContext(ThemeContext);
  const isDark = mode === "dark";
  const sections = [
    { key: 'weight', label: 'Select Weight', options: ['1KG', '2KG', '3KG'] },
    { key: 'flavor', label: 'Flavor', options: ['Vanilla', 'Chocolate', 'Strawberry'] }
  ];
  const handleSelect = (field, value) => {
    setFormData({
      ...formData,
      cakeDetails: { ...formData.cakeDetails, [field]: value }
    });
  };
  const theme = {
    bg: isDark ? '#1e1e1e' : '#FFF',
    border: isDark ? '1px solid #2d2d2d' : '1px solid #E8D0CB',
    text: isDark ? '#FFF' : '#4A1525',
    activeBg: isDark ? '#FFF' : '#4A1525',
    activeText: isDark ? '#121212' : '#FFF',
    activeBorder: isDark ? '1px solid #FFF' : '1px solid #4A1525',
    inactiveBg: isDark ? '#251c1d' : '#FFF',
    inactiveBorder: isDark ? '1px solid #443235' : '1px solid #E8D0CB',
    inactiveText: isDark ? '#e594a3' : '#4A1525'
  };
  const getBtnStyle = (isActive) => ({
    padding: '8px 20px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    backgroundColor: isActive ? theme.activeBg : theme.inactiveBg,
    color: isActive ? theme.activeText : theme.inactiveText,
    border: isActive ? theme.activeBorder : theme.inactiveBorder
  });
  return (
    <div style={{ backgroundColor: theme.bg, padding: '24px', borderRadius: '16px', border: theme.border, marginTop: '20px', color: theme.text, transition: 'all 0.3s ease' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>🎂 Cake Specific Configurations</h3>
      
      {sections.map(({ key, label, options }) => (
        <div key={key} style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>{label}</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            {options.map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelect(key, opt)}
                style={getBtnStyle(formData.cakeDetails?.[key] === opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}