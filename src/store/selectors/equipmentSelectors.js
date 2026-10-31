import { createSelector } from "@reduxjs/toolkit";

const getEquipment = (state) => state.equipment || [];
const getMaintenance = (state) => state.maintenance || [];

// =====================================================
// All Equipment
// =====================================================

export const selectEquipment = createSelector(
  [getEquipment],
  (equipment) => equipment
);

// =====================================================
// Equipment by Status
// =====================================================

export const selectActiveEquipment = createSelector(
  [getEquipment],
  (equipment) =>
    equipment.filter(
      (item) => item.status === "Active"
    )
);

export const selectEquipmentUnderRepair =
  createSelector(
    [getEquipment],
    (equipment) =>
      equipment.filter(
        (item) => item.status === "Under Repair"
      )
  );

export const selectIdleEquipment = createSelector(
  [getEquipment],
  (equipment) =>
    equipment.filter(
      (item) => item.status === "Idle"
    )
);

// =====================================================
// Equipment Count
// =====================================================

export const selectEquipmentCount = createSelector(
  [getEquipment],
  (equipment) => equipment.length
);

// =====================================================
// Equipment + Service Information
// =====================================================

export const selectEquipmentWithServiceInfo =
  createSelector(
    [getEquipment, getMaintenance],
    (equipment, maintenance) => {
      return equipment.map((item) => {

        // Find maintenance records for this equipment
        const serviceRecords = maintenance
          .filter(
            (record) =>
              Number(record.equipmentId) ===
              Number(item.id)
          )
          .sort((a, b) => {
            return (
              new Date(b.date) -
              new Date(a.date)
            );
          });

        // Latest service date
        let lastServiceDate =
          item.lastServiceDate || null;

        if (serviceRecords.length > 0) {
          lastServiceDate =
            serviceRecords[0].date;
        }

        // Calculate next service date
        let nextServiceDate = null;

        if (
          lastServiceDate &&
          item.serviceIntervalDays
        ) {
          const date = new Date(
            lastServiceDate
          );

          date.setDate(
            date.getDate() +
              Number(
                item.serviceIntervalDays
              )
          );

          nextServiceDate = date
            .toISOString()
            .split("T")[0];
        }

        // Calculate service status
        let serviceStatus = "No Schedule";
        let daysRemaining = null;

        if (nextServiceDate) {
          const today = new Date();

          today.setHours(0, 0, 0, 0);

          const serviceDate = new Date(
            nextServiceDate
          );

          serviceDate.setHours(0, 0, 0, 0);

          const difference =
            serviceDate.getTime() -
            today.getTime();

          daysRemaining = Math.ceil(
            difference /
              (1000 * 60 * 60 * 24)
          );

          if (daysRemaining < 0) {
            serviceStatus = "Overdue";
          } else if (daysRemaining <= 7) {
            serviceStatus = "Due in 7 days";
          } else {
            serviceStatus = "OK";
          }
        }

        return {
          ...item,
          lastServiceDate,
          nextServiceDate,
          serviceStatus,
          daysRemaining,
        };
      });
    }
  );

// =====================================================
// Equipment Sorted by Next Service Date
// =====================================================

export const selectEquipmentSortedByServiceDate =
  createSelector(
    [selectEquipmentWithServiceInfo],
    (equipment) => {
      return [...equipment].sort(
        (a, b) => {

          // Equipment without a schedule goes last
          if (
            !a.nextServiceDate &&
            !b.nextServiceDate
          ) {
            return 0;
          }

          if (!a.nextServiceDate) {
            return 1;
          }

          if (!b.nextServiceDate) {
            return -1;
          }

          return (
            new Date(a.nextServiceDate) -
            new Date(b.nextServiceDate)
          );
        }
      );
    }
  );

// =====================================================
// Next 5 Services
// =====================================================

export const selectNextServices = createSelector(
  [selectEquipmentSortedByServiceDate],
  (equipment) => {
    return equipment
      .filter(
        (item) => item.nextServiceDate
      )
      .slice(0, 5);
  }
);

// =====================================================
// Overdue Equipment
// =====================================================

export const selectOverdueEquipment =
  createSelector(
    [selectEquipmentWithServiceInfo],
    (equipment) =>
      equipment.filter(
        (item) =>
          item.serviceStatus ===
          "Overdue"
      )
  );

// =====================================================
// Equipment Due Within 7 Days
// =====================================================

export const selectDueSoonEquipment =
  createSelector(
    [selectEquipmentWithServiceInfo],
    (equipment) =>
      equipment.filter(
        (item) =>
          item.serviceStatus ===
          "Due in 7 days"
      )
  );

// =====================================================
// Equipment With No Service Schedule
// =====================================================

export const selectEquipmentWithoutSchedule =
  createSelector(
    [selectEquipmentWithServiceInfo],
    (equipment) =>
      equipment.filter(
        (item) =>
          !item.nextServiceDate
      )
  );