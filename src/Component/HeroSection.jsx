import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Container, Stack } from '@mui/material';
import patternBg from "../assets/o0.png"; 
import womanWorking from "../assets/o1.png"; 
import BookingModal from "./BookingModal";
import { useTranslation } from 'react-i18next';

const HeroSection = ({ heroImage }) => {
  console.log("heroImage =", heroImage);
  const [click, setClick] = useState(false);
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const currentHeroImage = heroImage || womanWorking;

  return (
    <Box 
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        borderBottomLeftRadius: { xs: '60px', md: '200px' },
        borderBottomRightRadius: { xs: '60px', md: '200px' },
        py: { xs: 5, md: 10 },
        direction: isAr ? 'rtl' : 'ltr'
      }}
    >
      <Box 
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          height: '90%',
          backgroundImage: `url(${patternBg})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.05,
          zIndex: 1
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid 
          container 
          spacing={2} 
          alignItems="center"
          wrap="nowrap" 
          sx={{ 
            flexDirection: { xs: 'column', md: isAr ? 'row-reverse' : 'row' },
            width: '100%',
            m: 0 
          }}
        >
          <Grid item md={6} xs={12} sx={{ width: '100%', textAlign: isAr ? 'right' : 'left' }}>
            <Typography 
              variant="overline"
              sx={{
                color: 'text.primary',
                fontWeight: 'bold',
                backgroundColor: 'background.paper',
                px: 2,
                py: 0.5,
                borderRadius: '20px',
                display: 'inline-block'
              }}
            >
              {t('hero.overline', 'WE PLAN. YOU CELEBRATE')}
            </Typography>

            <Typography 
              variant="h2"
              sx={{
                fontWeight: 900,
                color: 'text.primary',   
                mt: 3,
                mb: 2,
                fontSize: { xs: '2.2rem', md: '3.5rem' }, 
                lineHeight: 1.2
              }}
            >
              {t('hero.title_part1', 'We plan your')} <br />
              <Box component="span" sx={{ color: 'primary.main' }}>
                {t('hero.title_highlight', 'perfect wedding')}
              </Box>{" "}
              <br />
              {t('hero.title_part2', 'experience')}
            </Typography>

            <Typography 
              variant="body1"
              sx={{
                color: 'text.secondary',
                mb: 4,
                fontSize: '1rem',
                maxWidth: '450px'
              }}
            >
              {t('hero.subtitle')}
            </Typography>

            <Stack 
              direction="row" 
              spacing={2} 
              sx={{ 
                mb: 5, 
                justifyContent: isAr ? 'flex-start' : 'flex-start'
              }}
            >
              <Button 
                variant="contained"
                onClick={() => setClick(true)}
                sx={{
                  bgcolor: '#d18c96',
                  color: '#fff',
                  px: 4,
                  py: 1.2,
                  borderRadius: '50px',
                  textTransform: 'none',
                  fontWeight: 'bold'
                }}
              >
                {t('hero.book_now', 'Book Now →')}
              </Button>

              <Button 
                variant="outlined"
                sx={{
                  color: 'text.primary',
                  borderColor: '#d18c96',
                  px: 3,
                  borderRadius: '50px',
                  textTransform: 'none',
                  fontWeight: 'bold'
                }}
              >
                {t('hero.view_services', 'View Services')}
              </Button>
            </Stack>
          </Grid>

          <Grid item md={6} xs={12} sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            width: '100%' 
          }}>
            <Box
              component="img"
              src={currentHeroImage} 
              alt="Illustration"
              sx={{
                width: '100%',
                maxWidth: { xs: '300px', md: '500px' }, 
                height: 'auto',
                transform: isAr ? 'scaleX(-1)' : 'none' 
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {click && (
        <BookingModal open={click} onClose={() => setClick(false)} />
      )}
    </Box>
  );
};

export default HeroSection;