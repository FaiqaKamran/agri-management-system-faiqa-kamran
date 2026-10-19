import React from "react";

const OrdersSummary = ({ orders }) => {
  const totalQuantity = orders.reduce(
    (sum, order) =>
      sum + Number(order.quantity || 0),
    0
  );

  return (
    <div className="summary-card">
      <div className="summary-icon orders">
        <i className="bi bi-receipt"></i>
      </div>

      <div>
        <span>Total Orders</span>

        <h3>{orders.length}</h3>

        <small>
          {totalQuantity.toLocaleString()} kg
          ordered
        </small>
      </div>
    </div>
  );
};

export default OrdersSummary;