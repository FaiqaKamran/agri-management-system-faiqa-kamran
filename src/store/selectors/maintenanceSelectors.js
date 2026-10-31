import { createSelector } from "@reduxjs/toolkit";

const getMaintenance = (state) => state.maintenance || [];
const getEquipment = (state) => state.equipment || [];

export const selectMaintenance = createSelector(
  [getMaintenance],
  (maintenance) => maintenance
);

export const selectMaintenanceWithEquipment = createSelector(
  [getMaintenance, getEquipment],
  (maintenance, equipment) => {
    return maintenance.map((record) => {
      const machine = equipment.find(
        (item) =>
          Number(item.id) === Number(record.equipmentId)
      );

      return {
        ...record,
        equipmentName: machine?.name || "Unknown Equipment",
        equipmentType: machine?.type || "-",
      };
    });
  }
);

export const selectTotalMaintenanceCost = createSelector(
  [getMaintenance],
  (maintenance) =>
    maintenance.reduce(
      (total, record) =>
        total + Number(record.cost || 0),
      0
    )
);

export const selectMaintenanceCostByEquipment =
  createSelector(
    [getMaintenance, getEquipment],
    (maintenance, equipment) => {
      return equipment.map((machine) => {
        const records = maintenance.filter(
          (record) =>
            Number(record.equipmentId) ===
            Number(machine.id)
        );

        const totalCost = records.reduce(
          (total, record) =>
            total + Number(record.cost || 0),
          0
        );

        return {
          ...machine,
          maintenanceCount: records.length,
          totalMaintenanceCost: totalCost,
        };
      });
    }
  );