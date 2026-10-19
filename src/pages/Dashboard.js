import { useContext } from "react";

import AppContext from "../context/AppContext";

import StatCard from "../components/common/StatCard";
import WeatherCard from "../components/dashboard/WeatherCard";
import HumidityGauge from "../components/dashboard/HumidityGauge";
import ForecastStrip from "../components/dashboard/ForecastStrip";
import CropHealthList from "../components/dashboard/CropHealthList";
import CropHealthChart from "../components/dashboard/CropHealthChart";
import CuttingSchedule from "../components/dashboard/CuttingSchedule";
import AlertsPanel from "../components/dashboard/AlertsPanel";

const Dashboard = () => {
  const { crops, orders, buyers } =
    useContext(AppContext);

  const totalHarvest = crops.reduce(
    (sum, crop) =>
      sum + Number(crop.harvestQty || 0),
    0
  );

  const totalSold = crops.reduce(
    (sum, crop) =>
      sum + Number(crop.soldQty || 0),
    0
  );

  const remainingStock =
    totalHarvest - totalSold;

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Dashboard</h1>
          <p>
            Monitor your farm performance,
            crops and sales.
          </p>
        </div>
      </div>

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
            title="Orders Received"
            value={orders.length}
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
            value={`${remainingStock.toLocaleString()} kg`}
            icon="bi-box-seam"
            trend={`${buyers.length} buyers`}
          />
        </div>
      </div>

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

      <div className="row g-4 mb-4">
        <div className="col-xl-5">
          <CropHealthList />
        </div>

        <div className="col-xl-7">
          <CropHealthChart />
        </div>
      </div>

      <div className="row g-4">
        <div className="col-xl-7">
          <CuttingSchedule />
        </div>

        <div className="col-xl-5">
          <AlertsPanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;