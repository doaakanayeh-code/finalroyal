import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../../Context/LanguageContext';
import { ThemeContext } from '../../Context/ThemeContext';
import ProjectDetails from '../../Allcomponent/ProjectDetails';

function Hero({ t }) {
  return (
    <section style={{
      position: 'relative',
      height: '420px',
      background: 'linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.65)), url("https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200") center/cover no-repeat',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#ffffff',
      textAlign: 'center',
      padding: '0 20px'
    }}>
      <h1 style={{ fontSize: '40px', fontWeight: '900', marginBottom: '15px' }}>
        {t('ourWork.hero.title')}
      </h1>
      <p style={{ fontSize: '16px', maxWidth: '600px', opacity: '0.9', lineHeight: '1.6' }}>
        {t('ourWork.hero.description')}
      </p>
    </section>
  );
}

export default function App() {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  const { mode } = useContext(ThemeContext);
  const [selectedProject, setSelectedProject] = useState(null);

  // تعريف الألوان ديناميكياً حسب المود
  const colors = {
    bgLight: mode === 'dark' ? '#121212' : '#f9fafb',
    textDark: mode === 'dark' ? '#ffffff' : '#1f2937',
    primary: '#be185d',
    cardAccent: '#e9d5ca'
  };
const weddingData = [
  {
    title: t('ourWork.menEvents.title'),
    desc: t('ourWork.menEvents.description'),
    bgImage: "/OurWork/p1.jpg",
    details: {
      breadcrumb: t('ourWork.menEvents.breadcrumb'),
      mainTitle: t('ourWork.menEvents.title'),
      subTitle: t('ourWork.menEvents.subTitle'),
      heroImage: "/OurWork/p1.jpg",
      fullDescription: t('ourWork.menEvents.fullDescription'),
      video: ["/OurWork/p.mp4", "/OurWork/p7.mp4"],
      gallery: ["/OurWork/p1.jpg", "/OurWork/p6.jpg", "/OurWork/p9.jpg"],
      vendors: [
        { name: "رويال مومنت", role: t('vendors.organizer'), icon: "🎉" },
        { name: "فريق التصوير", role: t('vendors.photographer'), icon: "📷" }
      ]
    }
  },
  {
    title: t('ourWork.royalWedding.title'),
    desc: t('ourWork.royalWedding.description'),
    bgImage: "/OurWork/y8.jpg",
    details: {
      breadcrumb: t('ourWork.royalWedding.breadcrumb'),
      mainTitle: t('ourWork.royalWedding.title'),
      subTitle: t('ourWork.royalWedding.subTitle'),
      heroImage: "/OurWork/y8.jpg",
      fullDescription: t('ourWork.royalWedding.fullDescription'),
      gallery: ["/OurWork/y1.jpg", "/OurWork/y2.jpg", "/OurWork/y3.jpg", "/OurWork/y4.jpg", "/OurWork/y6.jpg", "/OurWork/y7.jpg", "/OurWork/y8.jpg", "/OurWork/y9.jpg", "/OurWork/y10.jpg", "/OurWork/y12.jpg"],
      vendors: [
        { name: "رويال مومنت", role: t('vendors.organizer'), icon: "🎉" },
        { name: "فريق التصوير", role: t('vendors.photographer'), icon: "📷" }
      ]
    }
  },
  {
    title: t('ourWork.birthdays.title'),
    desc: t('ourWork.birthdays.description'),
    bgImage: "/OurWork/H3.jpg",
    details: {
      breadcrumb: t('ourWork.birthdays.breadcrumb'),
      mainTitle: t('ourWork.birthdays.title'),
      subTitle: t('ourWork.birthdays.subTitle'),
      heroImage: "/OurWork/H3.jpg",
      video: "/OurWork/H1.mp4",
      fullDescription: t('ourWork.birthdays.fullDescription'),
      gallery: ["/OurWork/H2.jpg", "/OurWork/H3.jpg", "/OurWork/H4.jpg", "/OurWork/H5.jpg", "/OurWork/H6.jpg", "/OurWork/H8.jpg"],
      vendors: [
        { name: "رويال مومنت", role: t('vendors.organizer'), icon: "🎉" },
        { name: "فريق التصوير", role: t('vendors.photographer'), icon: "📷" }
      ]
    }
  },
  {
    title: t('ourWork.hajj.title'),
    desc: t('ourWork.hajj.description'),
    bgImage: "/OurWork/d1.jpg",
    details: {
      breadcrumb: t('ourWork.hajj.breadcrumb'),
      mainTitle: t('ourWork.hajj.title'),
      subTitle: t('ourWork.hajj.subTitle'),
      heroImage: "/OurWork/d1.jpg",
      video: "/OurWork/d2.mp4",
      fullDescription: t('ourWork.hajj.fullDescription'),
      gallery: ["/OurWork/d1.jpg", "/OurWork/d3.jpg", "/OurWork/d4.jpg", "/OurWork/d5.jpg", "/OurWork/d7.jpg", "/OurWork/d8.jpg"],
      vendors: [
        { name: "رويال مومنت", role: t('vendors.organizer'), icon: "🎉" },
        { name: "فريق التصوير", role: t('vendors.photographer'), icon: "📷" }
      ]
    }
  },
  {
    title: t('ourWork.bachelorette.title'),
    desc: t('ourWork.bachelorette.description'),
    bgImage: "/OurWork/v3.jpg",
    details: {
      breadcrumb: t('ourWork.bachelorette.breadcrumb'),
      mainTitle: t('ourWork.bachelorette.title'),
      subTitle: t('ourWork.bachelorette.subTitle'),
      heroImage: "/OurWork/v3.jpg",
      video: "/OurWork/v1.mp4",
      fullDescription: t('ourWork.bachelorette.fullDescription'),
      gallery: ["/OurWork/v2.jpg", "/OurWork/v3.jpg", "/OurWork/v4.jpg", "/OurWork/v5.jpg", "/OurWork/v6.jpg"],
      vendors: [
        { name: "رويال مومنت", role: t('vendors.organizer'), icon: "🎉" },
        { name: "فريق التصوير", role: t('vendors.photographer'), icon: "📷" }
      ]
    }
  },
  {
    title: t('ourWork.graduation.title'),
    desc: t('ourWork.graduation.description'),
    bgImage: "/OurWork/k1.jpg",
    details: {
      breadcrumb: t('ourWork.graduation.breadcrumb'),
      mainTitle: t('ourWork.graduation.title'),
      subTitle: t('ourWork.graduation.subTitle'),
      heroImage: "/OurWork/k1.jpg",
      fullDescription: t('ourWork.graduation.fullDescription'),
      gallery: ["/OurWork/k1.jpg", "/OurWork/k2.jpg", "/OurWork/k3.jpg", "/OurWork/k4.jpg", "/OurWork/k5.jpg", "/OurWork/k6.jpg", "/OurWork/k7.jpg", "/OurWork/k8.jpg", "/OurWork/k9.jpg", "/OurWork/k10.jpg", "/OurWork/k11.jpg"],
      vendors: [
        { name: "رويال مومنت", role: t('vendors.organizer'), icon: "🎉" },
        { name: "فريق التصوير", role: t('vendors.photographer'), icon: "📷" }
      ]
    }
  },
  {
    title: t('ourWork.buffet.title'),
    desc: t('ourWork.buffet.description'),
    bgImage: "/OurWork/t1.jpg",
    details: {
      breadcrumb: t('ourWork.buffet.breadcrumb'),
      mainTitle: t('ourWork.buffet.title'),
      subTitle: t('ourWork.buffet.subTitle'),
      heroImage: "/OurWork/t1.jpg",
      fullDescription: t('ourWork.buffet.fullDescription'),
      gallery: ["/OurWork/t1.jpg", "/OurWork/t2.jpg", "/OurWork/t3.jpg", "/OurWork/t4.jpg", "/OurWork/t5.jpg", "/OurWork/t6.jpg", "/OurWork/t7.jpg", "/OurWork/t8.jpg"]
    }
  }
];

  if (selectedProject) {
    return (
      <div >
        <ProjectDetails projectData={selectedProject} onBack={() => setSelectedProject(null)} />
      </div>
    );
  }

  return (
    <div 
    
      style={{ 
        backgroundColor: colors.bgLight, 
        color: colors.textDark, 
        minHeight: '100vh', 
        fontFamily: 'sans-serif',
        transition: 'all 0.3s ease'
      }}
    >
      <Hero t={t} mode={mode} />

      <main style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <section>
          <h2 style={{ 
            fontSize: '22px', 
            marginBottom: '25px', 
            paddingRight: language === 'ar' ? '10px' : '0',
            paddingLeft: language === 'en' ? '10px' : '0',
            borderRight: language === 'ar' ? `4px solid ${colors.primary}` : 'none',
            borderLeft: language === 'en' ? `4px solid ${colors.primary}` : 'none'
          }}>
            {t('navbar.FeaturedWork')}
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 300px))', gap: '30px', justifyContent: 'center' }}>
         {weddingData.map((item, index) => (
  <div 
    key={index} 
    onClick={() => item.details && setSelectedProject(item.details)}
    style={{ 
      position: 'relative', // ضروري للطبقات
      backgroundImage: `url("${item.bgImage}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: '24px', 
      height: '350px', 
      cursor: 'pointer',
      overflow: 'hidden', // لضمان عدم خروج الزوايا عن الإطار
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'flex-end', // النص في الأسفل
      padding: '25px',
      transition: 'transform 0.3s ease'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
  >
    {/* طبقة التعتيم (Overlay) لضمان وضوح الخط */}
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.1))',
      zIndex: 1
    }} />

    {/* المحتوى */}
    <div style={{ position: 'relative', zIndex: 2, color: '#fff', textAlign: language === 'ar' ? 'right' : 'left' }}>
      <h3 style={{ fontSize: '20px', marginBottom: '8px', fontWeight: 'bold' }}>{item.title}</h3>
      <p style={{ fontSize: '14px', opacity: '0.9', margin: 0, lineHeight: '1.4' }}>{item.desc}</p>
    </div>
  </div>
))}
          </div>
        </section>
      </main>
    </div>
  );
}