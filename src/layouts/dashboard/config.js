import {
  counsellorSidebarItems,
  doctorSidebarItems,
  managerSidebarItems,
  patientSidebarItems,
} from "./sidebar-maps";

export function getItems(role) {
  if (role === "patient") {
    return patientSidebarItems;
  } else if (role === "counsellor") {
    return counsellorSidebarItems;
  } else if (role === "doctor") {
    return doctorSidebarItems;
  } else if (role === "manager") {
    return managerSidebarItems;
  }
}
