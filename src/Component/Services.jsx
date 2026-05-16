import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Loading = () => {
    return (
        <div className="spinner-container-submit">
            <div className="spinner"></div>   
        </div>
    );
}

const crafts = [
  { id: 1, title: "Floral Designer", desc: "Petals & Elegance", icon: "🌸" },
  { id: 2, title: "Cake Artisan", desc: "Sweet Masterpieces", icon: "🎂" },
  { id: 3, title: "Grand Hall", desc: "Prestigious Venues", icon: "🏰" },
  { id: 4, title: "Photography", desc: "Timeless Memories", icon: "📸" },
  { id: 5, title: "Event Planner", desc: "Seamless Luxury", icon: "🎉" },
  { id: 6, title: "Music & DJ", desc: "Royal Beats", icon: "🎵" },
];

const VenueSlider = () => {
  const venues = [
    { id: 1, name: 'صالة لازورد', location: 'دمشق - المزة', capacity: '500 شخص', img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500' },
    { id: 2, name: 'صالة البهية', location: 'دمشق - طريق المطار', capacity: '700 شخص', img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500' },
    { id: 3, name: 'صالة الجلاء', location: 'دمشق - أوتوستراد المزة', capacity: '400 شخص', img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500' },
    { id: 4, name: 'صالة مون هاوس', location: 'ريف دمشق', capacity: '600 شخص', img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500' },
  ];

  return (
    <div style={{ backgroundColor: '#DCC8BB', padding: '40px 20px', borderRadius: '40px', width: '100%' }}>
      <h2 style={{ color: '#d4af37', textAlign: 'center', marginBottom: '60px', fontSize: '1.8rem', fontWeight: 'bold', fontFamily: 'serif' }}>الصالات المتاحة</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        style={{ paddingBottom: '60px' }}
      >
        {venues.map((venue) => (
          <SwiperSlide key={venue.id}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '200px', height: '200px', marginBottom: '40px' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundColor: '#2d4d42', borderRadius: '24px', transform: 'translate(12px, 12px)' }}></div>
                <div style={{ position: 'absolute', inset: 0, backgroundColor: '#e9d5ca', borderRadius: '24px', transform: 'translate(6px, 6px)', border: '1px solid #d4af37' }}></div>
                <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#fff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.15)', border: '1px solid #f0f0f0' }}>
                  <img src={venue.img} alt={venue.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ color: '#DCC8BB', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '5px' }}>{venue.name}</h3>
                <p style={{ color: '#5d4037', fontSize: '0.85rem', margin: '2px' }}>📍 {venue.location}</p>
                <p style={{ color: '#5d4037', fontSize: '0.85rem', marginBottom: '15px' }}>👥 السعة: {venue.capacity}</p>
                <button style={{ backgroundColor: 'transparent', border: '2px solid #d18c96', color: '#d18c96', padding: '8px 20px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold' }}>استكشف الصالة</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const Services = () => {
  const [showSlider, setShowSlider] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCardClick = () => {
    setIsLoading(true); 
    
    setTimeout(() => {
      setIsLoading(false);
      setShowSlider(true);
    }, 1000);
  };

  return (
    <div style={{ backgroundColor: '#f4e9e2', minHeight: '100vh', padding: '60px 20px', fontFamily: 'serif', position: 'relative' }}>
      
      {isLoading && (
        <div className="modal-overlay">
           <Loading />
        </div>
      )}

      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ color: '#8d6e63', fontSize: '38px', marginBottom: '10px', fontStyle: 'italic' }}>Select Your Craft</h1>
        <p style={{ color: '#a1887f', letterSpacing: '3px', fontSize: '13px', fontWeight: 'bold' }}>JOIN THE ROYAL FAMILY</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', maxWidth: '1000px', margin: '0 auto' }}>
        {crafts.map((item) => (
          <div key={item.id} onClick={handleCardClick} className="royal-card" style={{ backgroundColor: '#e9d5ca', borderRadius: '45px', padding: '40px 20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.4s ease' }}>
            <div style={{ backgroundColor: '#fff', width: '85px', height: '85px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '35px' }}>
              {item.icon}
            </div>
            <h3 style={{ color: '#8d6e63', fontSize: '20px', fontWeight: 'bold' }}>{item.title}</h3>
            <p style={{ color: '#8d6e63', fontSize: '14px', fontStyle: 'italic', opacity: '0.8' }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {showSlider && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowSlider(false)}>✕</button>
            <VenueSlider />
          </div>
        </div>
      )}

      <style>{`
        .spinner-container-submit {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .spinner {
            width: 50px;
            height: 50px;
            border: 5px solid rgba(212, 175, 55, 0.3);
            border-top: 5px solid #DCC8BB; 
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .royal-card:hover { transform: translateY(-10px); background-color: #d7ccc8 !important; }
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); display: flex; align-items: center; justify-content: center; z-index: 9999; }
        .modal-content { background: #DCC8BB; padding: 30px; border-radius: 40px; width: 90%; max-width: 1100px; position: relative; animation: slideIn 0.3s ease-out; }
        .close-btn { position: absolute; top: 15px; right: 20px; background: #DCC8BB; border: none; width: 35px; height: 35px; border-radius: 50%; color: white; cursor: pointer; }
        @keyframes slideIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default Services;