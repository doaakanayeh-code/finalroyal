import React, { useState, useContext } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { Link } from 'react-router-dom';
import imgLazord from '../assets/imgLazord.jpg'; 
import imgBahia from '../assets/imgBahia.jpg';
import imgJalaa from '../assets/imgJalaa.jpg';
import Loading from '../Allcomponent/Loading'; 
import DashboardCard from '../Allcomponent/Card'; 
import { ThemeContext } from "../Context/ThemeContext"; 
import { LanguageContext } from "../Context/LanguageContext";
import { useTranslation } from 'react-i18next';

const crafts = [
    { id: 1, title_en: "Floral Designer", title_ar: "مصمم زهور", desc_en: "Petals & Elegance", desc_ar: "بتلات وأناقة", icon: "🌸", bg: "#d7ccc8", color: "#5d4037" },
    { id: 2, title_en: "Cake Artisan", title_ar: "خبير كيك", desc_en: "Sweet Masterpieces", desc_ar: "روائع حلوة", icon: "🎂", bg: "#f5f5f5", color: "#616161" },
    { id: 3, title_en: "Grand Hall", title_ar: "صالات كبرى", desc_en: "Prestigious Venues", desc_ar: "أماكن مرموقة", icon: "🏰", bg: "#e0f2f1", color: "#00695c" },
    { id: 4, title_en: "Photography", title_ar: "تصوير فوتوغرافي", desc_en: "Timeless Memories", desc_ar: "ذكريات لا تنسى", icon: "📸", bg: "#e8eaf6", color: "#283593" },
    { id: 5, title_en: "Event Planner", title_ar: "منظم حفلات", desc_en: "Seamless Luxury", desc_ar: "فخامة متكاملة", icon: "🎉", bg: "#fce4ec", color: "#c2185b" },
    { id: 7, title_en: "National Day & Events", title_ar: "مناسبات وطنية", desc_en: "Royal Pride", desc_ar: "فخر ملكي", icon: "🇸🇾", bg: "#e8f5e9", color: "#2e7d32" },
    { id: 6, title_en: "Music & DJ", title_ar: "موسيقى ودي جي", desc_en: "Royal Beats", desc_ar: "نغمات ملكية", icon: "🎵", bg: "#efebe9", color: "#4e342e" },
];

const moviesData = [
    { id: 1, title_en: "Lazord Hall", title_ar: "صالة لازورد", location_en: "Damascus - Mazzeh", location_ar: "دمشق - المزة", capacity_en: "Capacity: 500 people", capacity_ar: "السعة: 500 شخص", rating: "8.9", image: imgLazord },
    { id: 2, title_en: "Al-Bahia Hall", title_ar: "صالة البهية", location_en: "Damascus - Airport Road", location_ar: "دمشق - طريق المطار", capacity_en: "Capacity: 700 people", capacity_ar: "السعة: 700 شخص", rating: "9.2", image: imgBahia },
    { id: 3, title_en: "Al-Jalaa Hall", title_ar: "صالة الجلاء", location_en: "Damascus - Mazzeh Highway", location_ar: "دمشق - أوتوستراد المزة", capacity_en: "Capacity: 400 people", capacity_ar: "السعة: 400 شخص", rating: "8.5", image: imgJalaa },
];

const Services = () => {
    const { mode } = useContext(ThemeContext);
    const { lang, dir } = useContext(LanguageContext);
    const { t } = useTranslation();
    
    const [showResults, setShowResults] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleCardClick = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setShowResults(true); 
        }, 2000);
    };

    return (
        <>
            <Toaster position="top-right" />

            <div className={`services-page-container ${mode === 'dark' ? 'dark-theme' : 'light-theme'}`} dir={dir}>
                
                {isLoading && (
                    <div className="loading-overlay">
                        <Loading />
                    </div>
                )}

                {showResults ? (
                    <div className="results-container">
                      

                        <div className="movies-grid" style={{ marginTop: '20px' }}>
                            {moviesData.map((venue) => (
                                <div key={venue.id} className="movie-card">
                                    <div className="card-image-wrapper">
                                        <img src={venue.image} alt={lang === 'ar' ? venue.title_ar : venue.title_en} className="card-img" />
                                    </div>
                                    <div className="card-content">
                                        <div className="card-header">
                                            <h3 className="movie-title">
                                                {lang === 'ar' ? venue.title_ar : venue.title_en}
                                            </h3>
                                            <span className="heart-icon">🤍</span>
                                        </div>
                                        <div className="rating-container">
                                            <span className="star-icon">★</span>
                                            <span className="rating-value">{venue.rating}</span>
                                        </div>
                                        
                                        <p className="venue-info" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                                            📍 {lang === 'ar' ? venue.location_ar : venue.location_en}
                                        </p>
                                        <p className="venue-info" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                                            👥 {lang === 'ar' ? venue.capacity_ar : venue.capacity_en}
                                        </p>
                                        
                                        <Link 
                                            to="/servicesdetails" 
                                            className="show-details-btn" 
                                            style={{ textDecoration: 'none', marginLeft: lang === 'ar' ? 'auto' : '0', marginRight: lang === 'ar' ? '0' : 'auto' }}
                                        >
                                            {lang === 'ar' ? 'عرض التفاصيل' : 'Show Details'}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="main-selection-view">
                        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                            <h1 className="main-title">
                                {lang === 'ar' ? 'اختر مجال عملك' : 'Select Your Craft'}
                            </h1>
                            <p className="main-subtitle">
                                {lang === 'ar' ? 'انضم إلى العائلة الملكية' : 'JOIN THE ROYAL FAMILY'}
                            </p>
                        </div>

                        <div className="crafts-grid">
                            {crafts.map((item) => (
                                <div key={item.id} className="grid-card-wrapper" onClick={handleCardClick}>
                                    <DashboardCard 
                                        title={lang === 'ar' ? item.title_ar : item.title_en} 
                                        bg={mode === 'dark' ? '#1e1e1e' : item.bg} 
                                        color={mode === 'dark' ? '#ffffff' : item.color}
                                        icon={<span style={{ fontSize: '32px' }}>{item.icon}</span>}
                                    >
                                        <p style={{ textAlign: 'center', color: mode === 'dark' ? '#aaa' : '#64748B', margin: 0, fontSize: '14px' }}>
                                            {lang === 'ar' ? item.desc_ar : item.desc_en}
                                        </p>
                                    </DashboardCard>
                                </div>
                            ))}
                        </div>

                        {/* ================= القسم المحدث بدون كرت ================= */}
                        <div className="vendor-section-free">
                            <h2 className="vendor-title-free">
                                {lang === 'ar' ? 'هل أنت مورد زفاف؟' : 'Are you a wedding vendor?'}
                            </h2>
                            <p className="vendor-subtitle-free">
                                {lang === 'ar' 
                                    ? 'انضم إلى دليلنا وتواصل مع الأزواج الذين يخططون لحفل زفافهم' 
                                    : 'Join our directory and connect with couples planning their wedding'}
                            </p>
                            <Link to="/Provider" className="vendor-btn-free">
                                {lang === 'ar' ? 'ابدأ الآن ←' : 'Get Started →'}
                            </Link>
                        </div>
                        {/* ======================================================== */}
                    </div>
                )}

                <style>{`
                    .services-page-container {
                        min-height: 100vh;
                        padding: 60px 20px;
                        box-sizing: border-box;
                        transition: background-color 0.5s ease, color 0.5s ease;
                    }

                    .light-theme {
                        background-color: #f4e9e2;
                        font-family: serif;
                    }
                    .light-theme .main-title { color: #8d6e63; font-size: 38px; margin-bottom: 10px; font-style: italic; text-align: center; }
                    .light-theme .main-subtitle { color: #a1887f; letter-spacing: 3px; font-size: 13px; font-weight: bold; text-align: center; }
                    .light-theme .back-button { border: 1px solid #8d6e63; color: #8d6e63; }
                    .light-theme .back-button:hover { background: #8d6e63; color: #fff; }
                    .light-theme .movie-card { background-color: #ffffff; border: 1px solid #e5e7eb; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
                    .light-theme .movie-title { color: #222222; }
                    .light-theme .venue-info { color: #555555; }
                    .light-theme .rating-value { color: #222222; }
                    
                    /* ألوان النصوص بدون كرت للثيم الفاتح */
                    .light-theme .vendor-title-free { color: #8d6e63; }
                    .light-theme .vendor-subtitle-free { color: #64748B; }

                    .dark-theme {
                        background-color: #121212;
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    }
                    .dark-theme .main-title { color: #ffffff; font-size: 38px; margin-bottom: 10px; font-style: italic; text-align: center; }
                    .dark-theme .main-subtitle { color: #b97681; letter-spacing: 3px; font-size: 13px; font-weight: bold; text-align: center; }
                    .dark-theme .back-button { border: 1px solid #333; color: #aaa; }
                    .dark-theme .back-button:hover { background: #222; color: #fff; }
                    .dark-theme .movie-card { background-color: #181818; border: 1px solid #222; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
                    .dark-theme .movie-title { color: #ffffff; }
                    .dark-theme .venue-info { color: #bbb; }
                    .dark-theme .rating-value { color: #ffffff; }
                    
                    /* ألوان النصوص بدون كرت للثيم المظلم */
                    .dark-theme .vendor-title-free { color: #ffffff; }
                    .dark-theme .vendor-subtitle-free { color: #aaa; }

                    .loading-overlay {
                        position: fixed;
                        top: 0; left: 0; width: 100%; height: 100%;
                        background: rgba(0, 0, 0, 0.75);
                        display: flex; align-items: center; justify-content: center;
                        z-index: 9999;
                    }

                    .crafts-grid {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 30px;
                        max-width: 1000px;
                        margin: 0 auto;
                    }

                    .grid-card-wrapper {
                        cursor: pointer;
                        transition: transform 0.3s;
                    }
                    .grid-card-wrapper:hover {
                        transform: translateY(-8px);
                    }

                    /* تنسيق الكتابة الحرة والزر بدون صندوق أو كرت خلفية */
                    .vendor-section-free {
                        margin-top: 60px;
                        padding: 20px;
                        text-align: center;
                        max-width: 800px;
                        margin-left: auto;
                        margin-right: auto;
                    }
                    .vendor-title-free {
                        font-size: 28px;
                        font-weight: bold;
                        margin-bottom: 10px;
                    }
                    .vendor-subtitle-free {
                        font-size: 15px;
                        margin-bottom: 25px;
                    }
                    .vendor-btn-free {
                        display: inline-block;
                        background-color: #b97681; /* لون متناسق مع هويتك البصرية الحالية */
                        color: #ffffff;
                        padding: 12px 35px;
                        border-radius: 30px;
                        text-decoration: none;
                        font-weight: bold;
                        transition: background 0.3s ease, transform 0.2s ease;
                    }
                    .vendor-btn-free:hover {
                        background-color: #c98792;
                        transform: scale(1.03);
                    }

                    .back-button {
                        background: none;
                        padding: 8px 16px;
                        border-radius: 20px;
                        cursor: pointer;
                        margin-bottom: 25px;
                        transition: 0.3s;
                        font-weight: bold;
                    }

                    .movies-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                        gap: 30px;
                        max-width: 1100px;
                        margin: 0 auto;
                    }

                    .movie-card {
                        border-radius: 16px;
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                        transition: 0.3s ease;
                    }

                    .card-image-wrapper {
                        width: 100%;
                        height: 260px;
                        background: #252525;
                    }

                    .card-img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    .card-content {
                        padding: 22px;
                        display: flex;
                        flex-direction: column;
                        flex-grow: 1;
                    }

                    .card-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 5px;
                    }

                    .movie-title { font-size: 22px; font-weight: bold; margin: 0; }

                    .rating-container { display: flex; align-items: center; gap: 5px; margin-bottom: 15px; }
                    .star-icon { color: #ffcc00; font-size: 16px; }

                    .venue-info { 
                        font-size: 14px; 
                        margin: 0 0 10px 0; 
                    }

                    .show-details-btn {
                        display: block;
                        background: none; border: none; color: #b97681; font-weight: bold;
                        font-size: 14px; cursor: pointer; padding: 10px 0 0 0; 
                        width: fit-content; transition: 0.2s; margin-top: auto;
                    }
                    .show-details-btn:hover { color: #d59ba6; text-decoration: underline; }

                    @media (max-width: 768px) {
                        .crafts-grid { grid-template-columns: 1fr; }
                        .vendor-title-free { font-size: 24px; }
                        .vendor-subtitle-free { font-size: 13px; }
                    }
                `}</style>
            </div>
        </>
    );
};

export default Services;