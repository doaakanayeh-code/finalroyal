import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { 
  Box, Fab, Dialog, DialogContent, Typography, IconButton, 
  TextField, InputAdornment, Paper 
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

export default function AIChatAssistant() {
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [laravelStatus, setLaravelStatus] = useState('');
  
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'ai', 
      text: 'أهلاً بك في Royal Moment! يمكنك أن تسألني عن الصالات المتاحة، أسعار الحجز، أو الخدمات المتاحة لتنظيم مناسبتك.' 
    }
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = inputText.trim();
    setInputText(''); 

    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userMessage }]);
    setLaravelStatus('⏳ جاري التحليل...');

    try {
      const response = await axios.post('http://localhost:8000/api/save-speech-text', {
        text: userMessage
      });

      const { reply_text } = response.data;
      setLaravelStatus('');

      if (reply_text) {
        setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: reply_text }]);
      }
    } catch (error) {
      console.error(error);
      setLaravelStatus('❌ خطأ في السيرفر');
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: 'عذراً، حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة مرة أخرى لاحقاً.' 
      }]);
    }
  };

  return (
    <>
      {/* 1. الزر العائم للشات (تم رفعه ليكون فوق الفويس مباشرة) */}
      <Fab
        color="primary"
        aria-label="chat-assistant"
        onClick={() => setOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 96, // 💡 تم رفعه إلى 96 ليصبح فوق زر الفويس (الذي يأخذ 24)
          right: 24,  // في نفس الجهة اليمنى
          zIndex: 2000,
          boxShadow: '0px 4px 20px rgba(185, 118, 129, 0.4)',
          background: 'linear-gradient(45deg, #b97681, #b97681)',
          '&:hover': {
            background: 'linear-gradient(45deg, #a3626d, #a3626d)',
          }
        }}
      >
        <ChatIcon sx={{ color: '#fff' }} />
      </Fab>

      {/* 2. نافذة الشات المنبثقة (Modal) */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: '24px',
            width: '100%',
            maxWidth: '450px',
            height: '80vh', 
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0px 10px 40px rgba(0,0,0,0.15)',
            direction: 'rtl'
          }
        }}
      >
        {/* شريط رأس الشات (Header) */}
        <Box sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: '#fff5f7'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#b97681', fontSize: '1.1rem' }}>
            💬 مساعد رويال مومنت الذكي
          </Typography>
          <IconButton onClick={() => setOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* جسم الشات وعرض الرسائل */}
        <DialogContent sx={{ 
          flex: 1, 
          overflowY: 'auto', 
          p: 2, 
          bgcolor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5
        }}>
          {messages.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                alignSelf: msg.sender === 'user' ? 'flex-start' : 'flex-end',
                maxWidth: '80%',
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 1.5,
                  borderRadius: msg.sender === 'user' ? '18px 18px 0px 18px' : '18px 18px 18px 0px',
                  bgcolor: msg.sender === 'user' ? '#b97681' : '#fff',
                  color: msg.sender === 'user' ? '#fff' : 'text.primary',
                  border: msg.sender === 'user' ? 'none' : '1px solid',
                  borderColor: 'divider',
                  boxShadow: msg.sender === 'user' ? 'none' : '0px 2px 5px rgba(0,0,0,0.02)'
                }}
              >
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line', lineHeight: 1.5 }}>
                  {msg.text}
                </Typography>
              </Paper>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </DialogContent>

        {laravelStatus && (
          <Typography variant="caption" sx={{ color: 'text.disabled', px: 2, py: 0.5, bgcolor: 'background.default' }}>
            {laravelStatus}
          </Typography>
        )}

        {/* صندوق إدخال النص وإرساله */}
        <Box 
          component="form" 
          onSubmit={handleSendMessage}
          sx={{ 
            p: 2, 
            borderTop: '1px solid', 
            borderColor: 'divider',
            bgcolor: 'background.paper' 
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="اكتب رسالتك هنا..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            size="small"
            autoComplete="off"
            InputProps={{
              sx: { borderRadius: '12px' },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    color="primary" 
                    type="submit"
                    disabled={!inputText.trim()}
                    sx={{ color: '#b97681' }}
                  >
                    <SendIcon sx={{ transform: 'scaleX(-1)' }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Dialog>
    </>
  );
}