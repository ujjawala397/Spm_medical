import {
  counsellorSidebarItems,
  doctorSidebarItems,
  managerSidebarItems,
  patientSidebarItems,
  pendingCounsellorSidebarItems,
  pendingDoctorSidebarItems,
} from "./sidebar-maps";

export function getItems(role, accept) {
  if (role === "patient") {
    return patientSidebarItems;
  } else if (role === "counselor" && accept == "false") {
    return pendingCounsellorSidebarItems;
  } else if (role === "counselor" && accept == "true") {
    return counsellorSidebarItems;
  } else if (role === "doctor" && accept == "true") {
    return doctorSidebarItems;
  } else if (role === "doctor" && accept == "false") {
    return pendingDoctorSidebarItems;
  } else if (role === "manager") {
    return managerSidebarItems;
  } else {
    return null;
  }
}
