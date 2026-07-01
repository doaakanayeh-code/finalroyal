import { useState, useRef, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import html2pdf from "html2pdf.js";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  FaMapMarkerAlt,
  FaUsers,
  FaMoneyBillWave,
  FaDownload,
  FaHeart,
  FaRegHeart,
  FaExpand,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { MdCelebration } from "react-icons/md";
import BookingModal from "./ConfirmBooking";
import { ThemeContext } from "../Context/ThemeContext";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const fallbackVenueData = {
  name: "Royal Sapphire Hall",
  images: [
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1600",
    "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1600",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1600",
  ],
  capacity: "1000 شخص",
  type: "Weddings, Engagements",
  price: "$5000 / Night",
  location: {
    lat: 33.8938,
    lng: 35.5018,
    address: "123 Royal Ave, Event City",
  },
  availableTimes: ["18:00", "18:30", "19:00", "21:00"],
  amenities: [
    "Full Sound System",
    "Lighting Equipment",
    "LED Screens",
    "High-Speed Wi-Fi",
    "Main Stage Decor",
    "Dressing Room",
    "Hospitality Team",
    "AC Climate Control",
  ],
  packages: [
    {
      title: "Silver Royal Bundle",
      price: "$4500",
      features: ["Sound System", "Basic Lighting", "Stage Decor"],
    },
    {
      title: "Golden Royal Bundle",
      price: "$9000",
      features: ["Full Sound & LED Screens", "Luxury Decor", "Zaffah Group", "Hospitality Service"],
    },
  ],
};

export default function ServicesDetails() {
  const { mode } = useContext(ThemeContext);
  const isDark = mode === "dark";

  const locationState = useLocation();
  const passedVenue = locationState.state?.venue;

  const venue = {
    ...fallbackVenueData,
    name: passedVenue?.name || fallbackVenueData.name,
    images: passedVenue?.img
      ? [passedVenue.img, ...fallbackVenueData.images]
      : fallbackVenueData.images,
    capacity: passedVenue?.capacity || fallbackVenueData.capacity,
    location: {
      ...fallbackVenueData.location,
      address: passedVenue?.location || fallbackVenueData.location.address,
    },
  };

  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("19:00");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const mapRef = useRef(null);

  const bookingDetails = {
    service: venue.name,
    date: `${date.getDate()} ${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()} @ ${selectedTime}`,
    total: venue.price.split(" ")[0],
  };

  const handleNextImage = (e) => {
    if (e) e.stopPropagation();
    setActiveImage((prev) => (prev + 1) % venue.images.length);
  };

  const handlePrevImage = (e) => {
    if (e) e.stopPropagation();
    setActiveImage((prev) => (prev - 1 + venue.images.length) % venue.images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isFullscreen) return;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        handleNextImage();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        handlePrevImage();
      } else if (e.key === "Escape") {
        setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  const handleDownloadMapPDF = () => {
    const element = mapRef.current;
    if (!element) return;

    const options = {
      margin: 10,
      filename: `${venue.name}-detailed-map.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { useCORS: true, scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    };

    setTimeout(() => {
      html2pdf().set(options).from(element).save();
    }, 500);
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: isDark ? "#121212" : "#fdf6f4",
      padding: "20px",
      fontFamily: "sans-serif",
      transition: "background 0.3s ease, color 0.3s ease",
    },
    container: {
      maxWidth: "1400px",
      margin: "0 auto",
    },
    card: {
      background: isDark ? "#1e1e1e" : "#fff",
      borderRadius: "24px",
      border: isDark ? "1px solid #2d2d2d" : "1px solid #f1dede",
      padding: "24px",
      marginBottom: "24px",
      transition: "background 0.3s ease, border 0.3s ease",
    },
    sectionTitle: {
      fontSize: "24px",
      fontWeight: "700",
      color: isDark ? "#ffffff" : "#2d1f1f",
      marginBottom: "20px",
    },
    tag: {
      border: isDark ? "1px solid #4a2c31" : "1px solid #e6b9c0",
      padding: "10px 18px",
      borderRadius: "999px",
      color: isDark ? "#e594a3" : "#c86d7f",
      background: isDark ? "#251c1d" : "#fff",
      fontWeight: "500",
    },
    button: {
      background: "#d67c8a",
      color: "#fff",
      border: "none",
      borderRadius: "14px",
      padding: "16px 24px",
      fontWeight: "700",
      cursor: "pointer",
    },
    actionCircleBtn: {
      width: "42px",
      height: "42px",
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.9)",
      border: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
      color: "#2d1f1f",
      fontSize: "18px",
      transition: "all 0.2s ease",
    },
    navFullBtn: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.15)",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "22px",
      transition: "background 0.2s",
      zIndex: 100000,
    }
  };

  return (
    <div style={styles.page} className={isDark ? "dark-theme-calendar" : ""}>
      <div style={styles.container}>
        
       {/* Main Gallery */}
<div
  style={{
    marginBottom: "30px",
  }}
>
  {/* Main Image */}
  <div
    style={{
      position: "relative",
      borderRadius: "24px",
      overflow: "hidden",
      height: "550px",
      border: "2px solid #f0a8b8",
      background: "#000",
    }}
  >
    <img
      src={venue.images[activeImage]}
      alt=""
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />

    {/* Actions */}
    <div
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        display: "flex",
        gap: "10px",
      }}
    >
      <button
        style={styles.actionCircleBtn}
        onClick={() => setIsFavorite(!isFavorite)}
      >
        {isFavorite ? (
          <FaHeart style={{ color: "#e91e63" }} />
        ) : (
          <FaRegHeart />
        )}
      </button>

      <button
        style={styles.actionCircleBtn}
        onClick={() => setIsFullscreen(true)}
      >
        <FaExpand />
      </button>
    </div>
  </div>

  {/* Thumbnails */}
  <div
    style={{
      display: "flex",
      justifyContent: "flex-end",
      gap: "12px",
      marginTop: "15px",
      flexWrap: "wrap",
    }}
  >
    {venue.images.map((img, idx) => (
      <img
        key={idx}
        src={img}
        alt=""
        onClick={() => setActiveImage(idx)}
        style={{
          width: "130px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "12px",
          cursor: "pointer",
          border:
            activeImage === idx
              ? "3px solid #d67c8a"
              : "2px solid #eee",
          transition: "0.2s",
        }}
      />
    ))}
  </div>

  {/* Hall Name */}
  <div
    style={{
      marginTop: "20px",
    }}
  >
    <h1
      style={{
        fontSize: "42px",
        fontWeight: "700",
        marginBottom: "10px",
      }}
    >
      {venue.name}
    </h1>

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        color: "#666",
      }}
    >
      <FaMapMarkerAlt />
      {venue.location.address}
    </div>
  </div>
</div>

        <div style={{ ...styles.card, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
          <InfoBox icon={<FaUsers />} title="Capacity" value={venue.capacity} isDark={isDark} />
          <InfoBox icon={<MdCelebration />} title="Type" value={venue.type} isDark={isDark} />
          <InfoBox icon={<FaMoneyBillWave />} title="Price" value={venue.price} isDark={isDark} />
        </div>

        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Amenities & Facilities</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {venue.amenities.map((item) => (
              <div key={item} style={styles.tag}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginBottom: "24px" }}>
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>Location & Map</h2>
            <div ref={mapRef} style={{ background: isDark ? "#1e1e1e" : "#fff", padding: "10px", borderRadius: "24px" }}>
              <div style={{ borderRadius: "18px", overflow: "hidden", marginBottom: "15px", zIndex: 1 }}>
                <MapContainer center={[venue.location.lat, venue.location.lng]} zoom={16} style={{ width: "100%", height: "320px", zIndex: 1 }}>
                  <TileLayer attribution="© OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[venue.location.lat, venue.location.lng]} />
                </MapContainer>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: isDark ? "#eee" : "#333", fontWeight: "600", fontSize: "15px" }}>
                <FaMapMarkerAlt style={{ color: "#d67c8a" }} /> {venue.location.address}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "20px" }}>
              <button onClick={handleDownloadMapPDF} style={{ ...styles.button, width: "100%", background: isDark ? "#251c1d" : "#fff", color: "#d67c8a", border: isDark ? "2px solid #4a2c31" : "2px solid #d67c8a", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                <FaDownload /> Download Detailed Map as PDF
              </button>
            </div>
          </div>

          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>Availability Calendar</h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Calendar onChange={setDate} value={date} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: "12px", marginTop: "24px" }}>
              {venue.availableTimes.map((time) => (
                <button key={time} onClick={() => setSelectedTime(time)} style={{ padding: "14px", borderRadius: "14px", border: selectedTime === time ? "none" : (isDark ? "1px solid #443235" : "1px solid #ead1d5"), background: selectedTime === time ? "#d67c8a" : (isDark ? "#2d2d2d" : "#fff"), color: selectedTime === time ? "#fff" : (isDark ? "#eee" : "#333"), fontWeight: "700", cursor: "pointer" }}>
                  {time}
                </button>
              ))}
            </div>
            <button onClick={() => setIsModalOpen(true)} style={{ ...styles.button, width: "100%", marginTop: "24px", fontSize: "18px" }}>
              Proceed to Booking →
            </button>
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>🎁 Available Packages</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
            {venue.packages.map((pkg) => (
              <PackageCard key={pkg.title} pkg={pkg} isDark={isDark} />
            ))}
          </div>
        </div>
      </div>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} bookingDetails={bookingDetails} />

      {isFullscreen && (
        <div 
          onClick={() => setIsFullscreen(false)} 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeIn 0.25s ease"
          }}
        >
          <button 
            onClick={() => setIsFullscreen(false)}
            style={{
              position: "absolute",
              top: "25px",
              left: "25px",
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.2)",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              zIndex: 100001
            }}
          >
            <FaTimes />
          </button>

          <button 
            style={{ ...styles.navFullBtn, left: "30px" }}
            onClick={handlePrevImage}
            onMouseEnter={(e) => e.target.style.background = "rgba(255, 255, 255, 0.3)"}
            onMouseLeave={(e) => e.target.style.background = "rgba(255, 255, 255, 0.15)"}
          >
            <FaChevronLeft />
          </button>

          <img 
            src={venue.images[activeImage]} 
            alt="Venue Layout Max" 
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "85%",
              maxHeight: "85vh",
              borderRadius: "16px",
              objectFit: "contain",
              boxShadow: "0px 10px 40px rgba(0,0,0,0.8)",
              cursor: "default"
            }}
          />

          <button 
            style={{ ...styles.navFullBtn, right: "30px" }}
            onClick={handleNextImage}
            onMouseEnter={(e) => e.target.style.background = "rgba(255, 255, 255, 0.3)"}
            onMouseLeave={(e) => e.target.style.background = "rgba(255, 255, 255, 0.15)"}
          >
            <FaChevronRight />
          </button>

          <div style={{
            position: "absolute",
            bottom: "30px",
            color: "#fff",
            background: "rgba(0,0,0,0.6)",
            padding: "8px 16px",
            borderRadius: "20px",
            fontSize: "15px",
            fontWeight: "600",
            letterSpacing: "1px"
          }}>
            {activeImage + 1} / {venue.images.length}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .dark-theme-calendar .react-calendar {
          background: #1e1e1e !important;
          color: #fff !important;
          border: 1px solid #2d2d2d !important;
        }
        .dark-theme-calendar .react-calendar__tile:enabled:hover,
        .dark-theme-calendar .react-calendar__tile:enabled:focus {
          background-color: #2d2d2d !important;
        }
        .dark-theme-calendar .react-calendar__navigation button:enabled:hover,
        .dark-theme-calendar .react-calendar__navigation button:enabled:focus {
          background-color: #2d2d2d !important;
        }
        .dark-theme-calendar .react-calendar__month-view__days__day--weekend {
          color: #d67c8a !important;
        }
        .dark-theme-calendar .react-calendar__tile--active {
          background: #d67c8a !important;
          color: white !important;
        }
        .dark-theme-calendar .react-calendar__month-view__weekdays__weekday abbr {
          color: #aaa !important;
          text-decoration: none !important;
        }
      `}</style>
    </div>
  );
}

function InfoBox({ icon, title, value, isDark }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
      <div style={{ fontSize: "34px", color: "#d67c8a", display: "flex", alignItems: "center" }}>{icon}</div>
      <div>
        <div style={{ color: isDark ? "#aaa" : "#888", marginBottom: "4px", fontSize: "14px" }}>{title}</div>
        <div style={{ fontSize: "18px", fontWeight: "700", color: isDark ? "#fff" : "#000" }}>{value}</div>
      </div>
    </div>
  );
}

function PackageCard({ pkg, isDark }) {
  return (
    <div style={{ 
      border: isDark ? "1px solid #2d2d2d" : "1px solid #f1dede", 
      borderRadius: "24px", 
      padding: "24px", 
      background: isDark ? "#251c1d" : "#fffafa", 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "space-between",
      transition: "background 0.3s, border 0.3s"
    }}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3 style={{ fontSize: "22px", margin: 0, fontWeight: "700", color: isDark ? "#fff" : "#000" }}>{pkg.title}</h3>
          <div style={{ fontSize: "26px", color: "#d67c8a", fontWeight: "700" }}>{pkg.price}</div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "24px" }}>
          {pkg.features.map((item) => (
            <div key={item} style={{ 
              border: isDark ? "1px solid #4a2c31" : "1px solid #e6b9c0", 
              padding: "8px 14px", 
              borderRadius: "999px", 
              color: isDark ? "#e594a3" : "#c86d7f", 
              background: isDark ? "#1e1e1e" : "#fff", 
              fontSize: "14px" 
            }}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <button style={{ width: "100%", background: "#d67c8a", color: "#fff", border: "none", borderRadius: "14px", padding: "16px", fontWeight: "700", cursor: "pointer" }}>
        📅 Book Bundle
      </button>
    </div>
  );
}