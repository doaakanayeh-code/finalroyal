import { useState } from "react";
import Popup from "reactjs-popup";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// استيراد مكونات Material-UI المُنصبة لديك
import { Checkbox, Button, TextField, CircularProgress } from "@mui/material";

const SendNotification = ({ isOpen, setIsOpen }) => {
    const { register, handleSubmit, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    
    // إدارة حالة الفئة المستهدفة محلياً (تسمح باختيار فئة واحدة فقط)
    const [target, setTarget] = useState(""); // القيمة المتاحة: 'users' أو 'admins' ou 'offices'

    // دالة لتغيير الفئة المستهدفة عند الضغط على الـ Checkbox
    const handleTargetChange = (category, checked) => {
        if (checked) {
            setTarget(category); // تحديد الفئة الحالية وتصفير البقية تلقائياً
        } else {
            setTarget(""); // إلغاء الاختيار إذا تم الضغط عليه مجدداً
        }
    };

    // دالة إرسال البيانات للباك إند عند عمل Submit
    const onSubmit = async (data) => {
        if (!target) {
            toast.error("يجب اختيار الجهة المستهدفة");
            return;
        }

        setIsLoading(true);

        // تحويل اسم الفئة للنص المطلوب إرساله للسيرفر
        const targetTranslation = {
            users: "مستخدمين",
            admins: "مشرفين",
            offices: "وسطاء"
        };

        try {
            // قم بتغيير المسار '/api/notifications' حسب مسار الـ Route عندك في Laravel
            const response = await axios.post("/api/notifications", {
                title: data.title,
                body: data.body,
                target: targetTranslation[target],
            });

            // إذا نجحت العملية (Laravel يعيد عادة حالة 200 أو 201)
            toast.success(response.data.message || "تم إرسال الإشعار بنجاح");
            
            // تصفير الحقول وإغلاق النافذة
            reset();
            setTarget("");
            setIsOpen(false);
            
        } catch (error) {
            console.error("Error sending notification:", error);
            // إظهار رسالة الخطأ القادمة من الباك إند أو رسالة افتراضية
            const errorMessage = error.response?.data?.message || "حدث خطأ أثناء إرسال الإشعار";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* مكون التوستر لإظهار رسائل النجاح والفشل */}
            <Toaster position="top-center" reverseOrder={false} />

            <Popup
                open={isOpen}
                onClose={() => setIsOpen(false)}
                modal
                nested
                closeOnDocumentClick
                contentStyle={{
                    width: "550px",
                    height: "auto",
                    borderRadius: "25px", // تم تعديلها لتصميم متناسق ومريح للعين
                    backgroundColor: "#ffffff",
                    color: "#333333",
                    padding: "30px",
                    direction: "rtl", // ليدعم اللغة العربية بشكل صحيح في المحاذاة
                }}
            >
                {(close) => (
                    isLoading ? (
                        <div className="flex flex-col justify-center items-center h-[200px] gap-4">
                            <CircularProgress sx={{ color: "#3b82f6" }} />
                            <span style={{ fontFamily: "Cairo", fontWeight: 600 }}>جاري إرسال الإشعار...</span>
                        </div>
                    ) : (
                        <div 
                            className="flex flex-col items-center gap-5"
                            style={{ fontFamily: "Cairo", fontWeight: 700 }}
                        >
                            {/* الرأس / العنوان */}
                            <div className="w-full text-center border-b pb-3">
                                <h2 className="text-xl font-bold text-gray-800">إرسال إشعار جديد</h2>
                            </div>

                            {/* حقول الإدخال */}
                            <div className="flex flex-col w-full gap-4">
                                <TextField
                                    label="عنوان الإشعار"
                                    variant="outlined"
                                    fullWidth
                                    {...register("title", { required: true })}
                                    InputLabelProps={{ style: { fontFamily: "Cairo" } }}
                                    inputProps={{ style: { fontFamily: "Cairo" } }}
                                />

                                <TextField
                                    label="نص / وصف الإشعار"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    {...register("body", { required: true })}
                                    InputLabelProps={{ style: { fontFamily: "Cairo" } }}
                                    inputProps={{ style: { fontFamily: "Cairo" } }}
                                />
                            </div>

                            {/* اختيار المستهدفين */}
                            <div className="w-full flex flex-col items-start gap-1 mt-2">
                                <span className="text-gray-600 mb-2 block text-sm">الجهة المستهدفة:</span>
                                
                                {/* خيار المستخدمين */}
                                <div className="w-full flex flex-row items-center gap-2 px-2 py-1 hover:bg-gray-50 rounded">
                                    <Checkbox
                                        checked={target === "users"}
                                        onChange={(e) => handleTargetChange("users", e.target.checked)}
                                        sx={{ '&.Mui-checked': { color: '#3b82f6' } }}
                                    />
                                    <span className="font-medium text-gray-700 text-base">المستخدمين</span>
                                </div>

                                {/* خيار المشرفين */}
                                <div className="w-full flex flex-row items-center gap-2 px-2 py-1 hover:bg-gray-50 rounded">
                                    <Checkbox
                                        checked={target === "admins"}
                                        onChange={(e) => handleTargetChange("admins", e.target.checked)}
                                        sx={{ '&.Mui-checked': { color: '#3b82f6' } }}
                                    />
                                    <span className="font-medium text-gray-700 text-base">المشرفين</span>
                                </div>

                                {/* خيار الوسطاء */}
                                <div className="w-full flex flex-row items-center gap-2 px-2 py-1 hover:bg-gray-50 rounded">
                                    <Checkbox
                                        checked={target === "offices"}
                                        onChange={(e) => handleTargetChange("offices", e.target.checked)}
                                        sx={{ '&.Mui-checked': { color: '#3b82f6' } }}
                                    />
                                    <span className="font-medium text-gray-700 text-base">الوسطاء</span>
                                </div>
                            </div>

                            {/* أزرار التحكم */}
                            <div className="flex flex-row items-center gap-4 mt-4 w-full justify-center">
                                <Button
                                    variant="contained"
                                    onClick={close}
                                    sx={{
                                        width: 140,
                                        height: 45,
                                        color: "#4b5563",
                                        backgroundColor: "#f3f4f6",
                                        borderRadius: "25px",
                                        boxShadow: "none",
                                        fontFamily: "Cairo",
                                        fontWeight: 700,
                                        '&:hover': { backgroundColor: '#e5e7eb', boxShadow: 'none' }
                                    }}
                                >
                                    إلغاء
                                </Button>
                                
                                <Button
                                    variant="contained"
                                    onClick={handleSubmit(onSubmit)}
                                    sx={{
                                        width: 140,
                                        height: 45,
                                        color: "#ffffff",
                                        backgroundColor: "#3b82f6",
                                        borderRadius: "25px",
                                        boxShadow: "none",
                                        fontFamily: "Cairo",
                                        fontWeight: 700,
                                        '&:hover': { backgroundColor: '#2563eb', boxShadow: 'none' }
                                    }}
                                >
                                    إرسال
                                </Button>
                            </div>
                        </div>
                    )
                )}
            </Popup>
        </>
    );
};

export default SendNotification;