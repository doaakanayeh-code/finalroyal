import React, { useContext, useEffect } from "react"; 
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import o2 from "./assets/o2.png";
import o3 from "./assets/o3.png";
import o4 from "./assets/o4.png";
import heroImg from "./assets/image.png";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Box, Typography } from "@mui/material";
import { ThemeContext } from "../src/Context/ThemeContext"; 

const slides = [
  {
    id: 1,
    title: "Event Management",
    description: "All the tools you need to organize a successful and memorable event.",
    image: o2, 
  },
  {
    id: 2,
    title: "Sweeten Your Moments",
    description: "Discover a wide selection of premium cakes for all your special occasions.",
    image: o3,
  },
  {
    id: 3,
    title: "Get Started Now",
    description: "Discover amazing features and start organizing your very first event today.",
    image: o4,
  },
];

export default function HeroSlider() {
  const { mode } = useContext(ThemeContext);
  const isDark = mode === "dark";

 
  console.log("Current Theme Mode:", mode);
  console.log("Is it Dark Mode?:", isDark);

  useEffect(() => {
    
    if (isDark) {
      console.log("✅ Component says it IS dark mode");
    } else {
      console.log("❌ Component says it IS NOT dark mode");
    }
  }, [isDark]);

  return (
    <Box className={isDark ? "dark-hero-container" : "light-hero-container"} sx={{ bgcolor: isDark ? "#121212" : "#FDF5F5", width: "100%", transition: "0.5s ease" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 3, md: 10 },
          py: { xs: 6, md: 10 },
          flexDirection: { xs: "column", md: "row" },
          gap: 6,
        }}
      >
        <Box 
          flex={1} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            textAlign: 'center', 
            gap: 3 
          }}
        >
          <Typography
            variant="h2"
            className="hero-main-title"
            sx={{ 
              fontWeight: "600", 
              fontSize: { xs: "2.5rem", md: "3.5rem" } 
            }}
          >
            Welcome To Our Website
          </Typography>

          <Typography 
            className="hero-subtitle"
            sx={{ 
              fontSize: "1.3rem", 
              maxWidth: "600px",
              lineHeight: 1.8 
            }}
          >
            Discover a wide selection of premium cakes for all your special occasions.
          </Typography>
        </Box>

        <Box flex={1} textAlign="center">
           <Box
             component="img"
             src={heroImg} 
             alt="Hero"
             className="hero-img"
             sx={{ 
               width: "100%", 
               maxWidth: "500px", 
               height: "auto",
               borderRadius: "20px",
               p: 1,
               transition: "0.5s ease"
             }}
           />
        </Box>
      </Box>

      <Box className="swiper-outer-container" sx={{ py: 10, transition: "0.5s ease" }}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          style={{ width: "90%", maxWidth: "1300px" }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Box 
                sx={{ 
                  display: "flex", 
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center", 
                  justifyContent: "space-between",
                  px: { xs: 2, md: 10 }, 
                  pb: 8, 
                  gap: 4
                }}
              >
                 <Box flex={1} sx={{ textAlign: { xs: "center", md: "left" } }}>
                    <Typography variant="h3" className="swiper-slide-title" sx={{ fontWeight: 'bold', mb: 3, fontSize: { xs: "2rem", md: "3rem" } }}>
                      {slide.title}
                    </Typography>
                    <Typography className="swiper-slide-description" sx={{ opacity: 0.9, fontSize: "1.4rem", lineHeight: 1.6 }}>
                      {slide.description}
                    </Typography>
                 </Box>
                 <Box flex={1} textAlign="center">
                    <img 
                      src={slide.image} 
                      alt={slide.title} 
                      style={{ width: "320px", height: "auto", objectFit: "contain" }} 
                    />
                 </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>


      <style>
        {`
          /* 📝 تنسيقات عامة للـ Swiper */
          .swiper-pagination-bullet { background: #fff !important; opacity: 0.5; width: 12px; height: 12px; }
          .swiper-pagination-bullet-active { background: #fff !important; opacity: 1; width: 40px; border-radius: 6px; }
          .swiper-button-next, .swiper-button-prev { color: #fff !important; transform: scale(1.2); }

          /* 📝 تنسيقات قوية للـ Light Mode */
          .light-hero-container { background-color: #FDF5F5 !important; }
          .light-hero-container .hero-main-title { color: #D08787 !important; }
          .light-hero-container .hero-subtitle { color: #777 !important; }
          .light-hero-container .hero-img { border: 4px solid #fff5f7 !important; boxShadow: 0px 10px 30px rgba(0,0,0,0.1) !important; }
          .light-hero-container .swiper-outer-container { background-color: #DCC8BB !important; border: 4px solid #e0c8c8 !important; }
          .light-hero-container .swiper-slide-title { color: white !important; }
          .light-hero-container .swiper-slide-description { color: white !important; }

          /* 📝 تنسيقات قوية جداً للـ Dark Mode بـ !important لتجاوز التعارض */
          .dark-hero-container { background-color: #121212 !important; }
          .dark-hero-container .hero-main-title { color: #ffffff !important; }
          .dark-hero-container .hero-subtitle { color: #aaa !important; }
          .dark-hero-container .hero-img { border: 4px solid #1e1e1e !important; boxShadow: 0px 10px 30px rgba(0,0,0,0.7) !important; }
          .dark-hero-container .swiper-outer-container { background-color: #1e1e1e !important; border: 4px solid #292929 !important; }
          .dark-hero-container .swiper-slide-title { color: #b97681 !important; }
          .dark-hero-container .swiper-slide-description { color: #eee !important; }
        `}
      </style>
    </Box>
  );
}