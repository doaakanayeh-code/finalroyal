import React from "react";

export default function CraftCard({ title, desc, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="royal-card"
      style={{
        backgroundColor: '#e9d5ca',
        borderRadius: '45px',
        padding: '40px 20px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.4s ease'
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          width: '85px',
          height: '85px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          fontSize: '35px'
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          color: '#8d6e63',
          fontSize: '20px',
          fontWeight: 'bold'
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color: '#8d6e63',
          fontSize: '14px',
          fontStyle: 'italic',
          opacity: '0.8'
        }}
      >
        {desc}
      </p>
    </div>
  );
}