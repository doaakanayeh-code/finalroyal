import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaMapMarkerAlt, FaUsers, FaMoneyBillWave, FaExternalLinkAlt } from "react-icons/fa";
import { MdCelebration } from "react-icons/md";
import BookingModal from "./ConfirmBooking";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function ServiceDetailsTemplate({ data }) {
  const service = data || {
    name: "اسم الخدمة الافتراضي",
    images: ["https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1600"],
    capacity: "حسب الطلب",
    type: "عام",
    price: "$5000 / Night",
    location: { lat: 33.8938, lng: 35.5018, address: "العنوان الافتراضي" },
    availableTimes: ["18:00", "20:00"],
    amenities: [],
    packages: []
  };

  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(service.availableTimes[0] || "19:00");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${service.location.lat},${service.location.lng}`;
    window.open(url, "_blank");
  };

  const bookingDetails = {
    service: service.name,
    date: date.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "2-digit" }),
    time: selectedTime,
    total: service.price,
  };

  const styles = {
    page: { minHeight: "100vh", background: "#fdf6f4", padding: "20px", fontFamily: "sans-serif", direction: "rtl" },
    container: { maxWidth: "1400px", margin: "0 auto" },
    card: { background: "#fff", borderRadius: "24px", border: "1px solid #f1dede", padding: "24px", marginBottom: "24px", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" },
    sectionTitle: { fontSize: "22px", fontWeight: "700", color: "#2d1f1f", marginBottom: "20px" },
    tag: { border: "1px solid #e6b9c0", padding: "10px 18px", borderRadius: "999px", color: "#c86d7f", background: "#fff", fontWeight: "500" },
    button: { background: "#d67c8a", color: "#fff", border: "none", borderRadius: "14px", padding: "16px 24px", fontWeight: "700", cursor: "pointer", transition: "all 0.2s" },
    mapBtn: { background: "#d67c8a", color: "#fff", border: "none", borderRadius: "14px", padding: "14px", width: "100%", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "15px" }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        
        
        <div style={{ position: "relative", borderRadius: "32px", overflow: "hidden", minHeight: "450px", background: "#000", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "30px", marginBottom: "28px" }}>
          <img src={service.images[activeImage]} alt="" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 1 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.2))", zIndex: 2 }} />


          <div style={{ position: "absolute", bottom: "30px", left: "30px", background: "#fff", padding: "12px 24px", borderRadius: "20px", zIndex: 3, boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
            <span style={{ fontSize: "22px", fontWeight: "700", color: "#c86d7f" }}>{service.price}</span>
          </div>

       
          <div style={{ position: "absolute", top: "24px", left: "24px", display: "flex", gap: "12px", zIndex: 3, flexWrap: "wrap" }}>
            {service.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt=""
                onClick={() => setActiveImage(idx)}
                style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "12px", cursor: "pointer", border: activeImage === idx ? "3px solid white" : "2px solid transparent" }}
              />
            ))}
          </div>

          <div style={{ position: "relative", zIndex: 3, textAlign: "right" }}>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 46px)", color: "#fff", marginBottom: "10px", fontWeight: "700" }}>{service.name}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "16px", color: "#fff", opacity: 0.9 }}>
              <FaMapMarkerAlt /> {service.location.address}
            </div>
          </div>
        </div>

       
        <div style={{ ...styles.card, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
          <InfoBox icon={<FaUsers />} title="القدرة الاستيعابية / الحجم" value={service.capacity} />
          <InfoBox icon={<MdCelebration />} title="تصنيف الخدمة" value={service.type} />
          <InfoBox icon={<FaMoneyBillWave />} title="التكلفة" value={service.price} />
        </div>

        {service.amenities.length > 0 && (
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>الميزات والخدمات المتاحة</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {service.amenities.map((item) => (
                <div key={item} style={styles.tag}>{item}</div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", marginBottom: "24px" }}>
          
   
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>الموقع والخريطة</h2>
            <div style={{ background: "#fff", borderRadius: "24px", overflow: "hidden" }}>
              <MapContainer center={[service.location.lat, service.location.lng]} zoom={14} style={{ width: "100%", height: "280px", borderRadius: "18px" }}>
                <TileLayer attribution="© OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[service.location.lat, service.location.lng]} />
              </MapContainer>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#555", fontWeight: "600", marginTop: "15px", fontSize: "15px" }}>
                <FaMapMarkerAlt style={{ color: "#d67c8a" }} /> {service.location.address}
              </div>
              <button onClick={openGoogleMaps} style={styles.mapBtn}>
                <FaExternalLinkAlt /> Open in Google Maps
              </button>
            </div>
          </div>


          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>جدول الحجوزات المتاحة</h2>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <Calendar onChange={setDate} value={date} />
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))", gap: "10px", marginBottom: "20px" }}>
              {service.availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  style={{ padding: "12px", borderRadius: "12px", border: selectedTime === time ? "none" : "1px solid #ead1d5", background: selectedTime === time ? "#d67c8a" : "#fff", color: selectedTime === time ? "#fff" : "#333", fontWeight: "700", cursor: "pointer" }}
                >
                  {time}
                </button>
              ))}
            </div>


            <div style={{ background: "#fffafa", border: "1px solid #f1dede", borderRadius: "16px", padding: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "13px", color: "#888" }}>Total Price</div>
                <div style={{ fontSize: "20px", fontWeight: "700", color: "#c86d7f" }}>{service.price}</div>
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "13px", color: "#888" }}>Selected Date</div>
                <div style={{ fontSize: "15px", fontWeight: "700", color: "#333" }}>
                  {date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "2-digit", year: "numeric" })}
                </div>
              </div>
            </div>

            <button onClick={() => setIsModalOpen(true)} style={{ ...styles.button, width: "100%", marginTop: "20px", fontSize: "18px" }}>
              متابعة عملية الحجز ←
            </button>
          </div>
        </div>

   
        {service.packages && service.packages.length > 0 && (
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>🎁 الباقات والعروض المتوفرة</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
              {service.packages.map((pkg) => (
                <PackageCard key={pkg.title} pkg={pkg} />
              ))}
            </div>
          </div>
        )}

      </div>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} bookingDetails={bookingDetails} />
    </div>
  );
}

function InfoBox({ icon, title, value }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "15px", direction: "rtl" }}>
      <div style={{ fontSize: "30px", color: "#d67c8a", display: "flex", alignItems: "center" }}>{icon}</div>
      <div>
        <div style={{ color: "#888", marginBottom: "2px", fontSize: "13px" }}>{title}</div>
        <div style={{ fontSize: "16px", fontWeight: "700" }}>{value}</div>
      </div>
    </div>
  );
}

function PackageCard({ pkg }) {
  return (
    <div style={{ border: "1px solid #f1dede", borderRadius: "24px", padding: "24px", background: "#fffafa", display: "flex", flexDirection: "column", justifyContent: "space-between", textAlign: "right" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3 style={{ fontSize: "18px", margin: 0, fontWeight: "700" }}>{pkg.title}</h3>
          <div style={{ fontSize: "22px", color: "#d67c8a", fontWeight: "700" }}>{pkg.price}</div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "24px" }}>
          {pkg.features.map((item) => (
            <div key={item} style={{ border: "1px solid #e6b9c0", padding: "8px 14px", borderRadius: "999px", color: "#c86d7f", background: "#fff", fontSize: "13px" }}>{item}</div>
          ))}
        </div>
      </div>
      <button style={{ width: "100%", background: "#d67c8a", color: "#fff", border: "none", borderRadius: "14px", padding: "14px", fontWeight: "700", cursor: "pointer" }}>
        📅 اختيار هذه الباقة
      </button>
    </div>
  );
}