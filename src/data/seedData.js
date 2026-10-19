export const seedCrops = [
  {
    id: 1,
    name: "Wheat",
    field: "Field A",
    plantingDate: "2026-08-10",
    cuttingDate: "2026-11-10",
    healthScore: 92,
    status: "Healthy",
    harvestQty: 1200,
    soldQty: 450,
  },
  {
    id: 2,
    name: "Rice",
    field: "Field B",
    plantingDate: "2026-07-15",
    cuttingDate: "2026-10-25",
    healthScore: 76,
    status: "Needs Attention",
    harvestQty: 900,
    soldQty: 300,
  },
  {
    id: 3,
    name: "Cotton",
    field: "Field C",
    plantingDate: "2026-06-20",
    cuttingDate: "2026-10-20",
    healthScore: 48,
    status: "Critical",
    harvestQty: 700,
    soldQty: 200,
  },
  {
    id: 4,
    name: "Sugarcane",
    field: "Field D",
    plantingDate: "2026-05-12",
    cuttingDate: "2026-12-15",
    healthScore: 88,
    status: "Healthy",
    harvestQty: 1500,
    soldQty: 600,
  },
];

export const seedOrders = [
  {
    id: 1,
    cropId: 1,
    quantity: 200,
    orderDate: "2026-10-05",
    status: "Delivered",
  },
  {
    id: 2,
    cropId: 2,
    quantity: 150,
    orderDate: "2026-10-08",
    status: "Pending",
  },
  {
    id: 3,
    cropId: 3,
    quantity: 100,
    orderDate: "2026-10-12",
    status: "Delivered",
  },
];

export const seedBuyers = [];