import React, {
  useEffect,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import StatCard from "../components/common/StatCard";
import WorkerStats from "../components/dashboard/WorkerStats";
import AttendanceChart from "../components/dashboard/AttendanceChart";
import WorkerAttendanceAlert from "../components/dashboard/WorkerAttendanceAlert";
import QuickAttendance from "../components/dashboard/QuickAttendance";
import WeatherCard from "../components/dashboard/WeatherCard";
import HumidityGauge from "../components/dashboard/HumidityGauge";
import ForecastStrip from "../components/dashboard/ForecastStrip";
import CropHealthList from "../components/dashboard/CropHealthList";
import CropHealthChart from "../components/dashboard/CropHealthChart";
import CuttingSchedule from "../components/dashboard/CuttingSchedule";
import AlertsPanel from "../components/dashboard/AlertsPanel";
import EquipmentStats from "../components/dashboard/EquipmentStats";
import EquipmentServiceSchedule from "../components/dashboard/EquipmentServiceSchedule";
import EquipmentAlerts from "../components/dashboard/EquipmentAlerts";

import {
  fetchWeather,
} from "../store/thunks/fetchWeather";

import {
  selectDashboardStats,
} from "../store/selectors/dashboardSelectors";

const Dashboard = () => {
  const dispatch = useDispatch();

  const stats = useSelector(
    selectDashboardStats
  );

  const {
    totalHarvest,
    totalSold,
    totalRevenue,
    totalExpenses,
    profitLoss,
    pendingTasks,
    inProgressTasks,
    lowStockItems,
    totalOrders,
    totalCrops,
  } = stats;

  useEffect(() => {
    dispatch(fetchWeather());

    const interval = setInterval(() => {
      dispatch(fetchWeather());
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="dashboard-page">

      <div className="page-heading">
        <div>
          <h1>Dashboard</h1>

          <p>
            Monitor your farm performance,
            crops and daily operations.
          </p>
        </div>
      </div>

      {/* MAIN STATS */}

      <div className="row g-4 mb-4">

        <div className="col-xl-3 col-md-6">
          <StatCard
            title="Total Harvest"
            value={`${totalHarvest.toLocaleString()} kg`}
            icon="bi-basket"
            trend="Farm production"
          />
        </div>

        <div className="col-xl-3 col-md-6">
          <StatCard
            title="Orders"
            value={totalOrders}
            icon="bi-receipt"
            trend="Total orders"
          />
        </div>

        <div className="col-xl-3 col-md-6">
          <StatCard
            title="Quantity Sold"
            value={`${totalSold.toLocaleString()} kg`}
            icon="bi-cart-check"
            trend="Sales completed"
          />
        </div>

        <div className="col-xl-3 col-md-6">
          <StatCard
            title="Remaining Stock"
            value={`${(
              totalHarvest - totalSold
            ).toLocaleString()} kg`}
            icon="bi-box-seam"
            trend={`${totalCrops} crops`}
          />
        </div>

      </div>

      <WorkerAttendanceAlert />

<WorkerStats />

<div className="row g-4 mb-4">
  <div className="col-lg-8">
    <AttendanceChart />
  </div>

  <div className="col-lg-4">
    <QuickAttendance />
  </div>
</div>

<EquipmentStats />

<div className="row g-4 mb-4">

  <div className="col-lg-8">
    <EquipmentServiceSchedule />
  </div>

  <div className="col-lg-4">
    <EquipmentAlerts />
  </div>

</div>

      {/* FINANCIAL STATS */}

      <div className="row g-4 mb-4">

        <div className="col-xl-3 col-md-6">
          <StatCard
            title="Revenue"
            value={`Rs. ${totalRevenue.toLocaleString()}`}
            icon="bi-cash-stack"
            trend="Sales revenue"
          />
        </div>

        <div className="col-xl-3 col-md-6">
          <StatCard
            title="Expenses"
            value={`Rs. ${totalExpenses.toLocaleString()}`}
            icon="bi-wallet2"
            trend="Farm expenses"
          />
        </div>

        <div className="col-xl-3 col-md-6">
          <StatCard
            title="Profit / Loss"
            value={`Rs. ${profitLoss.toLocaleString()}`}
            icon="bi-graph-up-arrow"
            trend={
              profitLoss >= 0
                ? "Positive balance"
                : "Loss recorded"
            }
          />
        </div>

        <div className="col-xl-3 col-md-6">
          <StatCard
            title="Low Stock"
            value={lowStockItems}
            icon="bi-exclamation-triangle"
            trend="Inventory alerts"
          />
        </div>

      </div>

      {/* WEATHER */}

      <div className="row g-4 mb-4">

        <div className="col-xl-8">
          <WeatherCard />
        </div>

        <div className="col-xl-4">
          <HumidityGauge />
        </div>

      </div>

      <div className="mb-4">
        <ForecastStrip />
      </div>

      {/* CROP HEALTH */}

      <div className="row g-4 mb-4">

        <div className="col-xl-5">
          <CropHealthList />
        </div>

        <div className="col-xl-7">
          <CropHealthChart />
        </div>

      </div>

      {/* FARM OPERATIONS */}

      <div className="row g-4">

        <div className="col-xl-5">

          <div className="dashboard-info-card">

            <div className="dashboard-info-header">
              <div>
                <h5>Farm Tasks</h5>

                <small>
                  Current operational tasks
                </small>
              </div>

              <i className="bi bi-check2-square"></i>
            </div>

            <div className="dashboard-mini-stats">

              <div>
                <strong>
                  {pendingTasks}
                </strong>

                <span>Pending</span>
              </div>

              <div>
                <strong>
                  {inProgressTasks}
                </strong>

                <span>In Progress</span>
              </div>

            </div>

          </div>

        </div>

        <div className="col-xl-7">
          <CuttingSchedule />
        </div>

      </div>

      <div className="row g-4 mt-1">

        <div className="col-xl-7">
          <AlertsPanel />
        </div>

        <div className="col-xl-5">

          <div className="dashboard-info-card">

            <div className="dashboard-info-header">

              <div>
                <h5>Inventory Status</h5>

                <small>
                  Current stock monitoring
                </small>
              </div>

              <i className="bi bi-box-seam"></i>

            </div>

            <div className="inventory-dashboard-status">

              <div className="inventory-status-icon">
                <i className="bi bi-exclamation-circle"></i>
              </div>

              <div>
                <strong>
                  {lowStockItems} low-stock items
                </strong>

                <p>
                  Review inventory and refill
                  items when required.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;