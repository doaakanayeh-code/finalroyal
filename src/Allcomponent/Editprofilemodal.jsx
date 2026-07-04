import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import IdImageUploader from "./IdImageUploader";
import axiosClient from "../Api/axiosClient"; // عدّلي المسار إذا مختلف عندك
import Formdialog, { extractErrorMessage } from "./Formdialog";
// ============================================================
// مودال تعديل البروفايل - بيستدعي فعلياً updateProfile()
// ============================================================
export default function EditProfileModal({ open, currentUser, onClose, onUpdated }) {
  const [username, setUsername] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [frontPreview, setFrontPreview] = useState(null);
  const [backPreview, setBackPreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // تعبئة الفورم بالبيانات الحالية كل مرة يفتح فيها المودال
  useEffect(() => {
    if (open && currentUser) {
      setUsername(currentUser.username || '');
      setIdentifier(''); // فاضي عمداً - المستخدم يعبّيها بس لو بدها تتغيّر
      setFrontFile(null);
      setBackFile(null);
      setFrontPreview(null);
      setBackPreview(null);
      setError(null);
      setSuccess(null);
    }
  }, [open, currentUser]);

  const handleSave = async () => {
    setError(null);
    setSuccess(null);
    setIsSaving(true);
    try {
      const fd = new FormData();
      fd.append('_method', 'PUT'); // Laravel method spoofing لأنه بنستخدم POST مع ملفات

      // كل الحقول "sometimes" بالباك اند - يعني نرسل بس اللي المستخدم غيّره فعلاً
      if (username && username !== currentUser?.username) {
        fd.append('username', username);
      }
      if (identifier) {
        fd.append('identifier', identifier);
      }
      if (frontFile) fd.append('id_img_front', frontFile);
      if (backFile) fd.append('id_img_back', backFile);

      // ⚠️ عدّلي المسار حسب الراوت الحقيقي المربوط بـ updateProfile()
      const { data } = await axiosClient.post('/api/profile', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccess(data.message || 'تم التحديث بنجاح.');
      if (onUpdated) onUpdated(data.data?.user);
    } catch (err) {
      setError(extractErrorMessage(err, 'حصل خطأ أثناء التحديث.'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <FormDialog
      open={open}
      onClose={onClose}
      icon={<PersonIcon sx={{ color: "#fff", fontSize: 28 }} />}
      title="تعديل البروفايل"
      error={error}
      success={success}
      isSaving={isSaving}
      onSave={handleSave}
      fields={[
        {
          name: 'username',
          type: 'text',
          label: 'الاسم',
          value: username,
          onChange: setUsername,
          helperText: 'أحرف فقط (عربي/إنجليزي)، بدون أرقام أو رموز',
        },
        {
          name: 'identifier',
          type: 'text',
          label: 'إيميل جديد أو رقم هاتف جديد',
          value: identifier,
          onChange: setIdentifier,
          placeholder: 'example@gmail.com أو 09xxxxxxxx',
          helperText: 'اتركيه فاضي إذا مو بدك تغيّري الإيميل/الهاتف',
        },
      ]}
    >
      {/* صورتي الهوية جنب بعض بكرت موحّد - محتوى مخصص إضافي بعد الحقول */}
      <Box sx={{ backgroundColor: "#fff", borderRadius: "16px", border: "1px solid #f1dede", p: 2.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <BadgeIcon sx={{ color: "#b97681", fontSize: 20 }} />
          <Typography sx={{ fontWeight: "700", fontSize: "15px", color: "#2d1f1f" }}>
            صور الهوية
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <IdImageUploader
            label="الوجه الأمامي"
            previewUrl={frontPreview || (currentUser?.id_img_front ? `/storage/${currentUser.id_img_front}` : null)}
            onSelect={(file) => {
              setFrontFile(file);
              setFrontPreview(file ? URL.createObjectURL(file) : null);
            }}
          />
          <IdImageUploader
            label="الوجه الخلفي"
            previewUrl={backPreview || (currentUser?.id_img_back ? `/storage/${currentUser.id_img_back}` : null)}
            onSelect={(file) => {
              setBackFile(file);
              setBackPreview(file ? URL.createObjectURL(file) : null);
            }}
          />
        </Box>
      </Box>
    </FormDialog>
  );
}