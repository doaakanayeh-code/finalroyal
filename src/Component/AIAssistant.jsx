import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Box, Fab, Dialog, DialogContent, Typography, IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import CloseIcon from '@mui/icons-material/Close';
import StopIcon from '@mui/icons-material/Stop';

export default function VoiceAssistant() {
  const [open, setOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [laravelStatus, setLaravelStatus] = useState('');
  const [aiReplyText, setAiReplyText] = useState('');
  const recognitionRef = useRef(null);

  // 1️⃣ استخدام useRef لحفظ الدالة لمنع انقطاع الربط داخل الـ useEffect
  const sendTextRef = useRef(null);

  // الدالة المسؤولة عن إرسال النص ونطق رد الـ AI
  const sendTextToLaravel = async (textToSend) => {
    const text = textToSend || transcript;
    if (!text || text.trim() === '') return;

    try {
      setLaravelStatus('⏳ جاري التحليل...');
      console.log("🚀 جاري إرسال طلب Axios إلى Laravel بالنص:", text);
      
      const response = await axios.post('http://localhost:8000/api/save-speech-text', {
        text: text
      });
      
      console.log("📥 استجابة السيرفر بنجاح:", response.data);
      const { reply_text } = response.data;
      
      // 💡 التعديل هنا: تفريغ النص ليختفي تماماً من أسفل الواجهة فور وصول الرد بنجاح
      setLaravelStatus(''); 
      setAiReplyText(reply_text);

      if (reply_text) {
        window.speechSynthesis.cancel(); // تنظيف المحرك الصوتي قبل نطق الرد الجديد
        const speech = new SpeechSynthesisUtterance(reply_text);
        
        const voices = window.speechSynthesis.getVoices();
        const arabicVoice = voices.find(voice => voice.lang.includes('ar') && 
            (voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('hoda') || voice.name.toLowerCase().includes('tara') || voice.name.toLowerCase().includes('zayd') === false)
        ) || voices.find(voice => voice.lang.includes('ar'));

        if (arabicVoice) {
          speech.voice = arabicVoice;
        }

        speech.lang = 'ar-SA';
        speech.rate = 1.15;  
        speech.pitch = 1.05; 

        window.speechSynthesis.speak(speech);
      }
    } catch (error) {
      console.error("❌ فشل طلب Axios والسبب الحقيقي هو:", error.response?.data || error.message);
      setLaravelStatus('❌ خطأ في السيرفر');
    }
  };

  // 2️⃣ نقوم بتحديث الـ Ref دائماً بأحدث نسخة من الدالة
  useEffect(() => {
    sendTextRef.current = sendTextToLaravel;
  });

  // إعداد محرك التعرف على الصوت عند تحميل المكون
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition && !recognitionRef.current) {
      const rec = new SpeechRecognition();
      rec.lang = 'ar-SA';
      rec.continuous = false; 
      rec.interimResults = false;

      rec.onstart = () => {
        setIsRecording(true);
        setLaravelStatus('');
      };

      rec.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        
        console.log("🗣️ الجملة المسموعة من المستخدم:", text);
        
        // 3️⃣ استدعاء الدالة عن طريق الـ Ref الثابت لضمان عدم حظرها أو فقدانها
        if (sendTextRef.current) {
          sendTextRef.current(text);
        }
      };

      rec.onerror = (e) => {
        console.error("🚨 خطأ داخلي في محرك مايك المتصفح الحقيقي:", e.error);
        setIsRecording(false);
        setLaravelStatus(`❌ خطأ مايك: ${e.error}`);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  // دالة تشغيل وإيقاف المايكروفون
  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("التعرف على الصوت غير مدعوم أو لم يتم تهيئته بعد.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      setTranscript('');
      setAiReplyText('');
      setLaravelStatus('');
      window.speechSynthesis.cancel(); 
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.log("محاولة إعادة تشغيل المايك...");
        recognitionRef.current.stop();
        setTimeout(() => {
          try { recognitionRef.current.start(); } catch(e) { console.error(e); }
        }, 300);
      }
    }
  };

  // عند إغلاق النافذة يدوياً نقوم بتنظيف الصوت وإيقاف التسجيل
  const handleClose = () => {
    setOpen(false);
    setIsRecording(false);
    window.speechSynthesis.cancel();
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  return (
    <>
      {/* 1. الزر العائم في زاوية الشاشة */}
      <Fab
        color="primary"
        aria-label="voice-assistant"
        onClick={() => setOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 2000,
          boxShadow: '0px 4px 20px rgba(185, 118, 129, 0.4)',
          background: 'linear-gradient(45deg, #b97681, #b97681)',
          '&:hover': {
            background: 'linear-gradient(45deg, #a3626d, #a3626d)',
          }
        }}
      >
        <MicIcon sx={{ color: '#fff' }} />
      </Fab>

      {/* 2. النافذة المنبثقة (Modal) */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: '24px',
            padding: '24px',
            width: '100%',
            maxWidth: '420px',
            textAlign: 'center',
            position: 'relative',
            boxShadow: '0px 10px 40px rgba(0,0,0,0.15)',
            direction: 'rtl' 
          }
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', left: 12, top: 12, color: 'text.secondary' }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 2, pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#b97681' }}>
            🎙️ المساعد الصوتي الذكي لـ Royal Moment
          </Typography>
          
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
            {isRecording ? "جاري الاستماع إليكِ... تحدثي الآن" : "اضغطي على المايكروفون وابدئي بالتحدث مباشرة"}
          </Typography>

          <IconButton
            onClick={toggleRecording}
            sx={{
              width: 90,
              height: 90,
              borderRadius: '50%',
              bgcolor: isRecording ? 'rgba(239, 68, 68, 0.15)' : 'rgba(185, 118, 129, 0.1)',
              color: isRecording ? '#ef4444' : '#b97681',
              transition: '0.3s all ease',
              border: isRecording ? '2px solid #ef4444' : 'none',
              animation: isRecording ? 'pulse 1.5s infinite ease-in-out' : 'none',
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(239, 68, 68, 0.4)' },
                '70%': { transform: 'scale(1.05)', boxShadow: '0 0 0 15px rgba(239, 68, 68, 0)' },
                '100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(239, 68, 68, 0)' },
              },
              '&:hover': { 
                bgcolor: isRecording ? 'rgba(239, 68, 68, 0.25)' : 'rgba(185, 118, 129, 0.2)' 
              },
            }}
          >
            {isRecording ? <StopIcon sx={{ fontSize: 45 }} /> : <MicIcon sx={{ fontSize: 45 }} />}
          </IconButton>

        
          
          {/* تظهر فقط في حالة الـ Loading أو عند وجود خطأ لمنع التشويه البصري للواجهة */}
          {laravelStatus && (
            <Typography variant="caption" sx={{ color: 'text.disabled', marginTop: '20px' }}>
              {laravelStatus}
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}