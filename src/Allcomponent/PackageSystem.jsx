import React, { useState, useContext } from 'react';
import { ThemeContext } from "../Context/ThemeContext";

export default function PackageSystem({ formData, setFormData }) {
  const { mode } = useContext(ThemeContext);
  const isDark = mode === "dark";

  const [newPkg, setNewPkg] = useState({ name: '', price: '', features: '' });

  const addPackage = () => {
    if (!newPkg.name || !newPkg.price) return alert('Please enter package name and price');
    
    setFormData({
      ...formData,
      packages: [
        ...(formData.packages || []),
        { id: Date.now(), ...newPkg, features: newPkg.features.split(',').map(f => f.trim()) }
      ]
    });
    setNewPkg({ name: '', price: '', features: '' }); 
  };

  const removePackage = (id) => {
    setFormData({ ...formData, packages: formData.packages.filter(p => p.id !== id) });
  };

  const theme = {
    bg: isDark ? '#1e1e1e' : '#FFF',
    border: isDark ? '1px solid #2d2d2d' : '1px solid #E8D0CB',
    text: isDark ? '#FFF' : '#4A1525',
    subBg: isDark ? '#251c1d' : '#FFF8F6',
    cardBg: isDark ? '#251c1d' : '#FCEEEB',
    cardBorder: isDark ? '1px solid #4a2c31' : '1px solid #4A1525',
    inputBorder: isDark ? '1px solid #443235' : '1px solid #E8D0CB'
  };

  const inputStyle = {
    padding: '10px', 
    borderRadius: '6px', 
    border: theme.inputBorder,
    backgroundColor: theme.bg,
    color: theme.text,
    outline: 'none'
  };

  return (
    <div style={{ backgroundColor: theme.bg, padding: '24px', borderRadius: '16px', border: theme.border, marginTop: '20px', transition: 'all 0.3s ease' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: theme.text }}>
        🎁 Create Service Packages (Optional)
      </h3>
      
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px', backgroundColor: theme.subBg, padding: '16px', borderRadius: '8px', transition: 'all 0.3s ease' }}>
        <input type="text" placeholder="Package Name" value={newPkg.name} onChange={(e) => setNewPkg({ ...newPkg, name: e.target.value })} style={{ ...inputStyle, flex: '1', minWidth: '200px' }} />
        <input type="number" placeholder="Price" value={newPkg.price} onChange={(e) => setNewPkg({ ...newPkg, price: e.target.value })} style={{ ...inputStyle, width: '150px' }} />
        <input type="text" placeholder="Features (comma separated)" value={newPkg.features} onChange={(e) => setNewPkg({ ...newPkg, features: e.target.value })} style={{ ...inputStyle, flex: '2', minWidth: '250px' }} />
        <button type="button" onClick={addPackage} style={{ backgroundColor: isDark ? '#FFF' : '#4A1525', color: isDark ? '#121212' : '#FFF', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease' }}>
          + Add Package
        </button>
      </div>

      {formData.packages?.length > 0 && (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {formData.packages.map((pkg) => (
            <div key={pkg.id} style={{ border: theme.cardBorder, borderRadius: '12px', padding: '16px', minWidth: '220px', backgroundColor: theme.cardBg, position: 'relative', transition: 'all 0.3s ease' }}>
              <button type="button" onClick={() => removePackage(pkg.id)} style={{ position: 'absolute', top: '10px', right: '10px', border: 'none', background: 'none', color: '#DC2626', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', color: theme.text }}>{pkg.name}</h4>
              <p style={{ margin: '0 0 12px 0', fontWeight: 'bold', fontSize: '14px', color: isDark ? '#e594a3' : '#4A1525' }}>{pkg.price} SYP</p>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: isDark ? '#aaa' : '#6B5259' }}>
                {pkg.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}