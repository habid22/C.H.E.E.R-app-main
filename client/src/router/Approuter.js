import { createBrowserRouter, createRoutesFromElements } from "react-router-dom";

//page imports
import HomePage from "../components/LandingPage/homePage";
import LoginPage from "../components/Login/newLogin";
import About from "../components/About/about";
import Dashboard from "../components/Dashboard/dashboard";
import Register from "../components/Register/register";
import CalendarEvents from "../components/Calendar/CalendarEvents";
import Layout from "../components/Layout/Layout";
import Settings from "../components/Settings/Settings";
import Profile from "../components/Profile/Profile";
import Admin from "../components/Admin Portal/Admin";
// import Groups from "../components/Sidebar/Groups/groups";
import NewsletterSignup from "../components/Newsletter/newsletter";
import ChakraGallery from "./CharkraRouters";
import TextEditor from "../components/Formbuilder/formbuilder";
import  ReportPage from "../components/ClockingReports/ReportGenerator";



//rout defentions
export const ROOT = "/";
export const PROTECTED = "/protected"

export const LOGIN = "/login";
export const ABOUT = "/about";
export const REGISTER = "/register";
export const TTS = "/tts";
export const DASHBOARD = "/protected/dashboard";
export const CALENDAR = "/protected/event_calendar";
export const SETTINGS = "/protected/settings";
export const PROFILE = "/protected/profile";
export const ADMIN = "/protected/admin";

// export const GROUPS = "/protected/groups";
export const NEWSLETTER = "/newsletter";
export const FORMBUILDER = "/formbuilder";

export const Gallary = "/protected/Gallary";
export const REPORTS = "/protected/reports";




export const router = createBrowserRouter([
    { path: ROOT, element: <HomePage /> },
    { path: NEWSLETTER, element: <NewsletterSignup/>},
    { path: FORMBUILDER, element: <TextEditor/>},
    { path: LOGIN, element: <LoginPage /> },
    { path: ABOUT, element: <About /> },
    { path: REGISTER, element: <Register /> },
    { path: PROTECTED, element: <Layout />, children: [
        { path: DASHBOARD, element: <Dashboard /> },
        { path: CALENDAR, element: <CalendarEvents /> },
        { path: SETTINGS, element: <Settings /> }, // Add this line for Settings
        { path: PROFILE, element: <Profile /> }, // Add this line for Profile
        { path: ADMIN, element: <Admin /> }, // Add this line for Admin
        // { path: GROUPS, element: <Groups />},
        { path: Gallary, element: <ChakraGallery />},
        { path: REPORTS, element: <ReportPage />},
    ]}
]);

