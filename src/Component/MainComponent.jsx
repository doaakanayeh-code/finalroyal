import React from 'react';
import { 
  Box, Typography, Rating, Avatar, Container, Grid, Stack, useTheme 
} from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import coupleImg from "../assets/couple.png"; 
import { useTranslation } from 'react-i18next'; // 1. استيراد Hook الترجمة
import img1 from "../assets/h1.png";
import img2 from "../assets/h2.png";
import img3 from "../assets/h3.png";
const ServicesSection = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { t } = useTranslation(); // 2. تفعيل دالة الترجمة

  // مصفوفة الخدمات مع استخدام مفاتيح الترجمة
  const services = [
    { id: 1, title: t('services_section.service1_desc'), icon: img1 },
    { id: 2, title: t('services_section.service2_desc'), icon: img2 },
    { id: 3, title: t('services_section.service3_desc'), icon: img3 }
  ];

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        bgcolor: 'background.default',
        paddingBottom: '80px',
        margin: 0, 
        transition: 'background-color 0.3s ease',
      }}
    >
      {/* SVG Wave تبقى كما هي */}
      <Box sx={{ position: 'absolute', top: '-100px', left: 0, width: '100%', lineHeight: 0, zIndex: 1 }}>
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ width: '100%', height: '101px', display: 'block', background: 'transparent' }}>
          <path d="M0,150 L500,150 L500,100 C250,-50 0,100 0,100 Z" style={{ stroke: 'none', fill: isDark ? "#121212" : "#fff5f7" }} />
        </svg>
      </Box>

      <Container maxWidth="lg" sx={{ textAlign: 'center', position: 'relative', zIndex: 2, pt: 8 }}>
        <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 'bold', letterSpacing: 2 }}>
          {t('services_section.overline')}
        </Typography>

        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: 'text.primary' }}>
          {t('services_section.title')}
        </Typography>

        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 6 }}>
          {t('services_section.subtitle')}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 4 }}>
          {services.map((service) => (
            <Box
              key={service.id}
              sx={{
                bgcolor: 'background.paper',
                borderRadius: '40px',
                boxShadow: isDark ? '0px 10px 30px rgba(0,0,0,0.5)' : '0px 10px 30px rgba(185, 118, 129, 0.1)',
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 4,
                width: '320px',
                textAlign: 'center',
                transition: '0.3s',
                '&:hover': { transform: 'translateY(-10px)' }
              }}
            >
              <img src={service.icon} alt="icon" style={{ width: '70px', height: '70px', marginBottom: '25px', filter: isDark ? 'brightness(0.9)' : 'none' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', color: 'text.primary' }}>
                {service.title}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

const Testimonial = () => {
  const { t } = useTranslation(); // تفعيل الترجمة هنا أيضاً
  return (
    <Box sx={{ bgcolor: 'background.default', py: 5 }}>
      <Container maxWidth="lg">
        <Box sx={{
          bgcolor: 'background.paper',
          borderRadius: '30px',
          p: { xs: 4, md: 6 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 2,
        }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <FormatQuoteIcon sx={{ fontSize: 50, color: 'primary.main', transform: 'scaleX(-1)' }} />
            <Box>
              <Typography variant="h6" sx={{ color: 'text.secondary', fontStyle: 'italic', mb: 2, fontWeight: 400 }}>
                {t('testimonials.quote')}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Rating value={5} readOnly sx={{ color: 'primary.main' }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                  {t('testimonials.author')}
                </Typography>
              </Stack>
            </Box>
          </Box>
          <Box component="img" src={coupleImg} sx={{ width: { xs: '90%', md: '220px' }, height: 'auto', borderRadius: '15px', objectFit: 'contain', mt: { xs: 2, md: 0 } }} />
        </Box>
      </Container>
    </Box>
  );
};

const MainComponent = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <ServicesSection />
      <Testimonial />
    </Box>
  );
};

export default MainComponent;