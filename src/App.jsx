// import AddUserPage from "./components/AddUserPage";
// import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";

import Dashboard from "./Dashboard";

export default function App() {
  return (
    <div>
      <ToastContainer /> {/* Render the ToastContainer */}
      <Dashboard />
    </div>
  );
}
