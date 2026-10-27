import React, {
  useEffect,
  useState,
} from "react";

const ReportBuilder = ({
  selectedMonth,
  setSelectedMonth,
  reportType,
  setReportType,
  onExportCSV,
  onPrint,
}) => {
  const [currentMonth, setCurrentMonth] =
    useState("");

  useEffect(() => {
    const date = new Date();

    const month =
      `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

    setCurrentMonth(month);

    if (!selectedMonth) {
      setSelectedMonth(month);
    }
  }, [selectedMonth, setSelectedMonth]);

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h5 className="mb-1">
              Report Builder
            </h5>

            <p className="text-muted small mb-0">
              Select a month and report type.
            </p>
          </div>

          <i className="bi bi-file-earmark-bar-graph fs-2 text-success"></i>
        </div>

        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">
              Report Month
            </label>

            <input
              type="month"
              className="form-control"
              value={
                selectedMonth ||
                currentMonth
              }
              onChange={(event) =>
                setSelectedMonth(
                  event.target.value
                )
              }
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">
              Report Type
            </label>

            <select
              className="form-select"
              value={reportType}
              onChange={(event) =>
                setReportType(
                  event.target.value
                )
              }
            >
              <option value="complete">
                Complete Report
              </option>

              <option value="crops">
                Crop Performance
              </option>

              <option value="sales">
                Sales & Orders
              </option>

              <option value="expenses">
                Expenses
              </option>

              <option value="profit">
                Profit & Loss
              </option>

              <option value="inventory">
                Inventory Summary
              </option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">
              Actions
            </label>

            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-success flex-fill"
                onClick={onExportCSV}
              >
                <i className="bi bi-filetype-csv me-1"></i>
                CSV
              </button>

              <button
                type="button"
                className="btn btn-outline-primary flex-fill"
                onClick={onPrint}
              >
                <i className="bi bi-printer me-1"></i>
                Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportBuilder;