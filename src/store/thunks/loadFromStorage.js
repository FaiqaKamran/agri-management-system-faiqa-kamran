import { readStorage } from "../../api/storageApi";

import { setWorkers } from "../reducers/workersReducer";
import { setAttendance } from "../reducers/attendanceReducer";
import { setEquipment } from "../reducers/equipmentReducer";
import { setMaintenance } from "../reducers/maintenanceReducer";

const loadFromStorage = () => {
  return (dispatch) => {
    // Pehle tamam data read karo
    const workers = readStorage("agri_workers", []);
    const attendance = readStorage("agri_attendance", []);
    const equipment = readStorage("agri_equipment", []);
    const maintenance = readStorage("agri_maintenance", []);

    // Phir state update karo
    dispatch(setWorkers(workers));
    dispatch(setAttendance(attendance));
    dispatch(setEquipment(equipment));
    dispatch(setMaintenance(maintenance));
  };
};

export default loadFromStorage;