import React, { useState } from 'react';
import { Box, Checkbox, Typography, Button } from '@mui/material';

// استيراد المكونات الجاهزة والمميزة تبعك
import AuthLayout from '../Allcomponent/AuthLayout'; 
import CraftCard from '../Allcomponent/CraftCard';

const ConfirmBooking = ({ isOpen, onClose, bookingDetails }) => {
  const [paymentData, setPaymentData] = useState({
    cardName: bookingDetails?.clientName || '', // تعبئة تلقائية باسم العميل الحقيقي
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [useWallet, setUseWallet] = useState(false); // التحكم بالدفع عبر المحفظة ديناميكياً

  if (!isOpen) return null;

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (useWallet) {
      console.log("Processing payment via Royal Wallet for amount:", bookingDetails?.total);
      alert("تمت عملية الخصم من المحفظة وحجز الصالة بنجاح! 🎉");
    } else {
      console.log("Processing card payment for:", paymentData);
      alert("تمت عملية الدفع بالبطاقة البنكية بنجاح! 💳");
    }
    onClose();
  };

  // رابط الباركود الديناميكي الفخم بناءً على معلومات الحجز الحالية
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=Service:${encodeURIComponent(bookingDetails?.service || 'صالة البهية')}-Total:${bookingDetails?.total || '5000'}-User:${encodeURIComponent(bookingDetails?.clientName || 'John Doe')}&color=4A1525&bgcolor=FFF8F6`;

  const styles = {
    ticketSection: {
      border: '2px solid #E8D0CB',
      borderRadius: '24px',
      padding: '16px',
      backgroundColor: '#FFF8F6',
      backgroundImage: 'linear-gradient(to bottom, #FFF 60%, #FFF8F6 100%)',
      boxShadow: '0 8px 16px rgba(74, 21, 37, 0.04)',
      marginBottom: '20px',
      textAlign: 'initial'
    },
    qrContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '15px 0',
      borderTop: '2px dashed #E8D0CB',
      marginTop: '15px',
    },
    walletToggle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#FCEEEB',
      padding: '12px 16px',
      borderRadius: '16px',
      marginBottom: '20px',
      border: '1px solid #E8D0CB',
      cursor: 'pointer'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      textAlign: 'left'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    inputLabel: {
      fontSize: '13px',
      fontWeight: '600',
      color: '#4A1525',
      marginBottom: '6px',
    },
    input: {
      width: '100%',
      padding: '11px 14px',
      border: '1px solid #E8D0CB',
      borderRadius: '10px',
      fontSize: '14px',
      outline: 'none',
      boxSizing: 'border-box',
      backgroundColor: '#FFF'
    }
  };

  return (
    /* 1. الحاوية الكبرى الشفافة المدعومة من نظام MUI لضمان التوسيط الشامل رغماً عن الهيدر */
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',       // توسيط عمودي صارم
        justifyContent: 'center',    // توسيط أفقي صارم
        zIndex: 99999,              // يتفوق على أي Navbar أو عنصر برأس الصفحة
      }}
    >
      {/* 2. جسم المودال الأبيض الذي يحتوي كرت التذكرة والـ AuthLayout */}
      <Box
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: '35px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: '30px 24px 24px 24px',
          width: '92%',
          maxWidth: '460px',
          position: 'relative',
          boxSizing: 'border-box',
          maxHeight: '85vh',        // حماية الأبعاد عمودياً
          overflowY: 'auto',        // تفعيل التمرير الداخلي

          /* ✨ إخفاء شريط السكرول تماماً مع بقاء التمرير شغالاً ✨ */
          msOverflowStyle: 'none',  // لمتصفحات IE و Edge القديمة
          scrollbarWidth: 'none',   // لمتصفح Firefox
          '&::-webkit-scrollbar': {
            display: 'none',        // لمتصفحات Chrome و Safari و Edge الحديثة
          },
        }}
      >
        
        {/* زر الإغلاق الدائري اللطيف المعزز بـ زوايا التموضع الثابتة */}
        <button 
          onClick={onClose} 
          style={{
            position: 'absolute',
            top: '16px',
            right: '20px',
            background: '#E8D0CB',
            border: 'none',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            fontSize: '14px',
            color: '#4A1525',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            zIndex: 10
          }}
        >
          ✕
        </button>

        {/* 👑 تضمين الـ AuthLayout وتمرير الخصائص المناسبة لنظام الـ Dnd */}
        <AuthLayout
          title="Royal Moment - My Budget"
          description="يرجى مراجعة تفاصيل حجزك الملكي والمتابعة لإتمام عملية الدفع الآمنة."
          footerText="هل تحتاج للمساعدة؟"
          footerLinkText="اتصل بالدعم الفني"
          onFooterLinkClick={() => alert('سيتم توجيهك للدعم الفني...')}
        >
          
          {/* الكرت والتذكرة يمرران كـ children داخل الـ AuthLayout */}
          <div style={styles.ticketSection}>
            <CraftCard 
              title={bookingDetails?.service || 'صالة لازورد'} 
              desc={`التاريخ: ${bookingDetails?.date || '27 May 2026 @ 19:30'}`}
              icon="🏰" 
              onClick={() => {}}
            />
            
            {/* تفاصيل إضافية مخصصة للحجز المالي */}
            <Box style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="caption" sx={{ display: 'block', opacity: 0.7, color: '#4A1525' }}>Cardholder Name</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#4A1525' }}>{bookingDetails?.clientName || 'John Doe'}</Typography>
              </Box>
              <Box style={{ textAlign: 'right' }}>
                <Typography variant="caption" sx={{ display: 'block', opacity: 0.7, color: '#4A1525' }}>Total Amount</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4A1525' }}>{bookingDetails?.total || '$5000'}</Typography>
              </Box>
            </Box>

            {/* باركود التذكرة الحقيقي التفاعلي المعلق بالـ API */}
            <div style={styles.qrContainer}>
              <Typography variant="caption" sx={{ fontSize: '10px', color: '#6B5259', mb: '6px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
                ORDER CONFIRMATION CODE: RM-CONF-4321
              </Typography>
              <img 
                src={qrCodeUrl}
                alt="Booking QR Code"
                style={{ borderRadius: '12px', border: '4px solid #FFF', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}
              />
              <Typography variant="caption" sx={{ color: '#A1887F', mt: '6px' }}>Show at Venue</Typography>
            </div>
          </div>

          {/* تفعيل اختيار دفع المحفظة الذكي (Wallet Toggle) */}
          <div style={styles.walletToggle} onClick={() => setUseWallet(!useWallet)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>👛</span>
              <div style={{ textAlign: 'left' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#4A1525', lineHeight: 1.2 }}>Pay via Royal Wallet</Typography>
                <Typography variant="caption" sx={{ color: '#6B5259' }}>Available Balance: $7,250</Typography>
              </div>
            </div>
            <Checkbox 
              checked={useWallet} 
              onChange={() => {}} 
              sx={{ color: '#4A1525', '&.Mui-checked': { color: '#4A1525' } }}
            />
          </div>

          {/* فورم إدخال بيانات الفيزا أو الماستر كارد */}
          <form onSubmit={handleSubmit} style={styles.form}>
            {!useWallet ? (
              <>
                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Card Number</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="text" 
                      name="cardNumber"
                      required
                      maxLength="19"
                      value={paymentData.cardNumber}
                      onChange={handleChange}
                      placeholder="4321 **** **** ****" 
                      style={styles.input}
                    />
                    <span style={{ position: 'absolute', right: '12px', top: '11px' }}>💳</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ ...styles.inputGroup, flex: 1 }}>
                    <label style={styles.inputLabel}>Expiry</label>
                    <input 
                      type="text" 
                      name="expiry"
                      required
                      placeholder="MM/YY" 
                      maxLength="5"
                      value={paymentData.expiry}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>
                  <div style={{ ...styles.inputGroup, flex: 1 }}>
                    <label style={styles.inputLabel}>CVV</label>
                    <input 
                      type="password" 
                      name="cvv"
                      required
                      maxLength="3"
                      placeholder="***" 
                      value={paymentData.cvv}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>
                </div>
              </>
            ) : (
              <Typography variant="body2" sx={{ textAlign: 'center', padding: '10px 0', color: '#2d4d42', fontWeight: 'bold' }}>
                ✨ Secure verification via Royal Wallet active. No card required.
              </Typography>
            )}

            {/* استخدام مكوّن زر من MUI لتوحيد التصميم والظلال */}
            <Button 
              type="submit" 
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: '#4A1525',
                color: '#ffffff',
                fontWeight: 'bold',
                padding: '12px',
                borderRadius: '25px',
                fontSize: '16px',
                marginTop: '15px',
                textTransform: 'none',
                boxShadow: '0 6px 20px rgba(74, 21, 37, 0.25)',
                '&:hover': {
                  backgroundColor: '#350e19',
                }
              }}
            >
              {useWallet ? 'Confirm via Wallet 👛' : 'Proceed with Payment 🔒'}
            </Button>
          </form>

        </AuthLayout>

      </Box>
    </Box>
  );
};

export default ConfirmBooking;