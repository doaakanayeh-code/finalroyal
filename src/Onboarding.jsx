import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// استيراد الصور في الأعلى (هذا هو الحل الصحيح لـ Vite)
import o2 from "./assets/o2.png";
import o3 from "./assets/o3.png";
import o4 from "./assets/o4.png";
import heroImg from "./assets/image.png";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Box, Typography } from "@mui/material";

const slides = [
  {
    id: 1,
    title: "Event Management",
    description: "All the tools you need to organize a successful and memorable event.",
    image: o2, // استخدام المتغير المستورد
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
  return (
    <Box sx={{ bgcolor: "#FDF5F5", width: "100%" }}>
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
            sx={{ 
              color: "#D08787", 
              fontWeight: "600", 
              fontSize: { xs: "2.5rem", md: "3.5rem" } 
            }}
          >
            Welcome To Our Website
          </Typography>

          <Typography 
            sx={{ 
              color: "#777", 
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
             src={heroImg} // استخدام المتغير المستورد هنا أيضاً
             alt="Hero"
             sx={{ 
               width: "100%", 
               maxWidth: "500px", 
               height: "auto",
               border: "4px solid #fff5f7",
               borderRadius: "20px",
               p: 1,
               boxShadow: "0px 10px 30px rgba(0,0,0,0.1)"
             }}
           />
        </Box>
      </Box>

      <Box sx={{ py: 10, bgcolor: "#DCC8BB", border: "4px solid #e0c8c8" }}>
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
                  color: "white",
                  gap: 4
                }}
              >
                 <Box flex={1} sx={{ textAlign: { xs: "center", md: "left" } }}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 3, fontSize: { xs: "2rem", md: "3rem" } }}>
                      {slide.title}
                    </Typography>
                    <Typography sx={{ opacity: 0.9, fontSize: "1.4rem", lineHeight: 1.6 }}>
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
          .swiper-pagination-bullet { background: #fff !important; opacity: 0.5; width: 12px; height: 12px; }
          .swiper-pagination-bullet-active { background: #fff !important; opacity: 1; width: 40px; border-radius: 6px; }
          .swiper-button-next, .swiper-button-prev { color: #fff !important; transform: scale(1.2); }
        `}
      </style>
    </Box>
  );
}