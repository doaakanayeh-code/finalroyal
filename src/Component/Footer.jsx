import React, { useState, useRef } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import CloseIcon from '@mui/icons-material/Close';
import { 
  Box, Typography, Container, Grid, Stack, IconButton, Dialog, DialogContent 
} from '@mui/material';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const [openScanner, setOpenScanner] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const scannerRef = useRef(null);

  const handleStartScanner = () => {
    setOpenScanner(true);
    // تأخير بسيط لضمان تحميل الـ DOM الخاص بالـ Dialog
    setTimeout(() => {
      const scanner = new Html5QrcodeScanner('reader', {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      });
      scannerRef.current = scanner;
      scanner.render(
        (decodedText) => {
          setScanResult(decodedText);
          scanner.clear();
        },
        (err) => { console.warn(err); }
      );
    }, 500);
  };

  const handleCloseScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.clear();
    }
    setOpenScanner(false);
    setScanResult(null);
  };

  return (
    <Box component="footer" sx={{ bgcolor: 'background.default', pt: 8, pb: 4, borderTop: 1, borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="space-between" alignItems="flex-start">
          
          <Grid item xs={12} md={3.5}>
            <Typography sx={{ fontFamily: "'Great Vibes', cursive", fontSize: '2.2rem', color: 'primary.main', mb: 1 }}>
              Royal Moment
            </Typography>
            <Stack direction="row" spacing={1}>
           <IconButton sx={{ color: 'primary.main' }} size="small"><FacebookIcon /></IconButton>
              <IconButton sx={{ color: 'primary.main' }} size="small"><TwitterIcon /></IconButton>
              <IconButton sx={{ color: 'primary.main' }} size="small"><LinkedInIcon /></IconButton>
              <IconButton sx={{ color: 'primary.main' }} size="small"><InstagramIcon /></IconButton>
              <IconButton sx={{ color: 'primary.main' }} size="small"><QrCodeScannerIcon onClick={handleStartScanner} /></IconButton>
            </Stack>
          </Grid>
             <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Box>
              <Typography sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary' }}>
                {t('footer.quick_links')}
              </Typography>
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
            </Box>

            <Box>
              <Typography sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary' }}>
                {t('footer.contact_us')}
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 1, direction: 'ltr', textAlign: 'left' }}>📞 +963 994 931 568</Typography>
              <Typography sx={{ color: 'text.secondary', mb: 1 }}>✉️ info@royalmoment.com</Typography>
              <Typography sx={{ color: 'text.secondary', mb: 1 }}>📍 {t('footer.address')}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={3.5}>
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
          
          <Typography sx={{ textAlign: 'center', color: 'text.secondary', mt: 6, borderTop: 1, borderColor: 'divider', pt: 3 }}>
          {t('footer.rights')}
        </Typography>
        </Grid>
      </Container>
      <Dialog open={openScanner} onClose={handleCloseScanner} fullWidth maxWidth="xs">
        <DialogContent sx={{ textAlign: 'center' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">ماسح الباركود</Typography>
            <IconButton onClick={handleCloseScanner}><CloseIcon /></IconButton>
          </Box>
          <div id="reader" style={{ marginTop: '20px' }}></div>
          {scanResult && <Typography mt={2}>النتيجة: {scanResult}</Typography>}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Footer;


