//development
export const BASE_URL = "http://localhost:8000";

//REGISTER
export const REGISTER = BASE_URL + "/Register";

//LOGIN
export const LOGIN = BASE_URL + "/login/";

//USER DATA
export const USER_DATA = BASE_URL + "/GetAllDetail";

//Assessment
export const ASSESSMENT = BASE_URL + "/patient/selfassessment";

//Get all self Assessment
export const ALL_SELF_ASSESSMENT = BASE_URL + "/getallselfassessment";

//Get All Detail
export const GET_ALL_DATA = BASE_URL + "/patient/selfassessmentGetAllDetail";

export const GET_COUNSELLOR_PATIENTS = BASE_URL + "/counselor/addappointment/patient";

//Get list of doctors
export const GET_COUNSELLOR_DOCTORS = BASE_URL + "/counselor/listofdoctors";

//Get list of Appointments Counsellor have on selected date
export const COUNSELLOR_GET_ALL_APPOINTMENT = BASE_URL + "/counselor/details/bydate";

//Get list of Appointments Doctor have on selected date
export const DOCTOR_GET_ALL_APPOINTMENT = BASE_URL + "/doctor/details/bydate";

//Get list of Patient to be managed
export const DOCTOR_MANAGE_ASSIGNED_PATIENT = BASE_URL + "/doctor/manage/patient";

//Get list of Appointments Patient have
export const PATIENT_GET_ALL_APPOINTMENT = BASE_URL + "/patient/counsellor/getallappointment";

export const COUNSELLOR_ASSIGN_PATIENT_TO_DOCTOR = BASE_URL + "/counselor/manage/patientdoctor";
//ERROR
export const ERROR_MSG =
  "Something went wrong while fetching your information from the system. Please contact the Manager";
