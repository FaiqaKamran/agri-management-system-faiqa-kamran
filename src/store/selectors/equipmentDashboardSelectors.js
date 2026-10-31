import { createSelector } from "@reduxjs/toolkit";

const getEquipment = (state) => state.equipment || [];
const getMaintenance = (state) => state.maintenance || [];

export const selectEquipmentDashboardStats = createSelector(
  [getEquipment],
  (equipment) => ({
    total: equipment.length,

    active: equipment.filter(
      (item) => item.status === "Active"
    ).length,

    underRepair: equipment.filter(
      (item) => item.status === "Under Repair"
    ).length,

    idle: equipment.filter(
      (item) => item.status === "Idle"
    ).length,
  })
);

export const selectEquipmentServiceSchedule =
  createSelector(
    [getEquipment, getMaintenance],
    (equipment, maintenance) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return equipment
        .map((item) => {
          const records = maintenance
            .filter(
              (record) =>
                Number(record.equipmentId) ===
                Number(item.id)
            )
            .sort(
              (a, b) =>
                new Date(b.date) - new Date(a.date)
            );

          const lastServiceDate =
            records.length > 0
              ? records[0].date
              : item.lastServiceDate;

          if (
            !lastServiceDate ||
            !item.serviceIntervalDays
          ) {
            return {
              ...item,
              nextServiceDate: null,
              daysRemaining: null,
              serviceStatus: "No Schedule",
            };
          }

          const nextDate = new Date(lastServiceDate);

          nextDate.setDate(
            nextDate.getDate() +
              Number(item.serviceIntervalDays)
          );

          nextDate.setHours(0, 0, 0, 0);

          const difference =
            nextDate.getTime() - today.getTime();

          const daysRemaining = Math.ceil(
            difference / (1000 * 60 * 60 * 24)
          );

          let serviceStatus = "OK";

          if (daysRemaining < 0) {
            serviceStatus = "Overdue";
          } else if (daysRemaining <= 7) {
            serviceStatus = "Due in 7 days";
          }

          return {
            ...item,
            lastServiceDate,
            nextServiceDate: nextDate
              .toISOString()
              .split("T")[0],
            daysRemaining,
            serviceStatus,
          };
        })
        .filter((item) => item.nextServiceDate)
        .sort(
          (a, b) =>
            new Date(a.nextServiceDate) -
            new Date(b.nextServiceDate)
        );
    }
  );

export const selectNextFiveServices = createSelector(
  [selectEquipmentServiceSchedule],
  (equipment) => equipment.slice(0, 5)
);

export const selectOverdueEquipment = createSelector(
  [selectEquipmentServiceSchedule],
  (equipment) =>
    equipment.filter(
      (item) => item.serviceStatus === "Overdue"
    )
);

export const selectDueSoonEquipment = createSelector(
  [selectEquipmentServiceSchedule],
  (equipment) =>
    equipment.filter(
      (item) => item.serviceStatus === "Due in 7 days"
    )
);

export const selectEquipmentRepairAlerts = createSelector(
  [getEquipment],
  (equipment) =>
    equipment.filter(
      (item) => item.status === "Under Repair"
    )
);