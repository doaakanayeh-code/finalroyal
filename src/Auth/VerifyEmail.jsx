import React, { useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast"; // 🌟 استيراد التوستر المشترك بالمشروع

export default function VerifyEmail() {
  const { id, hash } = useParams(); 
  const [searchParams] = useSearchParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    const signature = searchParams.get("signature");
    const expires = searchParams.get("expires");

    const apiUrl = `http://localhost:8000/api/verify-email/${id}/${hash}?expires=${expires}&signature=${signature}`;

    // 🌟 إطلاق إشعار تحميل خفيف (Loading) في الزاوية لحين رد السيرفر
    const loadingToast = toast.loading("جاري تفعيل حسابك والتحقق من الرابط...");

    axios
      .get(apiUrl, {
        withCredentials: true,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      })
      .then((res) => {
        if (res.status === 200) {
          toast.dismiss(loadingToast); // إغلاق إشعار التحميل
          
          // 🌟 إشعار نجاح منبثق فوري فوق الصفحة الرئيسية
          toast.success(res.data.message || "تم تفعيل حسابك بنجاح! أهلاً بك في منصتنا.");
          
          navigate("/"); // توجيه فوري وسلس للرئيسية
        }
      })
      .catch((err) => {
        toast.dismiss(loadingToast); // إغلاق إشعار التحميل
        
        // 🌟 التعامل مع خطأ الرابط المنتهي الصلاحية أو غير الصالح
        if (err.response && err.response.status === 403) {
          toast.error(err.response.data.message || "رابط التفعيل غير صالح أو انتهت صلاحيته.");
        } else if (err.response && err.response.status === 422) {
          toast.error("بيانات التحقق غير مكتملة أو مشوهة.");
        } else {
          toast.error("حدث خطأ أثناء تفعيل الحساب، يرجى إعادة المحاولة لاحقاً.");
        }
        
        navigate("/"); // إعادته للرئيسية لحماية تجربة المستخدم
      });
  }, [id, hash, searchParams, navigate]);

  // 🌟 لا داعي لعرض أي واجهة رسومية (JSX)؛ المكون يعمل صامتاً بالخلفية وينبثق منه الإشعار
  return null;
}