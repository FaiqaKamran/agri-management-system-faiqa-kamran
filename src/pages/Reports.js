import React, {
  useMemo,
  useState,
} from "react";

import { useSelector } from "react-redux";

import ReportBuilder from "../components/reports/ReportBuilder";
import ActivityLog from "../components/reports/ActivityLog";

import {
  selectReportData,
  selectActivityLog,
} from "../store/selectors/reportSelectors";

import {
  downloadCSV,
  printReport,
} from "../utils/reportExport";

const Reports = () => {
  const crops = useSelector(
    (state) => state.crops
  );

  const orders = useSelector(
    (state) => state.orders
  );

  const expenses = useSelector(
    (state) => state.expenses
  );

  const inventory = useSelector(
    (state) => state.inventory
  );

  const reportData = useSelector(
    selectReportData
  );

  const activities = useSelector(
    selectActivityLog
  );

  const [
    selectedMonth,
    setSelectedMonth,
  ] = useState("");

  const [
    reportType,
    setReportType,
  ] = useState("complete");

  const [
    activeSection,
    setActiveSection,
  ] = useState("reports");

  const monthlyExpenses = useMemo(() => {
    if (!selectedMonth) {
      return expenses;
    }

    return expenses.filter(
      (expense) =>
        expense.date?.startsWith(
          selectedMonth
        )
    );
  }, [expenses, selectedMonth]);

  const monthlyOrders = useMemo(() => {
    if (!selectedMonth) {
      return orders;
    }

    return orders.filter(
      (order) =>
        order.orderDate?.startsWith(
          selectedMonth
        )
    );
  }, [orders, selectedMonth]);

  const monthlyExpensesTotal =
    useMemo(() => {
      return monthlyExpenses.reduce(
        (sum, expense) =>
          sum +
          Number(
            expense.amount || 0
          ),
        0
      );
    }, [monthlyExpenses]);

  const monthlyRevenue =
    useMemo(() => {
      return monthlyOrders.reduce(
        (sum, order) =>
          sum +
          Number(
            order.totalAmount ||
              order.revenue ||
              0
          ),
        0
      );
    }, [monthlyOrders]);

  const monthlyProfit =
    monthlyRevenue -
    monthlyExpensesTotal;

  const handleExportCSV = () => {
    let rows = [];

    if (reportType === "crops") {
      rows = crops.map((crop) => ({
        Crop: crop.name,
        Field: crop.field,
        Health: crop.status,
        HealthScore: crop.healthScore,
        PlantingDate:
          crop.plantingDate,
        CuttingDate:
          crop.cuttingDate,
        HarvestQuantity:
          crop.harvestQty,
        SoldQuantity:
          crop.soldQty,
      }));
    }

    if (reportType === "sales") {
      rows = monthlyOrders.map(
        (order) => ({
          Crop: order.cropName || order.cropId,
          Quantity:
            order.quantity,
          Date:
            order.orderDate,
          Status:
            order.status,
          Revenue:
            order.totalAmount ||
            order.revenue ||
            0,
        })
      );
    }

    if (reportType === "expenses") {
      rows = monthlyExpenses.map(
        (expense) => ({
          Category:
            expense.category,
          Crop:
            expense.cropName ||
            expense.cropId ||
            "General",
          Amount:
            expense.amount,
          Date:
            expense.date,
          Notes:
            expense.notes || "",
        })
      );
    }

    if (reportType === "inventory") {
      rows = inventory.map(
        (item) => ({
          Item: item.item,
          Category:
            item.category,
          Quantity:
            item.quantity,
          Unit:
            item.unit,
          MinimumQuantity:
            item.minimumQuantity,
          Supplier:
            item.supplier || "",
          PurchaseDate:
            item.purchaseDate || "",
          Status:
            Number(item.quantity || 0) <=
            Number(
              item.minimumQuantity || 0
            )
              ? "Low Stock"
              : "In Stock",
        })
      );
    }

    if (reportType === "profit") {
      rows = [
        {
          Month:
            selectedMonth || "All",
          Revenue:
            monthlyRevenue,
          Expenses:
            monthlyExpensesTotal,
          ProfitLoss:
            monthlyProfit,
        },
      ];
    }

    if (reportType === "complete") {
      rows = [
        {
          ReportMonth:
            selectedMonth || "All",
          TotalCrops:
            reportData.totalCrops,
          TotalHarvest:
            reportData.totalHarvest,
          TotalSold:
            reportData.totalSold,
          TotalOrders:
            reportData.totalOrders,
          Revenue:
            monthlyRevenue,
          Expenses:
            monthlyExpensesTotal,
          ProfitLoss:
            monthlyProfit,
        },
      ];
    }

    if (!rows.length) {
      window.alert(
        "There is no data available for this report."
      );
      return;
    }

    downloadCSV(
      rows,
      `agri-${reportType}-report.csv`
    );
  };

  const formatNumber = (value) =>
    Number(value || 0).toLocaleString(
      "en-PK"
    );

  return (
    <div className="reports-page">
      <div className="page-heading d-flex justify-content-between align-items-center report-no-print">
        <div>
          <h1>Reports</h1>

          <p>
            Review farm performance, financial data and activity.
          </p>
        </div>

        <div className="btn-group">
          <button
            type="button"
            className={`btn ${
              activeSection === "reports"
                ? "btn-success"
                : "btn-outline-success"
            }`}
            onClick={() =>
              setActiveSection("reports")
            }
          >
            <i className="bi bi-bar-chart me-1"></i>
            Reports
          </button>

          <button
            type="button"
            className={`btn ${
              activeSection === "activity"
                ? "btn-success"
                : "btn-outline-success"
            }`}
            onClick={() =>
              setActiveSection("activity")
            }
          >
            <i className="bi bi-clock-history me-1"></i>
            Activity
          </button>
        </div>
      </div>

      {activeSection === "reports" && (
        <>
          <div className="report-no-print">
            <ReportBuilder
              selectedMonth={
                selectedMonth
              }
              setSelectedMonth={
                setSelectedMonth
              }
              reportType={
                reportType
              }
              setReportType={
                setReportType
              }
              onExportCSV={
                handleExportCSV
              }
              onPrint={printReport}
            />
          </div>

          <div className="report-print-area">
            <div className="report-print-header">
              <h2>
                Agriculture Management
                System
              </h2>

              <p>
                Monthly Farm Report
              </p>

              <p>
                Period:{" "}
                {selectedMonth ||
                  "All Records"}
              </p>
            </div>

            <div className="row g-4 mb-4">
              <div className="col-xl-3 col-md-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <p className="text-muted mb-1">
                      Total Harvest
                    </p>

                    <h3 className="mb-0">
                      {formatNumber(
                        reportData.totalHarvest
                      )}{" "}
                      kg
                    </h3>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <p className="text-muted mb-1">
                      Orders
                    </p>

                    <h3 className="mb-0">
                      {
                        reportData.totalOrders
                      }
                    </h3>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <p className="text-muted mb-1">
                      Monthly Expenses
                    </p>

                    <h3 className="mb-0">
                      PKR{" "}
                      {formatNumber(
                        monthlyExpensesTotal
                      )}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <p className="text-muted mb-1">
                      Profit / Loss
                    </p>

                    <h3
                      className={
                        monthlyProfit >= 0
                          ? "mb-0 text-success"
                          : "mb-0 text-danger"
                      }
                    >
                      PKR{" "}
                      {formatNumber(
                        Math.abs(
                          monthlyProfit
                        )
                      )}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {(reportType ===
              "complete" ||
              reportType ===
                "crops") && (
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="mb-3">
                    Crop Performance
                  </h5>

                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>
                            Crop
                          </th>
                          <th>
                            Health
                          </th>
                          <th>
                            Score
                          </th>
                          <th>
                            Harvest
                          </th>
                          <th>
                            Sold
                          </th>
                          <th>
                            Remaining
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {crops.map(
                          (crop) => (
                            <tr
                              key={
                                crop.id
                              }
                            >
                              <td>
                                <strong>
                                  {
                                    crop.name
                                  }
                                </strong>
                              </td>

                              <td>
                                {
                                  crop.status
                                }
                              </td>

                              <td>
                                {
                                  crop.healthScore
                                }%
                              </td>

                              <td>
                                {formatNumber(
                                  crop.harvestQty
                                )}{" "}
                                kg
                              </td>

                              <td>
                                {formatNumber(
                                  crop.soldQty
                                )}{" "}
                                kg
                              </td>

                              <td>
                                {formatNumber(
                                  Number(
                                    crop.harvestQty ||
                                      0
                                  ) -
                                    Number(
                                      crop.soldQty ||
                                        0
                                    )
                                )}{" "}
                                kg
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {(reportType ===
              "complete" ||
              reportType ===
                "sales") && (
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="mb-3">
                    Sales & Orders
                  </h5>

                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>
                            Crop
                          </th>
                          <th>
                            Quantity
                          </th>
                          <th>
                            Date
                          </th>
                          <th>
                            Status
                          </th>
                          <th>
                            Revenue
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {monthlyOrders.map(
                          (order) => (
                            <tr
                              key={
                                order.id
                              }
                            >
                              <td>
                                {
                                  order.cropName ||
                                    order.cropId
                                }
                              </td>

                              <td>
                                {
                                  order.quantity
                                }
                              </td>

                              <td>
                                {
                                  order.orderDate
                                }
                              </td>

                              <td>
                                {
                                  order.status
                                }
                              </td>

                              <td>
                                PKR{" "}
                                {formatNumber(
                                  order.totalAmount ||
                                    order.revenue ||
                                    0
                                )}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {(reportType ===
              "complete" ||
              reportType ===
                "expenses") && (
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="mb-3">
                    Expenses
                  </h5>

                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>
                            Category
                          </th>
                          <th>
                            Crop
                          </th>
                          <th>
                            Amount
                          </th>
                          <th>
                            Date
                          </th>
                          <th>
                            Notes
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {monthlyExpenses.map(
                          (expense) => (
                            <tr
                              key={
                                expense.id
                              }
                            >
                              <td>
                                {
                                  expense.category
                                }
                              </td>

                              <td>
                                {
                                  expense.cropName ||
                                    expense.cropId ||
                                    "General"
                                }
                              </td>

                              <td>
                                PKR{" "}
                                {formatNumber(
                                  expense.amount
                                )}
                              </td>

                              <td>
                                {
                                  expense.date
                                }
                              </td>

                              <td>
                                {
                                  expense.notes ||
                                    "-"
                                }
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {(reportType ===
              "complete" ||
              reportType ===
                "inventory") && (
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="mb-3">
                    Inventory Summary
                  </h5>

                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>
                            Item
                          </th>
                          <th>
                            Category
                          </th>
                          <th>
                            Quantity
                          </th>
                          <th>
                            Minimum
                          </th>
                          <th>
                            Status
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {inventory.map(
                          (item) => {
                            const low =
                              Number(
                                item.quantity ||
                                  0
                              ) <=
                              Number(
                                item.minimumQuantity ||
                                  0
                              );

                            return (
                              <tr
                                key={
                                  item.id
                                }
                              >
                                <td>
                                  {
                                    item.item
                                  }
                                </td>

                                <td>
                                  {
                                    item.category
                                  }
                                </td>

                                <td>
                                  {
                                    item.quantity
                                  }{" "}
                                  {
                                    item.unit
                                  }
                                </td>

                                <td>
                                  {
                                    item.minimumQuantity
                                  }{" "}
                                  {
                                    item.unit
                                  }
                                </td>

                                <td>
                                  <span
                                    className={`badge ${
                                      low
                                        ? "bg-danger"
                                        : "bg-success"
                                    }`}
                                  >
                                    {low
                                      ? "Low Stock"
                                      : "In Stock"}
                                  </span>
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {(reportType ===
              "complete" ||
              reportType ===
                "profit") && (
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="mb-4">
                    Profit & Loss
                  </h5>

                  <div className="row g-4">
                    <div className="col-md-4">
                      <div className="p-3 rounded bg-light">
                        <small className="text-muted">
                          Revenue
                        </small>

                        <h4 className="text-success mb-0">
                          PKR{" "}
                          {formatNumber(
                            monthlyRevenue
                          )}
                        </h4>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="p-3 rounded bg-light">
                        <small className="text-muted">
                          Expenses
                        </small>

                        <h4 className="text-danger mb-0">
                          PKR{" "}
                          {formatNumber(
                            monthlyExpensesTotal
                          )}
                        </h4>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="p-3 rounded bg-light">
                        <small className="text-muted">
                          Net{" "}
                          {monthlyProfit >=
                          0
                            ? "Profit"
                            : "Loss"}
                        </small>

                        <h4
                          className={
                            monthlyProfit >=
                            0
                              ? "text-success mb-0"
                              : "text-danger mb-0"
                          }
                        >
                          PKR{" "}
                          {formatNumber(
                            Math.abs(
                              monthlyProfit
                            )
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {activeSection ===
        "activity" && (
        <ActivityLog
          activities={activities}
        />
      )}
    </div>
  );
};

export default Reports;