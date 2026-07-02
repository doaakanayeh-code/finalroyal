import React, { useContext, useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Modal } from '@mui/material';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { ThemeContext } from "../Context/ThemeContext";
import { LanguageContext } from "../Context/LanguageContext";
import { useTranslation } from "react-i18next";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import eventGifD from '../assets/PlanEventD.gif';
import eventGif from '../assets/PlanEvent.gif';

// إصلاح أيقونة الدبوس
let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

export default function PlanEvent() {
  const { mode } = useContext(ThemeContext);
  const { dir } = useContext(LanguageContext);
  const { t } = useTranslation();
  const [isMapOpen, setIsMapOpen] = useState(false);
    const isDark = mode === 'dark';
  const [formData, setFormData] = useState({
    name: '', budget: '', event_date: '', start_time: '', end_time: '',
    address_name: 'موقع محدد', latitude: '', longitude: '', city_id: 1, type: 'event'
  });
const navigate = useNavigate();
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

const handleSubmit = async () => {
    // 1. تحويل الوقت للتأكد من تنسيق H:i (ساعات:دقائق)
    // نستخدم دالة بسيطة للتأكد من التنسيق إذا كان المتصفح يرسل ثواني
    const formatTime = (time) => {
        if (!time) return '';
        // إذا كان التنسيق "HH:MM:SS" نحوله لـ "HH:MM"
        return time.substring(0, 5);
    };

    const dataToSend = {
        ...formData,
        start_time: formatTime(formData.start_time),
        end_time: formatTime(formData.end_time),
    };

    try {
      // استخدم الرابط الكامل للـ API للتأكد من عدم وجود تضارب
      const res = await axios.post('http://127.0.0.1:8000/api/events', dataToSend);
      alert("تم إنشاء الفعالية بنجاح");
    } catch (err) {
      if (err.response && err.response.status === 422) {
          console.error("أخطاء التحقق:", err.response.data.errors);
          alert("خطأ في البيانات: يرجى التأكد من أن وقت الانتهاء بعد وقت البدء وأن التنسيق صحيح.");
      } else {
          alert("خطأ: " + (err.response?.data.message || "تأكد من الاتصال بالسيرفر"));
      }
    }
  };
  return (
    <Box dir={dir} sx={{ maxWidth: 450, mx: 'auto', p: 3, borderRadius: '30px', bgcolor: mode === 'dark' ? '#1e1e1e' : '#fdf5f5' }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>{t("plan_event.title")}</Typography>
         <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <img src={mode === 'dark' ? eventGifD : eventGif} alt="animation" style={{ width: '200px' }} />
      </Box>

      <Box sx={{ backgroundColor: "#b97681", color: '#fff', py: 2, mb: 3, borderRadius: '20px', textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{t("plan_event.title")}</Typography>
      </Box>

      <TextField fullWidth name="name" label={t("plan_event.name")} onChange={handleChange} sx={{ mb: 2 }} />
      <TextField fullWidth name="budget" label={t("plan_event.budget")} onChange={handleChange} sx={{ mb: 2 }} />
      <TextField fullWidth name="event_date" type="date" onChange={handleChange} InputLabelProps={{ shrink: true }} sx={{ mb: 2 }} />
      
      <Grid container spacing={1} sx={{ mb: 2 }}>
        <Grid item xs={6}><TextField fullWidth name="start_time" type="time" onChange={handleChange} InputLabelProps={{ shrink: true }} /></Grid>
        <Grid item xs={6}><TextField fullWidth name="end_time" type="time" onChange={handleChange} InputLabelProps={{ shrink: true }} /></Grid>
      </Grid>

      <Button fullWidth variant="outlined" onClick={() => setIsMapOpen(true)} sx={{ mb: 3 }}>
        {formData.latitude ? "تم تحديد الموقع" : "اضغط لتحديد الموقع"}
      </Button>

      {isMapOpen && (
        <Modal open={true} onClose={() => setIsMapOpen(false)}>
           <Box sx={{ width: '90%', height: '70vh', bgcolor: 'white', mx: 'auto', mt: '10vh', p: 2 }}>
             <MapContainer center={[24.71, 46.67]} zoom={13} style={{ height: '85%' }}>
               <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
               <MapEvents onClick={(lat, lng) => {
                 setFormData({...formData, latitude: lat, longitude: lng});
                 setIsMapOpen(false);
               }} />
             </MapContainer>
           </Box>
        </Modal>
      )}
       <Typography variant="subtitle1" sx={{ color: isDark ? '#fff' : '#b97681', mb: 1 }}>{t("plan_event.payment")}</Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        {['cash', 'wallet', 'electronic'].map((key) => (
          <Button key={key} variant="outlined" sx={{ flex: 1, borderRadius: '15px' }}>
            {t(`plan_event.${key}`)}
          </Button>
        ))}
      </Box>


      <Button fullWidth variant="contained" onClick={handleSubmit} sx={{ bgcolor: "#b97681" }}>{t("plan_event.confirm")}
        navigate(`/services?event_id=${res.data.id}`);
      </Button>
    </Box>
    
  );
}
 
// مكون فرعي للتعامل مع نقرات الخريطة
function MapEvents({ onClick }) {
  const [pos, setPos] = useState(null);
  useMapEvents({ click: (e) => { setPos(e.latlng); onClick(e.latlng.lat, e.latlng.lng); } });
  return pos ? <Marker position={pos} /> : null;
}