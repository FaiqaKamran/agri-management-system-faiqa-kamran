import React from "react";

import StatusBadge from "../common/StatusBadge";
import EmptyState from "../common/EmptyState";

import { formatDate } from "../../utils/formatters";

const OrdersTable = ({
  orders,
  crops,
  onEdit,
  onDelete,
}) => {
  const getCropName = (cropId) => {
    const crop = crops.find(
      (item) =>
        Number(item.id) === Number(cropId)
    );

    return crop ? crop.name : "Unknown Crop";
  };

  if (orders.length === 0) {
    return (
      <div className="dashboard-card">
        <EmptyState
          icon="bi-receipt"
          title="No orders found"
          message="Create your first harvest order."
        />
      </div>
    );
  }

  return (
    <div className="dashboard-card table-card">
      <div className="card-header">
        <div>
          <h5>Orders</h5>
          <p>
            {orders.length} order
            {orders.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Crop</th>
              <th>Quantity</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <strong>
                    ORD-{String(order.id).slice(-5)}
                  </strong>
                </td>

                <td>
                  <div className="table-primary">
                    <div className="table-icon">
                      <i className="bi bi-box-seam"></i>
                    </div>

                    <strong>
                      {getCropName(
                        order.cropId
                      )}
                    </strong>
                  </div>
                </td>

                <td>
                  <strong>
                    {Number(
                      order.quantity
                    ).toLocaleString()}{" "}
                    kg
                  </strong>
                </td>

                <td>
                  {formatDate(
                    order.orderDate
                  )}
                </td>

                <td>
                  <StatusBadge
                    status={order.status}
                  />
                </td>

                <td>
                  <div className="table-actions">
                    <button
                      className="action-btn edit"
                      onClick={() =>
                        onEdit(order)
                      }
                      title="Edit"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>

                    <button
                      className="action-btn delete"
                      onClick={() =>
                        onDelete(order.id)
                      }
                      title="Delete"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;