import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { useTranslation } from 'react-i18next';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import homeImg from "../assets/home.png";
import { Box, Typography, Button, GlobalStyles } from "@mui/material";

export default function HeroSection() {
  const { t, i18n } = useTranslation();

  const slides = [
    {
      id: 1,
      title: t('home.title'), 
      description: t('home.description'), 
    image: homeImg,
    },
  ];

  return (
    <Box sx={{ width: "100%", p: { xs: 2, md: 3 }, direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}>
      <GlobalStyles
        styles={{
          ".swiper-pagination-bullet-active": { backgroundColor: "#00796B !important" },
          ".swiper-button-next, .swiper-button-prev": { color: "#00796B", transform: "scale(0.7)" },
        }}
      />

      <Box
        sx={{
          width: "100%",
          minHeight: "80vh",
          backgroundColor: "#FDF5F5",
          borderRadius: "40px",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          border: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <Box 
          sx={{ 
            position: "absolute", 
            bottom: -20, 
            left: 0, 
            width: "100%", 
            height: "100%", 
            zIndex: 1,
            transform: i18n.language === 'ar' ? 'scaleX(-1)' : 'none' 
          }}
        >
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ width: "100%", height: "100%", opacity: 0.5 }}>
            <path fill="#F5E7D7" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,202.7C960,224,1056,224,1152,197.3C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </Box>

        <Swiper 
          modules={[Navigation, Pagination, Autoplay]} 
          navigation 
          pagination={{ clickable: true }} 
          autoplay={{ delay: 5000 }} 
          style={{ width: "100%", zIndex: 2 }}
          key={i18n.language} 
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  justifyContent: "center",
                  px: { xs: 4, md: 10 },
                  gap: { xs: 4, md: 2 },
                }}
              >
                <Box sx={{ flex: 1, textAlign: { xs: "center", md: i18n.language === 'ar' ? 'right' : 'left' }, zIndex: 5 }}>
                  <Typography variant="h2" sx={{ color: "#D08787", fontWeight: 900, mb: 2, fontSize: { xs: "2.8rem", md: "4.5rem" }, lineHeight: 1.1 }}>
                    {slide.title}
                  </Typography>
                  <Typography sx={{ color: "#718096", mb: 4, fontSize: "1.4rem", maxWidth: "450px" }}>
                    {slide.description}
                  </Typography>
                  <Button variant="contained" sx={{ bgcolor: "#D08787", borderRadius: "15px", px: 5, py: 2, fontSize: "1.1rem", fontWeight: "bold", textTransform: "none", boxShadow: "0 10px 20px rgba(0,121,107,0.2)" }}>
                    {t('home.view_moments')}
                  </Button>
                </Box>

                <Box
                  sx={{
                    flex: 1.8,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <Box sx={{ position: "absolute", width: "120%", height: "120%", backgroundColor: "#F5E7D7", borderRadius: "50%", zIndex: -1, filter: "blur(80px)", opacity: 0.6 }} />

                  <img
                    src={slide.image}
                    alt="Hero"
                    style={{
                      width: "115%",
                      maxWidth: "950px",
                      transform: "scale(1.2) translateY(20px)",
                      zIndex: 5,
                      objectFit: "contain",
                      filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.15))",
                    }}
                  />
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}