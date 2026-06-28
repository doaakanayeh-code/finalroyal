import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const VenueSlider = () => {
    const navigate = useNavigate();

    const venues = [
        {
            id: 1,
            name: 'صالة لازورد',
            location: 'دمشق - المزة',
            capacity: '500 شخص',
            img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500'
        },
        {
            id: 2,
            name: 'صالة البهية',
            location: 'دمشق - طريق المطار',
            capacity: '700 شخص',
            img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500'
        },
        {
            id: 3,
            name: 'صالة الجلاء',
            location: 'دمشق - أوتوستراد المزة',
            capacity: '400 شخص',
            img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500'
        },
        {
            id: 4,
            name: 'صالة مون هاوس',
            location: 'دمشق-شارع برنية',
            capacity: '600 شخص',
            img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500'
        },
    ];

    const handleExploreClick = (venue) => {
        navigate('/ServicesDetails', { state: { venue } });
    };

    return (
        <div
            style={{
                backgroundColor: '#DCC8BB',
                padding: '40px 20px',
                borderRadius: '40px',
                width: '100%',
                boxSizing: 'border-box'
            }}
        >
            <h2
                style={{
                    color: '#ffffff',
                    textAlign: 'center',
                    marginBottom: '60px',
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    fontFamily: 'serif'
                }}
            >
                الصالات المتاحة
            </h2>

            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                }}
                style={{ paddingBottom: '60px' }}
            >
                {venues.map((venue) => (
                    <SwiperSlide key={venue.id}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            <div
                                style={{
                                    position: 'relative',
                                    width: '200px',
                                    height: '200px',
                                    marginBottom: '40px'
                                }}
                            >
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        backgroundColor: '#2d4d42',
                                        borderRadius: '24px',
                                        transform: 'translate(12px, 12px)'
                                    }}
                                ></div>

                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        backgroundColor: '#e9d5ca',
                                        borderRadius: '24px',
                                        transform: 'translate(6px, 6px)',
                                        border: '1px solid #d4af37'
                                    }}
                                ></div>

                                <div
                                    style={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: '#fff',
                                        borderRadius: '24px',
                                        overflow: 'hidden',
                                        boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
                                        border: '1px solid #f0f0f0'
                                    }}
                                >
                                    <img
                                        src={venue.img}
                                        alt={venue.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ textAlign: 'center' }}>
                                <h3
                                    style={{
                                        color: '#ffffff',
                                        fontSize: '1.2rem',
                                        fontWeight: 'bold',
                                        marginBottom: '5px'
                                    }}
                                >
                                    {venue.name}
                                </h3>

                                <p
                                    style={{
                                        color: '#5d4037',
                                        fontSize: '0.85rem',
                                        margin: '2px'
                                    }}
                                >
                                    📍 {venue.location}
                                </p>

                                <p
                                    style={{
                                        color: '#5d4037',
                                        fontSize: '0.85rem',
                                        marginBottom: '15px'
                                    }}
                                >
                                    👥 السعة: {venue.capacity}
                                </p>

                                <button
                                    onClick={() => handleExploreClick(venue)}
                                    style={{
                                        backgroundColor: '#ffffff',
                                        border: '2px solid #ffffff',
                                        color: '#8d6e63',
                                        padding: '8px 20px',
                                        borderRadius: '30px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                                    }}
                                >
                                    استكشف الصالة
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default VenueSlider;