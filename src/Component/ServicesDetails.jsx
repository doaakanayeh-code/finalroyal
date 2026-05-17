import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import {
  MapContainer,
  TileLayer,
  Marker,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

export default function NewVenuePopupDemo() {
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("19:30");

  const handleDownloadBooklet = () => {
    const fileUrl = "/clinic-hub-booklet.pdf"; 
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', 'Clinic_Hub_Booklet.pdf'); 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const venue = {
    name: "Royal Sapphire Hall",
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1200&auto=format&fit=crop",
    ],
    capacity: 1000,
    type: "Weddings, Engagements",
    price: "$5000 / Night",
    location: {
      lat: 33.8938,
      lng: 35.5018,
      address: "123 Royal Ave, Event City",
    },
    availableTimes: ["18:00", "18:30", "19:30", "21:00"],
  };

  const calendarCustomStyle = `
    .custom-cal .react-calendar { border: none !important; width: 100% !important; font-family: sans-serif; font-size: 11px; }
    .custom-cal .react-calendar__tile--active { background: #007bff !important; color: white !important; border-radius: 50%; }
    .custom-cal .react-calendar__tile { border-radius: 50%; height: 32px; display: flex; align-items: center; justify-content: center; }
  `;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f4f4f5", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "sans-serif" }}>
      <style>{calendarCustomStyle}</style>

      <div style={{ width: "100%", maxWidth: "1200px", backgroundColor: "#ffffff", borderRadius: "24px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)", padding: "24px", boxSizing: "border-box" }}>
        
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", borderBottom: "1px solid #f4f4f5", paddingBottom: "12px" }}>
          <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#18181b", margin: 0 }}>Venue Details</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#f4f4f5", border: "1px solid #e4e4e7", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "16px" }}>🔔</button>
            <img src="https://i.pravatar.cc/100" alt="User" style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid #e4e4e7" }} />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, minmax(0, 1fr))", gap: "20px", backgroundColor: "#fafafa", padding: "20px", borderRadius: "16px", border: "1px solid #e4e4e7" }}>
            
            <div style={{ gridColumn: "span 8", display: "flex", flexDirection: "column", gap: "10px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#09090b", margin: 0 }}>{venue.name}</h2>
              <div style={{ position: "relative", width: "100%", height: "260px" }}>
                <img src={venue.images[0]} alt="Main" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }} />
                <span style={{ position: "absolute", bottom: "12px", left: "12px", backgroundColor: "rgba(0,0,0,0.6)", color: "#fff", fontSize: "11px", padding: "4px 10px", borderRadius: "20px" }}>Main View</span>
              </div>
            </div>

            <div style={{ gridColumn: "span 4", display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "11px", fontWeight: "700", color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "10px" }}>Visual Gallery</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto", maxHeight: "260px" }}>
                {venue.images.slice(1).map((img, idx) => (
                  <img key={idx} src={img} alt="" style={{ width: "100%", height: "76px", objectFit: "cover", borderRadius: "12px", border: "1px solid #e4e4e7" }} />
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "20px" }}>
            
            <div style={{ backgroundColor: "#fafafa", border: "1px solid #e4e4e7", borderRadius: "16px", padding: "16px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ fontSize: "14px", fontWeight: "700", color: "#27272a", marginBottom: "12px", marginTop: 0 }}>Details & Specifications</h3>
                <div style={{ width: "100%", height: "90px", backgroundColor: "#e4e4e7", borderRadius: "12px", marginBottom: "12px", overflow: "hidden" }}>
                  <img src="https://images.unsplash.com/photo-1545464693-f1798a373343?q=80&w=400" alt="Floor plan" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.2 }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f4f4f5", paddingBottom: "6px" }}>
                    <span style={{ color: "#71717a" }}>Capacity</span>
                    <span style={{ fontWeight: "600", color: "#3f3f46" }}>{venue.capacity} guests</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f4f4f5", paddingBottom: "6px" }}>
                    <span style={{ color: "#71717a" }}>Event Type</span>
                    <span style={{ fontWeight: "600", color: "#3f3f46" }}>{venue.type}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#71717a" }}>Price</span>
                    <span style={{ fontWeight: "700", color: "#18181b" }}>{venue.price}</span>
                  </div>
                </div>
              </div>
              <button style={{ marginTop: "12px", width: "100%", backgroundColor: "#e4e4e7", border: "none", color: "#27272a", fontWeight: "500", padding: "8px 0", borderRadius: "10px", fontSize: "12px", cursor: "pointer" }}>View Packages</button>
            </div>

            <div style={{ backgroundColor: "#fafafa", border: "1px solid #e4e4e7", borderRadius: "16px", padding: "16px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ fontSize: "14px", fontWeight: "700", color: "#27272a", marginBottom: "12px", marginTop: 0 }}>Location & Map</h3>
                <div style={{ height: "90px", width: "100%", overflow: "hidden", borderRadius: "12px", border: "1px solid #e4e4e7", marginBottom: "10px" }}>
                  <MapContainer center={[venue.location.lat, venue.location.lng]} zoom={13} style={{ height: "100%", width: "100%" }} zoomControl={false}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[venue.location.lat, venue.location.lng]} />
                  </MapContainer>
                </div>
                <div style={{ fontSize: "12px" }}>
                  <p style={{ fontWeight: "700", color: "#18181b", margin: "0 0 2px 0" }}>Royal Moment - Sapphire Hall</p>
                  <p style={{ color: "#71717a", margin: 0 }}>{venue.location.address}</p>
                </div>
              </div>
              <button style={{ marginTop: "12px", width: "100%", backgroundColor: "#ffffff", border: "1px solid #e4e4e7", color: "#52525b", fontWeight: "500", padding: "8px 0", borderRadius: "10px", fontSize: "12px", cursor: "pointer", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>Get Directions</button>
              <button 
                onClick={handleDownloadBooklet}
                style={{ 
                  marginTop: "12px", 
                  width: "100%", 
                  backgroundColor: "#ffffff", 
                  border: "1px solid #e4e4e7", 
                  color: "#27272a", 
                  fontWeight: "600", 
                  padding: "10px 0", 
                  borderRadius: "10px", 
                  fontSize: "12px", 
                  cursor: "pointer", 
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  gap: "6px",
                  transition: "background-color 0.2s ease"
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#f4f4f5"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "#ffffff"}
              >
                📄 <span>تحميل الكتيب</span>
              </button>
            </div>

            <div style={{ backgroundColor: "#fafafa", border: "1px solid #e4e4e7", borderRadius: "16px", padding: "16px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ fontSize: "14px", fontWeight: "700", color: "#27272a", marginBottom: "10px", marginTop: 0 }}>Availability Calendar</h3>
                <div className="custom-cal" style={{ backgroundColor: "#ffffff", border: "1px solid #e4e4e7", borderRadius: "12px", padding: "6px", marginBottom: "12px" }}>
                  <Calendar onChange={setDate} value={date} />
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "6px", marginBottom: "12px" }}>
                  {venue.availableTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      style={{
                        padding: "6px 0",
                        fontSize: "11px",
                        fontWeight: "500",
                        borderRadius: "8px",
                        border: "1px solid #e4e4e7",
                        cursor: "pointer",
                        backgroundColor: selectedTime === time ? "#18181b" : "#ffffff",
                        color: selectedTime === time ? "#ffffff" : "#27272a"
                      }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <button style={{ width: "100%", backgroundColor: "#007bff", color: "#ffffff", border: "none", padding: "10px 0", borderRadius: "10px", fontWeight: "700", fontSize: "12px", cursor: "pointer", boxShadow: "0 4px 6px -1px rgba(0,123,255,0.2)", marginBottom: "12px" }}>
                Proceed to Booking
              </button>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #e4e4e7", paddingTop: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=60" alt="" style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" }} />
                  <div>
                    <p style={{ fontWeight: "700", fontSize: "11px", color: "#18181b", margin: 0 }}>Booking Agent</p>
                    <p style={{ fontSize: "10px", color: "#a1a1aa", margin: 0 }}>Available</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "4px" }}>
                  <button style={{ backgroundColor: "#ffffff", border: "1px solid #e4e4e7", color: "#27272a", fontSize: "10px", padding: "4px 8px", borderRadius: "6px", cursor: "pointer" }}>Call</button>
                  <button style={{ backgroundColor: "#18181b", border: "none", color: "#ffffff", fontSize: "10px", padding: "4px 8px", borderRadius: "6px", cursor: "pointer" }}>Message</button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}