import ServiceDetailsTemplate from "../../Allcomponent/ServiceDetailsTemplate";

export default function GrandHallPage() {

  const grandHallData = {
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


  return <ServiceDetailsTemplate data={grandHallData} />;
}