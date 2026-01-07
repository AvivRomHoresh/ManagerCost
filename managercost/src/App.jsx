import { Routes, Route, Navigate } from "react-router-dom";
import AddCostPage from "./pages/AddCostPage.jsx";
import ReportPage from "./pages/ReportPage.jsx";
import ChartsPage from "./pages/ChartsPage.jsx";
import SettingsPage from "./pages/SettingPage.jsx";
import Navbar from "./components/layout/Navbar.jsx";
const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<AddCostPage />} />
                <Route path="/report" element={<ReportPage />} />
                <Route path="/charts" element={<ChartsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
};


export default App;
