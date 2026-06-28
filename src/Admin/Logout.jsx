import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import CustomModal from "../Allcomponent/CustomModal"; // تأكدي من صحة المسار للمودال الأبيض

export default function Logout({ title, isAr }) {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleActualLogout = () => {
    setModalOpen(false);
    
    // كود مسح التوكن الخاص بكِ هنا
    // localStorage.removeItem("token");
    
    console.log("تم تسجيل الخروج بنجاح");
    navigate("/login"); // التوجيه لصفحة اللوكن
  };

  return (
    <>
      {/* هاد الزر بياخد نفس ستايل الـ Link بالسايدبار تماماً */}
      <div 
        className="logout-sidebar-btn"
        onClick={() => setModalOpen(true)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          color: "#5C4033",
          fontSize: "1rem",
          fontWeight: 600,
          transition: "0.3s",
          width: "100%",
          borderRadius: "16px",
          padding: "12px 18px",
          cursor: "pointer",
        }}
      >
        <FontAwesomeIcon icon={faRightFromBracket} style={{ width: '20px' }} />
        {title}
      </div>

      {/* المودال الأبيض المستقل داخل الكومبوننت */}
      <CustomModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleActualLogout}
        title={isAr ? "تسجيل الخروج؟" : "Logout?"}
        descriptionPrefix={isAr ? "هل أنت متأكد أنك تريد" : "Are you sure you want to"}
        dynamicItem={isAr ? "تسجيل الخروج من الحساب" : "logout"}
        footerNote={isAr ? "ستحتاج لإدخال كلمة المرور مجدداً عند العودة." : "You will need to enter your password again to log back in."}
        confirmText={isAr ? "تأكيد" : "Delete"} // أو Confirm حسب رغبتك
        cancelText={isAr ? "إلغاء" : "Cancel"}
      />
    </>
  );
}