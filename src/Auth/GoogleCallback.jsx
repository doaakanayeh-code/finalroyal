import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import cookie from "cookie-universal";

export default function GoogleCallback() {
    const cookies = cookie();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");

        if (token) {
            cookies.set("Bearer", token, { path: "/" });
            window.location.pathname = "/services"; 
        } else {
            window.location.pathname = "/login";
        }
    }, [location]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h1>تسجيل الدخول ناجح.. جاري التحويل...</h1>
        </div>
    );
}