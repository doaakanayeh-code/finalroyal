import { useState, useEffect } from "react";
import axios from "axios";
import { Badge, IconButton, Menu, MenuItem, CircularProgress } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function NotificationBell() {
    const [notifications, setNotifications] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [loading, setLoading] = useState(false);

    // دالة آمنة لجلب الإشعارات من قاعدة البيانات
    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/my-notifications");
            
            // فحص البيانات القادمة من الباك إند لضمان تخزين مصفوفة دائماً
            if (response.data && Array.isArray(response.data)) {
                setNotifications(response.data);
            } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
                // إذا كان الباك إند يغلف المصفوفة داخل كائن مثل { data: [...] }
                setNotifications(response.data.data);
            } else {
                setNotifications([]); // حماية في حال كانت البيانات العائدة ليست مصفوفة
            }
        } catch (error) {
            console.error("خطأ في جلب الإشعارات:", error);
            setNotifications([]); // حماية عند حدوث خطأ في الاتصال
        } finally {
            setLoading(false);
        }
    };

    // جلب الإشعارات عند تحميل المكون أول مرة
    useEffect(() => {
        fetchNotifications();
    }, []);

    // فتح القائمة المنسدلة عند الضغط على الجرس
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        fetchNotifications(); // تحديث الإشعارات فوراً عند فتح القائمة
    };

    // إغلاق القائمة
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div style={{ direction: "rtl", fontFamily: "Cairo" }}>
            {/* أيقونة الجرس مع عداد الإشعارات غير المقروءة المحمي بالكامل */}
            <IconButton onClick={handleClick} color="inherit" sx={{ padding: "8px" }}>
                <Badge 
                    badgeContent={Array.isArray(notifications) ? notifications.filter(n => !n.read_at).length : 0} 
                    color="error"
                >
                    <NotificationsIcon sx={{ color: "#ffffff", fontSize: "28px" }} />
                </Badge>
            </IconButton>

            {/* القائمة المنسدلة المخصصة لعرض الإشعارات */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                disableScrollLock={true}
                PaperProps={{
                    style: {
                        width: "320px",
                        maxHeight: "450px",
                        borderRadius: "15px",
                        boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
                        fontFamily: "Cairo",
                        padding: "5px"
                    }
                }}
            >
                <div 
                    style={{ 
                        padding: "12px", 
                        borderBottom: "1px solid #f0f0f0", 
                        textAlign: "center", 
                        fontWeight: "700", 
                        color: "#4b5563",
                        fontSize: "16px"
                    }}
                >
                    الإشعارات والتنبيهات
                </div>

                {loading && (!notifications || notifications.length === 0) ? (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "24px" }}>
                        <CircularProgress size={24} sx={{ color: "#b97681" }} />
                    </div>
                ) : !notifications || notifications.length === 0 ? (
                    <MenuItem 
                        onClick={handleClose} 
                        style={{ 
                            fontSize: "14px", 
                            justifyContent: "center", 
                            color: "#999999", 
                            padding: "20px 0",
                            fontFamily: "Cairo"
                        }}
                    >
                        لا توجد إشعارات جديدة حالياً
                    </MenuItem>
                ) : (
                    notifications.map((notification) => (
                        <MenuItem 
                            key={notification.id} 
                            onClick={handleClose} 
                            style={{ 
                                display: "flex", 
                                flexDirection: "column", 
                                alignItems: "start", 
                                borderBottom: "1px solid #f9f9f9",
                                whiteSpace: "normal",
                                padding: "12px 16px",
                                backgroundColor: notification.read_at ? "#ffffff" : "#fff5f5"
                            }}
                        >
                            <span 
                                style={{ 
                                    fontWeight: "700", 
                                    fontSize: "14px", 
                                    color: "#b97681", 
                                    marginBottom: "4px",
                                    fontFamily: "Cairo"
                                }}
                            >
                                {notification.title}
                            </span>
                            <span 
                                style={{ 
                                    fontSize: "13px", 
                                    color: "#555555", 
                                    lineHeight: "1.4", 
                                    textAlign: "right",
                                    fontFamily: "Cairo"
                                }}
                            >
                                {notification.body}
                            </span>
                        </MenuItem>
                    ))
                )}
            </Menu>
        </div>
    );
}