import {BrowserRouter,Routes,Route,} from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";
import Workers from "./pages/Workers";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Crops from "./pages/Crops";
import HarvestOrders from "./pages/HarvestOrders";
import Buyers from "./pages/Buyers";
import Tasks from "./pages/Tasks";
import Expenses from "./pages/Expenses";
import Inventory from "./pages/Inventory";
import Reports from "./pages/Reports";
import Attendance from "./pages/Attendance";
import Wages from "./pages/Wages";
import Equipment from "./pages/Equipment";
import Maintenance from "./pages/Maintenance";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/auth/ProtectedRoute";

const MainLayout = () => {
  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-area">

        <Navbar />

        <main className="page-content">

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route path="/workers" element={<Workers />} />
            <Route path="/attendance"element={<Attendance />}/>
            <Route path="/wages" element={<Wages />} />
            <Route path="/equipment"element={<Equipment />}/>
            <Route path="/maintenance"element={<Maintenance />}/>

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/crops"
              element={<Crops />}
            />

            <Route
              path="/harvest-orders"
              element={<HarvestOrders />}
            />

            <Route
              path="/buyers"
              element={<Buyers />}
            />

            <Route
              path="/tasks"
              element={<Tasks />}
            />

            <Route
              path="/expenses"
              element={<Expenses />}
            />

            <Route
              path="/inventory"
              element={<Inventory />}
            />

            <Route
              path="/reports"
              element={<Reports />}
            />

            <Route
              path="*"
              element={<NotFound />}
            />

          </Routes>

        </main>

      </div>

    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route element={<ProtectedRoute />}>

          <Route
            path="/*"
            element={<MainLayout />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
};

export default App;