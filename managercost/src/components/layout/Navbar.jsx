//סרגל כלים : מעבר בין דפים (הוספת הוצאה , דוח לפי מטבע ושנה, ברים, הגדרות (דף חיצוני לשערי מטבע)
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={{ display: "flex", gap: "12px", padding: "12px" }}>
            <Link to="/">Add Cost</Link>
            <Link to="/report">Report</Link>
            <Link to="/charts">Charts</Link>
            <Link to="/settings">Settings</Link>
        </nav>
    );
};
export default Navbar;

