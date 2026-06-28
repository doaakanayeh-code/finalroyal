export default function Loading() {
    return (
        <div className="spinner-container-submit">
            <div className="petal-spinner">
                <div className="petal"></div>
                <div className="petal"></div>
                <div className="petal"></div>
                <div className="petal"></div>
                <div className="petal"></div>
                <div className="petal"></div>
                <div className="petal"></div>
                <div className="petal"></div>
                <div className="petal"></div>
                <div className="petal"></div>
                <div className="petal"></div>
                <div className="petal"></div>
            </div>

            <style>{`
                .spinner-container-submit {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    background-color: transparent; /* يمكنك تغيير الخلفية إذا أردت */
                }

                .petal-spinner {
                    position: relative;
                    width: 60px;
                    height: 60px;
                }

                .petal {
                    position: absolute;
                    width: 4px;
                    height: 14px;
                    background-color: #D18C96; /* اللون الأخضر القريب من الصورة */
                    border-radius: 50%; 
                    left: 50%;
                    top: 0;
                    transform-origin: center 30px; /* مركز الدوران لجعلها تدور حول دائرة قطرها 60px */
                    animation: fade 1.2s linear infinite;
                    opacity: 0.1;
                }

                /* توزيع النقاط البيضاوية على زوايا الدائرة وعمل تأخير (Delay) للحركة */
                .petal:nth-child(1)  { transform: translateX(-50%) rotate(0deg);    animation-delay: -1.2s; }
                .petal:nth-child(2)  { transform: translateX(-50%) rotate(30deg);   animation-delay: -1.1s; }
                .petal:nth-child(3)  { transform: translateX(-50%) rotate(60deg);   animation-align: -1.0s; animation-delay: -1s; }
                .petal:nth-child(4)  { transform: translateX(-50%) rotate(90deg);   animation-delay: -0.9s; }
                .petal:nth-child(5)  { transform: translateX(-50%) rotate(120deg);  animation-delay: -0.8s; }
                .petal:nth-child(6)  { transform: translateX(-50%) rotate(150deg);  animation-delay: -0.7s; }
                .petal:nth-child(7)  { transform: translateX(-50%) rotate(180deg);  animation-delay: -0.6s; }
                .petal:nth-child(8)  { transform: translateX(-50%) rotate(210deg);  animation-delay: -0.5s; }
                .petal:nth-child(9)  { transform: translateX(-50%) rotate(240deg);  animation-delay: -0.4s; }
                .petal:nth-child(10) { transform: translateX(-50%) rotate(270deg);  animation-delay: -0.3s; }
                .petal:nth-child(11) { transform: translateX(-50%) rotate(300deg);  animation-delay: -0.2s; }
                .petal:nth-child(12) { transform: translateX(-50%) rotate(330deg);  animation-delay: -0.1s; }

                /* أنيميشن التلاشي والظهور المتتابع */
                @keyframes fade {
                    0% { opacity: 1; }
                    100% { opacity: 0.1; }
                }
            `}</style>
        </div>
    );
}