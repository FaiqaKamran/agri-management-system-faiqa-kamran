import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectWorkersForWages,
  selectTotalWagesPayable,
} from "../store/selectors/wageSelectors";

import {
  addExpense,
} from "../store/reducers/expensesReducer";

const Wages = () => {
  const dispatch = useDispatch();

  const workers = useSelector(
    (state) => state.workers || []
  );

  const attendance = useSelector(
    (state) => state.attendance || []
  );

  const expenses = useSelector(
    (state) => state.expenses || []
  );

  const wageWorkers = useSelector(
    selectWorkersForWages
  );

  const totalWages = useSelector(
    selectTotalWagesPayable
  );

  const [selectedMonth, setSelectedMonth] =
    useState(
      new Date().toISOString().slice(0, 7)
    );

  const [search, setSearch] = useState("");

  const monthWageWorkers = useMemo(() => {
    return workers.map((worker) => {
      const workerAttendance =
        attendance.filter(
          (item) =>
            Number(item.workerId) ===
              Number(worker.id) &&
            item.date.startsWith(selectedMonth)
        );

      const presentDays =
        workerAttendance.filter(
          (item) => item.status === "Present"
        ).length;

      const halfDays =
        workerAttendance.filter(
          (item) => item.status === "Half-day"
        ).length;

      const absentDays =
        workerAttendance.filter(
          (item) => item.status === "Absent"
        ).length;

      const leaveDays =
        workerAttendance.filter(
          (item) => item.status === "Leave"
        ).length;

      const payableDays =
        presentDays + halfDays * 0.5;

      const wage =
        payableDays *
        Number(worker.dailyWage || 0);

      return {
        ...worker,
        presentDays,
        halfDays,
        absentDays,
        leaveDays,
        payableDays,
        wage,
      };
    });
  }, [
    workers,
    attendance,
    selectedMonth,
  ]);

  const filteredWorkers =
    monthWageWorkers.filter((worker) =>
      worker.fullName
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  const monthTotal = monthWageWorkers.reduce(
    (total, worker) =>
      total + Number(worker.wage || 0),
    0
  );

  const paidWorkerIds = useMemo(() => {
    return expenses
      .filter(
        (expense) =>
          expense.category === "Labor" &&
          expense.wageMonth === selectedMonth
      )
      .map((expense) => expense.workerId);
  }, [expenses, selectedMonth]);

  const isPaid = (workerId) => {
    return paidWorkerIds.includes(workerId);
  };

  const handlePayWage = (worker) => {
    if (worker.wage <= 0) {
      window.alert(
        "There is no payable wage for this worker."
      );
      return;
    }

    if (isPaid(worker.id)) {
      window.alert(
        "Wages for this worker have already been paid for this month."
      );
      return;
    }

    const confirmed = window.confirm(
      `Pay Rs. ${worker.wage.toLocaleString()} to ${worker.fullName}?`
    );

    if (!confirmed) {
      return;
    }

    dispatch(
      addExpense({
        title: `Labour wages - ${worker.fullName}`,
        category: "Labor",
        amount: worker.wage,
        date: new Date().toISOString().split("T")[0],
        description: `Monthly wages for ${selectedMonth}`,
        workerId: worker.id,
        wageMonth: selectedMonth,
      })
    );

    window.alert(
      `Wages of Rs. ${worker.wage.toLocaleString()} recorded successfully.`
    );
  };

  const handlePayAll = () => {
    const unpaidWorkers =
      monthWageWorkers.filter(
        (worker) =>
          worker.wage > 0 &&
          !isPaid(worker.id)
      );

    if (unpaidWorkers.length === 0) {
      window.alert(
        "There are no unpaid wages for this month."
      );
      return;
    }

    const total = unpaidWorkers.reduce(
      (sum, worker) =>
        sum + Number(worker.wage || 0),
      0
    );

    const confirmed = window.confirm(
      `Pay total wages of Rs. ${total.toLocaleString()} to ${unpaidWorkers.length} workers?`
    );

    if (!confirmed) {
      return;
    }

    unpaidWorkers.forEach((worker) => {
      dispatch(
        addExpense({
          title: `Labour wages - ${worker.fullName}`,
          category: "Labor",
          amount: worker.wage,
          date: new Date()
            .toISOString()
            .split("T")[0],
          description: `Monthly wages for ${selectedMonth}`,
          workerId: worker.id,
          wageMonth: selectedMonth,
        })
      );
    });

    window.alert(
      `Total wages of Rs. ${total.toLocaleString()} recorded successfully.`
    );
  };

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Wage Calculation</h1>

          <p>
            Calculate and record monthly worker wages.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-success"
          onClick={handlePayAll}
        >
          <i className="bi bi-cash-stack me-2"></i>
          Pay All Wages
        </button>
      </div>

      <div className="row g-4 mb-4">

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-1">
                Total Wages
              </p>

              <h3 className="mb-0">
                Rs.{" "}
                {monthTotal.toLocaleString()}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-1">
                Workers with Wages
              </p>

              <h3 className="mb-0">
                {
                  monthWageWorkers.filter(
                    (worker) => worker.wage > 0
                  ).length
                }
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-1">
                Calculation
              </p>

              <h6 className="mb-0">
                Present + Half-day × 0.5
              </h6>

              <small className="text-muted">
                multiplied by daily wage
              </small>
            </div>
          </div>
        </div>

      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">

          <div className="row g-3 align-items-end">

            <div className="col-md-4">
              <label className="form-label">
                Wage Month
              </label>

              <input
                type="month"
                className="form-control"
                value={selectedMonth}
                onChange={(event) =>
                  setSelectedMonth(
                    event.target.value
                  )
                }
              />
            </div>

            <div className="col-md-5">
              <label className="form-label">
                Search Worker
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Search worker..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>

          </div>

        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">

          <div className="table-responsive">
            <table className="table align-middle mb-0">

              <thead>
                <tr>
                  <th>Worker</th>
                  <th>Daily Wage</th>
                  <th>Present</th>
                  <th>Half-day</th>
                  <th>Absent</th>
                  <th>Payable Days</th>
                  <th>Wage</th>
                  <th>Status</th>
                  <th className="text-end">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredWorkers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="9"
                      className="text-center py-5 text-muted"
                    >
                      No workers found.
                    </td>
                  </tr>
                ) : (
                  filteredWorkers.map(
                    (worker) => (
                      <tr key={worker.id}>

                        <td>
                          <strong>
                            {worker.fullName}
                          </strong>
                        </td>

                        <td>
                          Rs.{" "}
                          {Number(
                            worker.dailyWage || 0
                          ).toLocaleString()}
                        </td>

                        <td>
                          <span className="badge bg-success">
                            {worker.presentDays}
                          </span>
                        </td>

                        <td>
                          <span className="badge bg-warning text-dark">
                            {worker.halfDays}
                          </span>
                        </td>

                        <td>
                          <span className="badge bg-danger">
                            {worker.absentDays}
                          </span>
                        </td>

                        <td>
                          {worker.payableDays}
                        </td>

                        <td>
                          <strong>
                            Rs.{" "}
                            {Number(
                              worker.wage || 0
                            ).toLocaleString()}
                          </strong>
                        </td>

                        <td>
                          {isPaid(worker.id) ? (
                            <span className="badge bg-success">
                              Paid
                            </span>
                          ) : (
                            <span className="badge bg-warning text-dark">
                              Unpaid
                            </span>
                          )}
                        </td>

                        <td className="text-end">
                          <button
                            type="button"
                            className="btn btn-sm btn-success"
                            disabled={
                              worker.wage <= 0 ||
                              isPaid(worker.id)
                            }
                            onClick={() =>
                              handlePayWage(
                                worker
                              )
                            }
                          >
                            <i className="bi bi-cash me-1"></i>
                            Pay
                          </button>
                        </td>

                      </tr>
                    )
                  )
                )}
              </tbody>

            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Wages;