import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next"; // 1. استيراد الترجمة

import o2 from "./assets/o2.png";
import o3 from "./assets/o3.png";
import o4 from "./assets/o4.png";
import heroImg from "./assets/image.png";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Box, Typography } from "@mui/material";
import { ThemeContext } from "../src/Context/ThemeContext"; 

export default function HeroSlider() {
  const { mode } = useContext(ThemeContext);
  const { t, i18n } = useTranslation(); // 2. استخدام t و i18n
  const isDark = mode === "dark";

  // 3. تعريف الشرائح باستخدام الترجمة
  const slides = [
    { id: 1, title: t("hero_slider.slide1_title"), description: t("hero_slider.slide1_desc"), image: o2 },
    { id: 2, title: t("hero_slider.slide2_title"), description: t("hero_slider.slide2_desc"), image: o3 },
    { id: 3, title: t("hero_slider.slide3_title"), description: t("hero_slider.slide3_desc"), image: o4 },
  ];

  return (
    // 4. إضافة dir={i18n.dir()} لضبط اتجاه الصفحة تلقائياً
    <Box dir="ltr" className={isDark ? "dark-hero-container" : "light-hero-container"} sx={{ bgcolor: isDark ? "#121212" : "#FDF5F5", width: "100%", transition: "0.5s ease" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", px: { xs: 3, md: 10 }, py: { xs: 6, md: 10 }, flexDirection: { xs: "column", md: "row" }, gap: 6 }}>
        
        <Box flex={1} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 3 }}>
          <Typography variant="h2" className="hero-main-title" sx={{ fontWeight: "600", fontSize: { xs: "2.5rem", md: "3.5rem" } }}>
            {t("hero2.welcome")} {/* نص مترجم */}
          </Typography>
          <Typography className="hero-subtitle" sx={{ fontSize: "1.3rem", maxWidth: "600px", lineHeight: 1.8 }}>
            {t("hero2.subtitle")} {/* نص مترجم */}
          </Typography>
        </Box>

        <Box flex={1} textAlign="center">
           <Box component="img" src={heroImg} alt="Hero" className="hero-img" sx={{ width: "100%", maxWidth: "500px", borderRadius: "20px", p: 1 }} />
        </Box>
      </Box>

      {/* Slider Section */}
      <Box className="swiper-outer-container" sx={{ py: 10 }}>
        <Swiper modules={[Navigation, Pagination, Autoplay]} navigation pagination={{ clickable: true }} autoplay={{ delay: 3000 }} loop={true} style={{ width: "90%", maxWidth: "1300px" }}>
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", justifyContent: "space-between", px: { xs: 2, md: 10 }, gap: 4 }}>
                 <Box flex={1} sx={{ textAlign: { xs: "center", md: i18n.dir() === 'rtl' ? "right" : "left" } }}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 3 }}>{slide.title}</Typography>
                    <Typography sx={{ opacity: 0.9, fontSize: "1.4rem" }}>{slide.description}</Typography>
                 </Box>
                 <Box flex={1} textAlign="center">
                    <img src={slide.image} alt={slide.title} style={{ width: "320px" }} />
                 </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}