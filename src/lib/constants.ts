/** Application-wide constants */

export const SITE_NAME = "VHP Legal Cell";
export const SITE_NAME_HI = "विधि प्रकोष्ठ";
export const SITE_URL = "https://vhplegalcell.org";

/** Role hierarchy — higher number = more access */
export const ROLES = {
  PUBLIC: 0,
  COURT_CONVENOR: 1,
  PRANT_CONVENOR: 2,
  CHETRA_CONVENOR: 3,
  NATIONAL_ADMIN: 4,
} as const;

export type RoleLevel = (typeof ROLES)[keyof typeof ROLES];
export type RoleName = keyof typeof ROLES;

export const ROLE_LABELS: Record<RoleName, { en: string; hi: string }> = {
  PUBLIC: { en: "Public", hi: "सार्वजनिक" },
  COURT_CONVENOR: { en: "Court Convenor", hi: "न्यायालय संयोजक" },
  PRANT_CONVENOR: { en: "Prant Convenor", hi: "प्रांत संयोजक" },
  CHETRA_CONVENOR: { en: "Chetra Convenor", hi: "क्षेत्र संयोजक" },
  NATIONAL_ADMIN: { en: "National Admin", hi: "राष्ट्रीय प्रशासक" },
};

/** OTP config */
export const OTP_LENGTH = 6;

/** Dashboard navigation items */
export const DASHBOARD_NAV = [
  { id: "overview", label: "Dashboard", labelHi: "डैशबोर्ड", href: "/dashboard", icon: "LayoutDashboard" },
  { id: "activities", label: "Activities", labelHi: "गतिविधियां", href: "/dashboard/activities", icon: "CalendarCheck" },
  { id: "cases", label: "Cases", labelHi: "वाद", href: "/dashboard/cases", icon: "Scale" },
  { id: "judgments", label: "Judgments", labelHi: "निर्णय", href: "/dashboard/judgments", icon: "BookOpen" },
  { id: "team", label: "Team", labelHi: "टीम", href: "/dashboard/team", icon: "Users" },
  { id: "announcements", label: "Announcements", labelHi: "घोषणाएं", href: "/dashboard/announcements", icon: "Bell" },
  { id: "settings", label: "Settings", labelHi: "सेटिंग्स", href: "/dashboard/settings", icon: "Settings" },
] as const;

/** Admin navigation items (extends dashboard) */
export const ADMIN_NAV = [
  { id: "admin-users", label: "User Management", labelHi: "उपयोगकर्ता प्रबंधन", href: "/admin/users", icon: "UserCog" },
  { id: "admin-moderation", label: "Moderation", labelHi: "मॉडरेशन", href: "/admin/moderation", icon: "ShieldCheck" },
  { id: "admin-master", label: "Master Data", labelHi: "मास्टर डेटा", href: "/admin/master-data", icon: "Database" },
  { id: "admin-analytics", label: "Analytics", labelHi: "विश्लेषण", href: "/admin/analytics", icon: "BarChart3" },
  { id: "admin-audit", label: "Audit Log", labelHi: "ऑडिट लॉग", href: "/admin/audit", icon: "ScrollText" },
  { id: "admin-reports", label: "Reports", labelHi: "रिपोर्ट", href: "/admin/reports", icon: "FileBarChart" },
] as const;

/** Activity types */
export const ACTIVITY_TYPES = [
  { value: "seminar", label: "Seminar", labelHi: "सेमिनार" },
  { value: "legal-clinic", label: "Legal Clinic", labelHi: "कानूनी क्लिनिक" },
  { value: "shiksha-varg", label: "Shiksha Varg", labelHi: "शिक्षा वर्ग" },
  { value: "rally", label: "Rally", labelHi: "रैली" },
  { value: "meeting", label: "Meeting", labelHi: "बैठक" },
  { value: "workshop", label: "Workshop", labelHi: "कार्यशाला" },
  { value: "conference", label: "Conference", labelHi: "सम्मेलन" },
  { value: "outreach", label: "Outreach", labelHi: "जन संपर्क" },
] as const;

/** Case categories */
export const CASE_CATEGORIES = [
  { value: "temple", label: "Temple Rights", labelHi: "मंदिर अधिकार" },
  { value: "cow", label: "Cow Protection", labelHi: "गो संरक्षण" },
  { value: "conversion", label: "Anti-Conversion", labelHi: "धर्मांतरण निरोध" },
  { value: "religious-freedom", label: "Religious Freedom", labelHi: "धार्मिक स्वतंत्रता" },
  { value: "waqf", label: "Waqf Act", labelHi: "वक़्फ अधिनियम" },
  { value: "ucc", label: "UCC", labelHi: "समान नागरिक संहिता" },
  { value: "other", label: "Other", labelHi: "अन्य" },
] as const;

/** Case statuses */
export const CASE_STATUSES = [
  { value: "filed", label: "Filed", labelHi: "दायर", color: "blue" },
  { value: "ongoing", label: "Ongoing", labelHi: "चालू", color: "amber" },
  { value: "won", label: "Won", labelHi: "जीत", color: "emerald" },
  { value: "lost", label: "Lost", labelHi: "हार", color: "red" },
  { value: "reserved", label: "Reserved", labelHi: "सुरक्षित", color: "purple" },
  { value: "disposed", label: "Disposed", labelHi: "निस्तारित", color: "gray" },
] as const;
