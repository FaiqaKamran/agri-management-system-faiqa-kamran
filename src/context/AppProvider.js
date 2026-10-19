import React, { useMemo } from "react";
import AppContext from "./AppContext";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  seedCrops,
  seedOrders,
  seedBuyers,
} from "../data/seedData";

const AppProvider = ({ children }) => {
  const [crops, setCrops] = useLocalStorage(
    "agri_crops",
    seedCrops
  );

  const [orders, setOrders] = useLocalStorage(
    "agri_orders",
    seedOrders
  );

  const [buyers, setBuyers] = useLocalStorage(
    "agri_buyers",
    seedBuyers
  );

// CROPS

  const addCrop = (crop) => {
    const newCrop = {
      ...crop,
      id: Date.now(),
      soldQty: 0,
    };

    setCrops((prev) => [...prev, newCrop]);
  };

  const updateCrop = (id, updatedCrop) => {
    setCrops((prev) =>
      prev.map((crop) =>
        crop.id === id
          ? { ...crop, ...updatedCrop }
          : crop
      )
    );
  };

  const deleteCrop = (id) => {
    setCrops((prev) =>
      prev.filter((crop) => crop.id !== id)
    );
  };

// ORDERS

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: Date.now(),
    };

    setOrders((prev) => [...prev, newOrder]);

    if (order.status !== "Cancelled") {
      setCrops((prev) =>
        prev.map((crop) =>
          crop.id === Number(order.cropId)
            ? {
                ...crop,
                soldQty:
                  Number(crop.soldQty || 0) +
                  Number(order.quantity || 0),
              }
            : crop
        )
      );
    }
  };

  const updateOrder = (id, updatedOrder) => {
    setOrders((prevOrders) => {
      const oldOrder = prevOrders.find(
        (order) => order.id === id
      );

      if (!oldOrder) {
        return prevOrders;
      }

      if (oldOrder.status !== "Cancelled") {
        setCrops((prevCrops) =>
          prevCrops.map((crop) =>
            crop.id === Number(oldOrder.cropId)
              ? {
                  ...crop,
                  soldQty: Math.max(
                    0,
                    Number(crop.soldQty || 0) -
                      Number(oldOrder.quantity || 0)
                  ),
                }
              : crop
          )
        );
      }

      // Add new order quantity
      if (updatedOrder.status !== "Cancelled") {
        setCrops((prevCrops) =>
          prevCrops.map((crop) =>
            crop.id === Number(updatedOrder.cropId)
              ? {
                  ...crop,
                  soldQty:
                    Number(crop.soldQty || 0) +
                    Number(updatedOrder.quantity || 0),
                }
              : crop
          )
        );
      }

      return prevOrders.map((order) =>
        order.id === id
          ? { ...order, ...updatedOrder }
          : order
      );
    });
  };

  const deleteOrder = (id) => {
    setOrders((prevOrders) => {
      const orderToDelete = prevOrders.find(
        (order) => order.id === id
      );

      if (
        orderToDelete &&
        orderToDelete.status !== "Cancelled"
      ) {
        setCrops((prevCrops) =>
          prevCrops.map((crop) =>
            crop.id === Number(orderToDelete.cropId)
              ? {
                  ...crop,
                  soldQty: Math.max(
                    0,
                    Number(crop.soldQty || 0) -
                      Number(orderToDelete.quantity || 0)
                  ),
                }
              : crop
          )
        );
      }

      return prevOrders.filter(
        (order) => order.id !== id
      );
    });
  };

// BUYERS

  const addBuyer = (buyer) => {
    const newBuyer = {
      ...buyer,
      id: Date.now(),
    };

    setBuyers((prev) => [...prev, newBuyer]);
  };

  const updateBuyer = (id, updatedBuyer) => {
    setBuyers((prev) =>
      prev.map((buyer) =>
        buyer.id === id
          ? { ...buyer, ...updatedBuyer }
          : buyer
      )
    );
  };

  const deleteBuyer = (id) => {
    setBuyers((prev) =>
      prev.filter((buyer) => buyer.id !== id)
    );
  };

// CONTEXT VALUE

  const value = useMemo(
    () => ({
      crops,
      setCrops,

      addCrop,
      updateCrop,
      deleteCrop,

      orders,
      addOrder,
      updateOrder,
      deleteOrder,

      buyers,
      addBuyer,
      updateBuyer,
      deleteBuyer,
    }),
    [crops, orders, buyers]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;