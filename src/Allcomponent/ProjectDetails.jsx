import React, { useContext } from 'react';
import { ThemeContext } from '../Context/ThemeContext'; // تأكد من المسار الصحيح

export default function ProjectDetails({ projectData, onBack }) {
  const { mode } = useContext(ThemeContext);
  
  if (!projectData) return null;

  
  const colors = {
    bgLight: mode === 'dark' ? '#121212' : '#f9fafb',
    bgWhite: mode === 'dark' ? '#1f2937' : '#ffffff',
    textDark: mode === 'dark' ? '#ffffff' : '#1f2937',
    primary: '#be185d',
    border: mode === 'dark' ? '#374151' : '#e5e7eb'
  };
  const VendorCard = ({ vendor, mode, colors }) => (
  <div style={{
    backgroundColor: colors.bgWhite,
    borderRadius: '16px',
    padding: '12px 15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: `1px solid ${colors.border}`,
    transition: '0.2s'
  }}>
    <span style={{ color: '#d1d5db' }}>〈</span>
    <div style={{ flex: 1, marginRight: '12px', textAlign: 'right' }}>
      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>{vendor.name}</h4>
      <span style={{ fontSize: '12px', color: '#6b7280' }}>{vendor.role}</span>
    </div>
    <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: mode === 'dark' ? '#374151' : '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {vendor.image ? <img src={vendor.image} alt={vendor.name} style={{ width: '100%', height: '100%', borderRadius: '50%' }} /> : vendor.icon || "🏢"}
    </div>
  </div>
);

  return (
    <div style={{ backgroundColor: colors.bgLight, minHeight: '100vh', paddingBottom: '60px', color: colors.textDark }}>
      
      {/* قسم الهيدر */}
      <section style={{
        position: 'relative',
        height: '350px',
        background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url("${projectData.heroImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200'}") center/cover no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        textAlign: 'center',
        padding: '0 20px'
      }}>
        <button 
          onClick={onBack}
          style={{
            position: 'absolute', top: '20px', left: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: '#fff', border: 'none', padding: '8px 16px',
            borderRadius: '20px', cursor: 'pointer', fontSize: '14px',
            backdropFilter: 'blur(5px)'
          }}
        >
          ➔ عودة للرئيسية
        </button>

        <span style={{ fontSize: '13px', marginBottom: '12px', opacity: '0.8' }}>{projectData.breadcrumb}</span>
        <h1 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '15px' }}>{projectData.mainTitle}</h1>
      </section>
      
      <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ 
          maxWidth: '800px', margin: '0 auto',
          backgroundColor: colors.bgWhite, 
          padding: '40px', borderRadius: '16px', 
          border: `1px solid ${colors.border}`, 
          lineHeight: '1.8', color: colors.textDark 
        }}>
          <p style={{ fontWeight: 'bold', color: colors.primary, borderRight: `4px solid ${colors.primary}`, paddingRight: '10px', fontSize: '16px', margin: '0 0 20px 0' }}>
            {projectData.subTitle}
          </p>
          <div style={{ whiteSpace: 'pre-line' }}>{projectData.fullDescription}</div>
        </div>
        {projectData.gallery && (
          <div style={{ marginTop: '50px' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>معرض الصور</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 300px))', gap: '20px', justifyContent: 'center' }}>
              {projectData.gallery.map((imgUrl, idx) => (
                <img key={idx} src={imgUrl} alt="Gallery" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '16px' }} />
              ))}
            </div>
          </div>
        )}
        
       {projectData.video && (
  <div style={{ marginTop: "40px", textAlign: "center" }}>
    <h3 style={{ marginBottom: "20px" }}>الفيديو</h3>

    <div style={{ 
      display: "flex", 
      flexDirection: "row", 
      justifyContent: "center", // لتوسيط الفيديوهات
      flexWrap: "wrap",         // الانتقال لسطر جديد عند الحاجة
      gap: "20px"               // مسافة بين الفيديوهات
    }}>
      {Array.isArray(projectData.video) ? (
        projectData.video.map((vid, index) => (
          <video
            key={index}
            controls
            style={{
              width: "100%", 
              maxWidth: "350px", // حجم مناسب ليكونوا بجانب بعض
              height: "250px",
              borderRadius: "16px",
              backgroundColor: "#000"
            }}
          >
            <source src={vid} type="video/mp4" />
          </video>
        ))
      ) : (
        <video
          controls
          style={{
            width: "100%",
            maxWidth: "500px",
            height: "300px",
            borderRadius: "16px",
            backgroundColor: "#000"
          }}
        >
          <source src={projectData.video} type="video/mp4" />
        </video>
      )}
    </div>
  </div>
)}

      {projectData.vendors?.length > 0 && (
          <div style={{ marginTop: '50px' }}>
            <h3>فريق الموردين</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '15px' }}>
              {projectData.vendors.map((v, i) => <VendorCard key={i} vendor={v} mode={mode} colors={colors} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}