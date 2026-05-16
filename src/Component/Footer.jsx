import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import IconButton from '@mui/material/IconButton';
import { 
  Box, Typography, Container, Grid, Stack 
} from '@mui/material';
// 1. استيراد الترجمة
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Box component="footer" sx={{ bgcolor: 'background.default', pt: 8, pb: 4, borderTop: 1, borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontFamily: "'Great Vibes', cursive", fontSize: '2.2rem', color: 'primary.main', mb: 1 }}>
              Royal Moment
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
              {t('footer.description')}
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton sx={{ color: 'primary.main' }} size="small"><FacebookIcon /></IconButton>
              <IconButton sx={{ color: 'primary.main' }} size="small"><TwitterIcon /></IconButton>
              <IconButton sx={{ color: 'primary.main' }} size="small"><LinkedInIcon /></IconButton>
              <IconButton sx={{ color: 'primary.main' }} size="small"><InstagramIcon /></IconButton>
            </Stack>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary' }}>
              {t('footer.quick_links')}
            </Typography>
            {/* استخدام مفاتيح النافبار للروابط السريعة لتوحيد الترجمة */}
            {[
              { key: 'home', label: t('navbar.home') },
              { key: 'services', label: t('navbar.services') },
              { key: 'about', label: t('navbar.about') },
              { key: 'contact', label: t('navbar.contact') }
            ].map(link => (
              <Typography key={link.key} sx={{ color: 'text.secondary', mb: 1, cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                {link.label}
              </Typography>
            ))}
          </Grid>

          <Grid item xs={6} md={3}>
            <Typography sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary' }}>
              {t('footer.contact_us')}
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 1, direction: 'ltr', textAlign: 'left' }}>📞 +963 994 931 568</Typography>
            <Typography sx={{ color: 'text.secondary', mb: 1 }}>✉️ info@royalmoment.com</Typography>
            <Typography sx={{ color: 'text.secondary', mb: 1 }}>📍 {t('footer.address')}</Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary' }}>
              {t('footer.location')}
            </Typography>
            <Box sx={{ 
              width: '100%', 
              height: '150px', 
              borderRadius: '12px', 
              overflow: 'hidden', 
              border: '1px solid', 
              borderColor: 'divider' 
            }}>
              <iframe
                title="Damascus Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.6565!2d36.2765!3d33.5138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518e6dc413cc6a7%3A0x6cc85f1f3c305531!2sDamascus%2C%20Syria!5e0!3m2!1sen!2s!4v1652264567890!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </Box>
          </Grid>

        </Grid>

        <Typography sx={{ textAlign: 'center', color: 'text.secondary', mt: 6, borderTop: 1, borderColor: 'divider', pt: 3 }}>
          {t('footer.rights')}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;