import React from 'react';
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next"; 
import SignUP from '../Auth/SignUp';

export default function Provider() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <div dir={t("dir")} style={{ backgroundColor: theme.palette.background.default, minHeight: '100vh', paddingBottom: '80px' }}>
      <main style={{ maxWidth: '1100px', margin: '50px auto 0', padding: '0 16px' }}>
        
        {/* 1. Hero Section */}
        <section style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ color: theme.palette.text.primary, fontSize: '36px', fontWeight: '900' }}>
            {t("hero1.title")}
          </h1>
          <p style={{ color: theme.palette.text.secondary, margin: '20px 0' }}>
            {t("hero1.subtitle")}
          </p>
          <button style={{ backgroundColor: theme.palette.primary.main, color: '#fff', padding: '12px 30px', borderRadius: '12px', border: 'none' }}>
            {t("hero1.btn_free")}
          </button>
        </section>

        {/* 2. Steps Section */}
        <section style={{ marginTop: '60px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {[1, 2, 3, 4].map((num) => (
              <div key={num} style={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, padding: '24px', borderRadius: '16px' }}>
                <h3 style={{ color: theme.palette.text.primary }}>{t("steps.label")} 0{num}</h3>
                <p style={{ color: theme.palette.text.secondary }}>{t(`registration_steps.step${num}`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Register Form */}
        <section style={{ maxWidth: '500px', margin: '60px auto' }}>
          <SignUP isModal={false} />
        </section>

        {/* 4. Features Section */}
        <section style={{ marginTop: '80px', paddingTop: '40px', borderTop: `1px solid ${theme.palette.divider}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} style={{ backgroundColor: theme.palette.background.paper, padding: '20px', borderRadius: '16px' }}>
                <h3 style={{ color: theme.palette.text.primary }}>{t(`features_section.feature${num}`)}</h3>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}