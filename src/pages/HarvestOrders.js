import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addOrder,
  updateOrder,
  removeOrder,
} from "../store/reducers/ordersReducer";

import HarvestSummary from "../components/harvest/HarvestSummary";
import OrdersSummary from "../components/harvest/OrdersSummary";
import OrderForm from "../components/harvest/OrderForm";
import OrdersTable from "../components/harvest/OrdersTable";
import StockProgressBar from "../components/harvest/StockProgressBar";
import HarvestChart from "../components/harvest/HarvestChart";

import ConfirmModal from "../components/common/ConfirmModal";
import Toast from "../components/common/Toast";

const HarvestOrders = () => {
  const dispatch = useDispatch();

  const crops = useSelector((state) => state.crops);
  const orders = useSelector((state) => state.orders);

  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type,
    });
  };

  const handleSubmit = (orderData) => {
    if (editingOrder) {
      dispatch(
        updateOrder({
          id: editingOrder.id,
          data: orderData,
        })
      );

      showToast("Order updated successfully.");
    } else {
      dispatch(addOrder(orderData));

      showToast("Order added successfully.");
    }

    setShowForm(false);
    setEditingOrder(null);
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setShowForm(true);
  };

  const handleDelete = () => {
    if (!deleteId) return;

    dispatch(removeOrder(deleteId));

    setDeleteId(null);

    showToast("Order deleted successfully.");
  };

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Harvest & Orders</h1>
          <p>
            Monitor harvest production, orders and available stock.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingOrder(null);
            setShowForm(true);
          }}
        >
          <i className="bi bi-plus-lg me-2"></i>
          New Order
        </button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-xl-4 col-md-6">
          <HarvestSummary crops={crops} />
        </div>

        <div className="col-xl-4 col-md-6">
          <OrdersSummary orders={orders} />
        </div>

        <div className="col-xl-4 col-md-12">
          <StockProgressBar crops={crops} />
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-xl-7">
          <HarvestChart
            crops={crops}
            orders={orders}
          />
        </div>

        <div className="col-xl-5">
          <div className="dashboard-card">
            <div className="card-header">
              <div>
                <h5>Order Overview</h5>
                <p>Current order status</p>
              </div>
            </div>

            <div className="order-overview">
              <div className="overview-item">
                <span className="overview-dot delivered"></span>
                <span>Delivered</span>

                <strong>
                  {
                    orders.filter(
                      (order) =>
                        order.status === "Delivered"
                    ).length
                  }
                </strong>
              </div>

              <div className="overview-item">
                <span className="overview-dot pending"></span>
                <span>Pending</span>

                <strong>
                  {
                    orders.filter(
                      (order) =>
                        order.status === "Pending"
                    ).length
                  }
                </strong>
              </div>

              <div className="overview-item">
                <span className="overview-dot cancelled"></span>
                <span>Cancelled</span>

                <strong>
                  {
                    orders.filter(
                      (order) =>
                        order.status === "Cancelled"
                    ).length
                  }
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <OrdersTable
        orders={orders}
        crops={crops}
        onEdit={handleEdit}
        onDelete={(id) => setDeleteId(id)}
      />

      {showForm && (
        <OrderForm
          order={editingOrder}
          crops={crops}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingOrder(null);
          }}
        />
      )}

      <ConfirmModal
        show={Boolean(deleteId)}
        title="Delete Order"
        message="Are you sure you want to delete this order?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() =>
          setToast((prev) => ({
            ...prev,
            show: false,
          }))
        }
      />
    </div>
  );
};

export default HarvestOrders;