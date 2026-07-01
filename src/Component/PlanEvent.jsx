import React, { useContext, useState } from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import { ThemeContext } from "../Context/ThemeContext";
import { LanguageContext } from "../Context/LanguageContext";
import { useTranslation } from "react-i18next";
import eventGifD from '../assets/PlanEventD.gif';
import eventGif from '../assets/PlanEvent.gif';


export default function PlanEvent() {
  const { mode } = useContext(ThemeContext);
  const { dir } = useContext(LanguageContext);
  const { t } = useTranslation();

  const isDark = mode === 'dark';

  return (
    <Box dir={dir} sx={{ 
      maxWidth: 450, mx: 'auto', p: 3, mt: 2, 
      backgroundColor: isDark ? '#1e1e1e' : '#fdf5f5', 
      borderRadius: '30px',
      border: isDark ? '1px solid #333' : 'none'
    }}>

<Box sx={{ 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center',    
  mb: 4, 
  mt: 2 
}}>
  <img 
    src={isDark ? eventGifD : eventGif} 
    alt="Planning Event Animation" 
    style={{ 
      maxWidth: '220px',    
      width: '100%', 
      height: 'auto' 
    }} 
  />
</Box>
      
      {/* Header */}
      <Box sx={{ backgroundColor: "#b97681", color: '#fff', py: 2, mb: 3, borderRadius: '20px', textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{t("plan_event.title")}</Typography>
      </Box>

      {/* حقول التفاصيل */}
      <Typography variant="subtitle1" sx={{ color: isDark ? '#fff' : '#b97681', mb: 1 }}>{t("plan_event.details")}</Typography>
      <TextField fullWidth label={t("plan_event.name")} variant="outlined" sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '15px' } }} />
      <TextField fullWidth label={t("plan_event.budget")} variant="outlined" sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '15px' } }} />

      {/* الجدول الزمني */}
      <Typography variant="subtitle1" sx={{ color: isDark ? '#fff' : '#b97681', mb: 1 }}>{t("plan_event.schedule")}</Typography>
      <TextField fullWidth type="date" sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '15px' } }} InputLabelProps={{ shrink: true }} />
      <Grid container spacing={1} sx={{ mb: 2 }}>
        <Grid item xs={6}><TextField fullWidth label={t("plan_event.start")} type="time" InputLabelProps={{ shrink: true }} /></Grid>
        <Grid item xs={6}><TextField fullWidth label={t("plan_event.end")} type="time" InputLabelProps={{ shrink: true }} /></Grid>
      </Grid>

      {/* الموقع والدفع */}
      <Typography variant="subtitle1" sx={{ color: isDark ? '#fff' : '#b97681', mb: 1 }}>{t("plan_event.location")}</Typography>
      <TextField fullWidth label={t("plan_event.map")} sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: '15px' } }} />

      <Typography variant="subtitle1" sx={{ color: isDark ? '#fff' : '#b97681', mb: 1 }}>{t("plan_event.payment")}</Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        {['cash', 'wallet', 'electronic'].map((key) => (
          <Button key={key} variant="outlined" sx={{ flex: 1, borderRadius: '15px' }}>
            {t(`plan_event.${key}`)}
          </Button>
        ))}
      </Box>

      <Button fullWidth variant="contained" sx={{ backgroundColor: "#b97681", borderRadius: '15px', py: 1.5 }}>
        {t("plan_event.confirm")}
      </Button>
    </Box>
  );
}