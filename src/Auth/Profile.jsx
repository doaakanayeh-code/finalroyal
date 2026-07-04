import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Tab,
  Tabs,
  Paper,
  IconButton,
  CircularProgress,
  Chip,
  Button,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import CraftCard from "../Allcomponent/CraftCard";
import DashboardCard from "../Allcomponent/Card";
import axiosClient from "../Api/axiosClient"; // عدّلي المسار إذا مختلف عندك
import EditProfileModal from "../Allcomponent/EditProfileModal";
import EditServiceModal from "../Allcomponent/Editservicemodal"; // عدّلي المسار إذا مختلف عندك

export default function PerfectProfile() {
  const [tabValue, setTabValue] = useState(0);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [editServiceId, setEditServiceId] = useState(null); // ⚠️ مؤقتاً id تجريبي من الكروت الوهمية
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);
  const [favoritesError, setFavoritesError] = useState(null);
  const [bookings, setBookings] = useState({ upcoming: [], completed: [], cancelled: [] });
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [bookingsError, setBookingsError] = useState(null);
  const [bookingsSubTab, setBookingsSubTab] = useState('upcoming'); // upcoming | completed | cancelled

  const fetchBookings = () => {
    setBookingsLoading(true);
    setBookingsError(null);
    // ⚠️ عدّلي المسار حسب الراوت الحقيقي المربوط بـ myBookings()
    axiosClient.get('/api/my-bookings')
      .then(res => setBookings({
        upcoming: res.data.upcoming || [],
        completed: res.data.completed || [],
        cancelled: res.data.cancelled || [],
      }))
      .catch(err => {
        console.error('فشل جلب الحجوزات:', err.response?.status, err.response?.data || err.message);
        setBookingsError('تعذر تحميل الحجوزات.');
      })
      .finally(() => setBookingsLoading(false));
  };

  // نجيب الحجوزات أول مرة يفتح فيها المستخدم هالتبويب فقط
  const bookingsFetchedRef = React.useRef(false);
  useEffect(() => {
    if (tabValue === 0 && !bookingsFetchedRef.current) {
      bookingsFetchedRef.current = true;
      fetchBookings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabValue]);

  const fetchFavorites = () => {
    setFavoritesLoading(true);
    setFavoritesError(null);
    // ⚠️ عدّلي المسار حسب الراوت الحقيقي (يبدو /api/favorites حسب الراوتات اللي عندك)
    axiosClient.get('/api/favorites')
      .then(res => setFavorites(res.data.favorites || []))
      .catch(err => {
        console.error('فشل جلب المفضلة:', err.response?.status, err.response?.data || err.message);
        setFavoritesError('تعذر تحميل المفضلة.');
      })
      .finally(() => setFavoritesLoading(false));
  };

  // نجيب المفضلة أول مرة يفتح فيها المستخدم هالتبويب فقط (مش من أول ما تفتح الصفحة)
  useEffect(() => {
    if (tabValue === 2 && favorites.length === 0 && !favoritesLoading) {
      fetchFavorites();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabValue]);

  const removeFavorite = async (providerServiceId) => {
    try {
      // POST toggle - بما إنها موجودة أصلاً بالمفضلة، هالضغطة بتشيلها
      await axiosClient.post(`/api/favorites/${providerServiceId}`);
      setFavorites(prev => prev.filter(f => f.providerService?.id !== providerServiceId));
    } catch (err) {
      console.error('فشل إزالة المفضلة:', err.response?.data || err.message);
    }
  };

  const openEditModal = (serviceId) => setEditServiceId(serviceId);
  const closeEditModal = () => setEditServiceId(null);

  useEffect(() => {
    // ⚠️ عدّلي المسار حسب الراوت الحقيقي المربوط بـ showProfile عندك
    axiosClient.get('/api/profile')
      .then(res => setProfile(res.data.data))
      .catch(err => {
        console.error('فشل جلب البروفايل:', err.response?.status, err.response?.data || err.message);
        setLoadError('تعذر تحميل بيانات البروفايل.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  // البيانات الخاصة بـ Quick Actions - ثابتة لحالياً (مش من الباك اند)
  const quickActions = [
    { title: "My Tickets", desc: "05 Tickets available", icon: "🎫" },
    { title: "Create Event", desc: "Share your event now", icon: "📅" },
    { title: "Saved Events", desc: "12 Saved items", icon: "❤️" },
  ];

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress sx={{ color: "#b97681" }} />
      </Box>
    );
  }

  if (loadError) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography color="error">{loadError}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#f0f7f7",
        minHeight: "100vh",
        pb: 6,
      }}
    >
      {/* HEADER */}
      <Box sx={{ position: "relative", mb: 12 }}>
        {/* COVER IMAGE */}
        <Box
          sx={{
            height: 280,
            background: "#b97681",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          {/* WAVE */}
          <Box
            sx={{
              position: "absolute",
              bottom: -1,
              left: 0,
              width: "100%",
              lineHeight: 0,
            }}
          >
            <svg
              viewBox="0 0 500 80"
              preserveAspectRatio="none"
              style={{ display: "block", width: "100%", height: "90px" }}
            >
              <path
                d="M0,40 C150,120 350,0 500,40 L500,80 L0,80 Z"
                style={{ fill: "#f0f7f7" }}
              />
            </svg>
          </Box>
        </Box>

        {/* AVATAR */}
        <Box
          sx={{
            position: "absolute",
            bottom: "-70px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 5,
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Avatar
              // ⚠️ الباك اند حالياً ما بيرجع صورة بروفايل منفصلة، بس صور هوية.
              // مؤقتاً حاطة صورة افتراضية - لازم نضيف حقل avatar/profile_image بجدول users
              src="https://i.pravatar.cc/300"
              sx={{ width: 140, height: 140, border: "5px solid #b97681" }}
            />
            <IconButton
              onClick={() => setIsEditProfileOpen(true)}
              sx={{
                position: "absolute",
                right: 5,
                bottom: 5,
                bgcolor: "#b97681",
                color: "white",
                width: 35,
                height: 35,
                "&:hover": { bgcolor: "#b97681" },
              }}
            >
              <EditIcon />
            </IconButton>
          </Box>
        </Box>

        {/* EDIT PROFILE BUTTON */}
        <Box sx={{ position: "absolute", right: "8%", bottom: "-25px" }}>
          <Paper
            elevation={0}
            onClick={() => setIsEditProfileOpen(true)}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: "40px",
              bgcolor: "#b97681",
              color: "white",
              cursor: "pointer",
            }}
          >
            <Typography fontWeight="bold">Edit profile</Typography>
          </Paper>
        </Box>
      </Box>

      {/* NAME */}
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#006064" }}>
          {profile?.username || "بدون اسم"}
        </Typography>

        {/* الإيميل والهاتف - إضافة جديدة لعرض بيانات التواصل الحقيقية */}
        <Typography variant="body1" color="text.secondary">
          {profile?.email || profile?.phone || ""}
        </Typography>

        {/* حالة الحساب - مفيدة لو كانت pending نوريها تنبيه */}
        {profile?.status === "pending" && (
          <Typography variant="body2" sx={{ color: "#e65100", fontWeight: "bold", mt: 1 }}>
            ⚠️ حسابك قيد المراجعة
          </Typography>
        )}

        {/*
          ⚠️ "Alexandria, Egypt" كانت ثابتة بالكود الأصلي - مافي حقل موقع بجدول users حالياً.
          إذا بدك هالمعلومة حقيقية، لازم نضيف عمود location/city بجدول users أو نربطه بجدول locations.
        */}
      </Box>

      {/* STATS */}
      {/*
        ⚠️ هاي الأرقام (Followers/Following/Likes) ثابتة بالكود الأصلي (12K, 67, 37K)
        ومافي أي حقل بالباك اند إلها. إما نحذفها، أو نربطها بجداول حقيقية إذا موجودة
        (مثلاً عدد الحجوزات، عدد الخدمات المنشورة...). خليتها كما هي مؤقتاً.
      */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          mb: 5,
          flexWrap: "wrap",
        }}
      >
        {[
          ["12K", "Followers"],
          ["67", "Following"],
          ["37K", "Likes"],
        ].map(([num, label]) => (
          <Box key={label} sx={{ textAlign: "center", minWidth: "80px" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#222" }}>
              {num}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* TABS */}
      <Tabs
        value={tabValue}
        onChange={(e, v) => setTabValue(v)}
        centered
        sx={{
          mb: 5,
          "& .MuiTabs-indicator": { height: 3, borderRadius: "10px", backgroundColor: "#006064" },
          "& .MuiTab-root": { textTransform: "none", fontWeight: "bold", minWidth: 120 },
        }}
      >
        <Tab label="My Bookings" />
        <Tab label="My Events" />
        <Tab label="Favorites" />
      </Tabs>

      {/* تبويب حجوزاتي - بيانات حقيقية 100% من myBookings() */}
      {tabValue === 0 && (
        <Box sx={{ px: 2, mb: 8 }}>
          {/* تبويبات فرعية للفئات الثلاث اللي رجعها الباك اند */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1.5, mb: 4 }}>
            {[
              { key: 'upcoming', label: 'قادمة وحالية' },
              { key: 'completed', label: 'منتهية' },
              { key: 'cancelled', label: 'ملغاة/مرفوضة' },
            ].map((t) => (
              <Button
                key={t.key}
                onClick={() => setBookingsSubTab(t.key)}
                variant={bookingsSubTab === t.key ? "contained" : "outlined"}
                size="small"
                sx={{
                  borderRadius: "999px",
                  textTransform: "none",
                  fontWeight: "700",
                  ...(bookingsSubTab === t.key
                    ? { background: "linear-gradient(135deg, #b97681, #8f5560)" }
                    : { color: "#b97681", borderColor: "#e6b9c0" }),
                }}
              >
                {t.label} ({bookings[t.key].length})
              </Button>
            ))}
          </Box>

          {bookingsLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
              <CircularProgress sx={{ color: "#b97681" }} />
            </Box>
          )}

          {!bookingsLoading && bookingsError && (
            <Typography sx={{ textAlign: "center", color: "error.main" }}>
              {bookingsError}
            </Typography>
          )}

          {!bookingsLoading && !bookingsError && bookings[bookingsSubTab].length === 0 && (
            <Typography sx={{ textAlign: "center", color: "#8a7a7a" }}>
              ما في حجوزات بهالقسم لسا
            </Typography>
          )}

          {!bookingsLoading && bookings[bookingsSubTab].length > 0 && (
            <Box sx={{ display: "flex", justifyContent: "center", gap: 3, flexWrap: "wrap" }}>
              {bookings[bookingsSubTab].map((item) => {
                const statusColors = {
                  pending: { bg: "#fff3cd", color: "#946200" },
                  approved: { bg: "#e6f4ea", color: "#256029" },
                  active: { bg: "#e6f4ea", color: "#256029" },
                  cancelled: { bg: "#fdecea", color: "#c0392b" },
                  rejected: { bg: "#fdecea", color: "#c0392b" },
                };
                const statusStyle = statusColors[item.status] || { bg: "#eee", color: "#555" };

                return (
                  <DashboardCard
                    key={item.id}
                    title={item.providerService?.service?.name || "خدمة"}
                    icon={<CalendarMonthIcon />}
                    bg="#e0f2f1"
                    color="#004d40"
                    sx={{ width: 280, position: "relative" }}
                  >
                    <Chip
                      label={item.status}
                      size="small"
                      sx={{
                        position: "absolute", top: 8, right: 8, zIndex: 2,
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.color,
                        fontWeight: "700",
                      }}
                    />
                    <Box
                      sx={{
                        height: 140,
                        backgroundImage: 'url("https://images.unsplash.com/photo-1492684223066-81342ee5ff30")',
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "16px",
                        mb: 2,
                      }}
                    />
                    <Typography variant="caption" sx={{ fontWeight: "bold", color: "#777" }}>
                      {item.event?.event_date || ""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {item.price ? `${item.price} SAR` : ""}
                    </Typography>
                  </DashboardCard>
                );
              })}
            </Box>
          )}
        </Box>
      )}

      {/*
        ⚠️ الكروت هون (Summer Festival) لسا ثابتة تماماً لتبويب "My Events"
        - محتاجين فنكشن "myServices" يلي حكينا عنها قبل شوي.
        تبويب "My Bookings" و"Favorites" هلق حقيقيين 100%.
      */}
      {tabValue === 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            flexWrap: "wrap",
            mb: 8,
            px: 2,
          }}
        >
          {[1, 2].map((i) => (
            <DashboardCard
              key={i}
              title="Summer Festival"
              icon={<CalendarMonthIcon />}
              bg="#e0f2f1"
              color="#004d40"
              sx={{ width: 280, position: "relative" }}
            >
              {/* ⚠️ زر التعديل - مؤقتاً بيستخدم id تجريبي (i) لحد ما نربط myServices الحقيقية */}
              <IconButton
                size="small"
                onClick={() => openEditModal(i)}
                sx={{
                  position: "absolute", top: 8, right: 8, zIndex: 2,
                  bgcolor: "rgba(255,255,255,0.9)",
                  "&:hover": { bgcolor: "#fff" },
                }}
              >
                <EditIcon fontSize="small" sx={{ color: "#b97681" }} />
              </IconButton>
              <Box
                sx={{
                  height: 140,
                  backgroundImage: 'url("https://images.unsplash.com/photo-1492684223066-81342ee5ff30")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "16px",
                  mb: 2,
                }}
              />
              <Typography variant="caption" sx={{ fontWeight: "bold", color: "#777" }}>
                25 MAY
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Alexandria, Egypt
              </Typography>
            </DashboardCard>
          ))}
        </Box>
      )}

      {/* تبويب المفضلة - بيانات حقيقية 100% من /api/favorites */}
      {tabValue === 2 && (
        <Box sx={{ px: 2, mb: 8 }}>
          {favoritesLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
              <CircularProgress sx={{ color: "#b97681" }} />
            </Box>
          )}

          {!favoritesLoading && favoritesError && (
            <Typography sx={{ textAlign: "center", color: "error.main" }}>
              {favoritesError}
            </Typography>
          )}

          {!favoritesLoading && !favoritesError && favorites.length === 0 && (
            <Typography sx={{ textAlign: "center", color: "#8a7a7a" }}>
              ما في خدمات مضافة للمفضلة لسا 🤍
            </Typography>
          )}

          {!favoritesLoading && favorites.length > 0 && (
            <Box sx={{ display: "flex", justifyContent: "center", gap: 3, flexWrap: "wrap" }}>
              {favorites.map((fav) => {
                const ps = fav.providerService;
                if (!ps) return null; // بعض المفضلة ممكن تشاور لخدمة محذوفة
                const firstImage = ps.images?.[0]?.image_path;
                const cityName = ps.location?.city?.name;

                return (
                  <DashboardCard
                    key={fav.id}
                    title={ps.service?.name || "خدمة"}
                    icon={<CalendarMonthIcon />}
                    bg="#fce7f0"
                    color="#8f5560"
                    sx={{ width: 280, position: "relative" }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => removeFavorite(ps.id)}
                      sx={{
                        position: "absolute", top: 8, right: 8, zIndex: 2,
                        bgcolor: "rgba(255,255,255,0.9)",
                        "&:hover": { bgcolor: "#fff" },
                      }}
                    >
                      <Typography sx={{ fontSize: 18 }}>❤️</Typography>
                    </IconButton>
                    <Box
                      sx={{
                        height: 140,
                        backgroundImage: firstImage
                          ? `url(/storage/${firstImage})`
                          : 'url("https://images.unsplash.com/photo-1492684223066-81342ee5ff30")',
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "16px",
                        mb: 2,
                      }}
                    />
                    <Typography variant="caption" sx={{ fontWeight: "bold", color: "#777" }}>
                      {ps.price ? `${ps.price} SAR` : ""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {cityName || ps.location?.address_name || ""}
                    </Typography>
                  </DashboardCard>
                );
              })}
            </Box>
          )}
        </Box>
      )}

      {/* مودال تعديل البروفايل - مرتبط فعلياً بـ updateProfile() */}
      <EditProfileModal
        open={isEditProfileOpen}
        currentUser={profile}
        onClose={() => setIsEditProfileOpen(false)}
        onUpdated={(updatedUser) => {
          setProfile(updatedUser); // نحدّث الواجهة فوراً بالبيانات الجديدة
          setIsEditProfileOpen(false);
        }}
      />

      {/* مودال تعديل الخدمة - جاهز ويشتغل مع أي id حقيقي بمجرد ما نربط myServices */}
      <EditServiceModal
        serviceId={editServiceId}
        open={editServiceId !== null}
        onClose={closeEditModal}
        onUpdated={() => {
          closeEditModal();
          // TODO: أعيدي جلب قائمة الخدمات الحقيقية هون بعد ما تبنى myServices
        }}
      />

      {/* QUICK ACTIONS */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 3, flexWrap: "wrap", px: 2 }}>
        {quickActions.map((item, index) => (
          <Box key={index} sx={{ width: 220 }}>
            <CraftCard
              title={item.title}
              desc={item.desc}
              icon={item.icon}
              onClick={() => console.log(`${item.title} clicked`)}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}