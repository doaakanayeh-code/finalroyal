import React from 'react';
import GenericTable from '../Allcomponent/GenericTable';
import { Chip, Button, Box } from '@mui/material';

export default function Comment() {
  // 1. أعمدة جدول التعليقات
  const commentColumns = [
    { id: "doctor", label: "صاحب التعليق", minWidth: 180, align: "right" },
    { id: "eventName", label: "الفعالية / الخدمة", minWidth: 180, align: "center" },
    { id: "commentText", label: "نص التعليق والتقييم", minWidth: 300, align: "right" },
    { id: "status", label: "الحالة", minWidth: 130, align: "center" },
    { id: "moderation", label: "مراجعة", minWidth: 180, align: "center" }
  ];

  // 2. بيانات التعليقات (مع حالات مخصصة للثيم الجديد)
  const commentRows = [
    { doctor: "رنا خالد", eventName: "قاعة رويال زون", commentText: "المكان رائع جداً والتنظيم كان احترافي للغاية، شكراً لكم!", status: "Confirmed" },
    { doctor: "محمد الأحمد", eventName: "باقة تصوير المومنت", commentText: "تأخر المصور بنصف ساعة عن الموعد المحدد..", status: "Pending" },
  ];

  // 3. إضافة أزرار مراجعة التعليقات (موافقة / إخفاء)
  const renderCommentActions = (columnId, row) => {
    if (columnId === "moderation") {
      return (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
          {row.status === "Pending" && (
            <Button variant="contained" size="small" color="success">موافقة</Button>
          )}
          <Button variant="outlined" size="small" color="error">حذف</Button>
        </Box>
      );
    }
    return null;
  };

  return (
    <GenericTable 
      title="التحكم بالتعليقات والمراجعات" 
      columns={commentColumns} 
      rows={commentRows} 
      renderCustomCell={renderCommentActions}
      // قمنا بتمرير مسميات حالات مخصصة للتعليقات ليتغير لون الـ Chip تلقائياً
      statusColors={{
        Confirmed: "success",
        Pending: "warning"
      }}
    />
  );
}