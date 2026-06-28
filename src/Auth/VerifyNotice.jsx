import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

export default function VerifyNotice() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const cookie = new Cookies();

  const resendEmail = async () => {
    setLoading(true);
    setMessage("");
    try {
      const token = cookie.get("Bearer");
      
      await axios.post("http://127.0.0.1:8000/api/email/verification-notification", {}, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      setMessage("تم إعادة إرسال رابط التحقق إلى بريدك الإلكتروني.");
    } catch (error) {
      setMessage("فشلت عملية إعادة الإرسال، يرجى المحاولة بعد قليل.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>يرجى تفعيل حسابك</h2>
      <p>تفقد بريدك الإلكتروني واضغط على رابط التفعيل المنسق لحسابك.</p>
      <button onClick={resendEmail} disabled={loading}>
        {loading ? "جاري الإرسال..." : "إعادة إرسال إيميل التفعيل"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}