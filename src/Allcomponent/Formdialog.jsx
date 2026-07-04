import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// ============================================================
// ثوابت وستايل مشترك لكل المودالات بالتطبيق
// ============================================================
export const THEME = {
  primary: "#b97681",
  primaryDark: "#8f5560",
  primaryDarker: "#7a4750",
  gradient: "linear-gradient(135deg, #b97681, #8f5560)",
  gradientHover: "linear-gradient(135deg, #a5636e, #7a4750)",
};

export const fieldSx = {
  backgroundColor: "#fff",
  borderRadius: "12px",
  "& .MuiOutlinedInput-root": { borderRadius: "12px" },
};

// بتقرأ رسالة الخطأ من رد axios بشكل موحّد (أول رسالة validation، أو الرسالة العامة)
export function extractErrorMessage(err, fallback) {
  const res = err.response?.data;
  if (res?.errors) {
    const firstError = Object.values(res.errors)[0];
    return Array.isArray(firstError) ? firstError[0] : (res.message || fallback);
  }
  return res?.message || fallback;
}

/**
 * FormDialog - مودال عام لأي فورم تعديل/إضافة بالتطبيق.
 *
 * props:
 * - open, onClose: التحكم بالفتح/الإغلاق
 * - icon, title: هيدر المودال
 * - fields: مصفوفة تصف الحقول تلقائياً، كل عنصر:
 *     { type: 'text' | 'number' | 'select', name, label, value, onChange(value),
 *       helperText?, placeholder?, options? (للـ select: [{value, label}]) }
 * - error, success: رسائل تظهر فوق الفورم
 * - isSaving, onSave, saveLabel: زر الحفظ
 * - children: أي محتوى إضافي مخصص (مثلاً رفع صور) بينضاف بعد الحقول تلقائياً
 */
export default function FormDialog({
  open,
  onClose,
  icon,
  title,
  fields = [],
  error,
  success,
  isSaving,
  onSave,
  saveLabel = "حفظ التعديلات",
  children,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { borderRadius: "24px", overflow: "hidden" } }}
    >
      {/* هيدر بتدرج لوني */}
      <Box
        sx={{
          background: THEME.gradient,
          px: 3, py: 3,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {icon}
          <Typography sx={{ color: "#fff", fontWeight: "800", fontSize: "20px" }}>
            {title}
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: "#fff" }} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2.5, p: 3, backgroundColor: "#fafafa" }}>
        {error && <Alert severity="error" sx={{ borderRadius: "12px" }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ borderRadius: "12px" }}>{success}</Alert>}

        {fields.map((field) => (
          <TextField
            key={field.name || field.label}
            select={field.type === "select"}
            type={field.type === "number" ? "number" : "text"}
            label={field.label}
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            helperText={field.helperText}
            placeholder={field.placeholder}
            fullWidth
            sx={fieldSx}
          >
            {field.type === "select" &&
              (field.options || []).map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
          </TextField>
        ))}

        {children}
      </DialogContent>

      <DialogActions sx={{ p: 3, backgroundColor: "#fafafa", gap: 1 }}>
        <Button
          onClick={onClose}
          disabled={isSaving}
          sx={{ borderRadius: "12px", px: 3, py: 1.2, color: "#8a7a7a", fontWeight: "600" }}
        >
          إلغاء
        </Button>
        <Button
          variant="contained"
          onClick={onSave}
          disabled={isSaving}
          sx={{
            borderRadius: "12px", px: 4, py: 1.2, fontWeight: "700",
            background: THEME.gradient,
            boxShadow: "0 6px 16px rgba(185,118,129,0.4)",
            "&:hover": { background: THEME.gradientHover },
          }}
        >
          {isSaving ? "جاري الحفظ..." : saveLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}