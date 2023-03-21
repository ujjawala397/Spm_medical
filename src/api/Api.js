import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  getRequestWithHeader,
  postRequestWithHeader,
  getRequestWithHeaderData,
} from "./requestexecutor";

import {
  REGISTER,
  LOGIN,
  USER_DATA,
  ASSESSMENT,
  GET_COUNSELLOR_PATIENTS,
  ALL_SELF_ASSESSMENT,
  GET_COUNSELLOR_DOCTORS,
  COUNSELLOR_GET_ALL_APPOINTMENT,
  DOCTOR_GET_ALL_APPOINTMENT,
  PATIENT_GET_ALL_APPOINTMENT,
} from "./url";

//------------------------------------------------ALL USERS---------------------------------------------------------------------------------
export async function register(
  phonenumber,
  password,
  repassword,
  firstname,
  lastname,
  email,
  birth,
  username,
  address,
  role
) {
  let responseData;
  let data = {
    phonenumber: phonenumber,
    password: password,
    repassword: repassword,
    firstname: firstname,
    lastname: lastname,
    email: email,
    birth: birth,
    username: username,
    address: address,
    role: role,
  };
  responseData = await postRequest(REGISTER, data);
  return responseData;
}

export async function assesmentSubmission({ url = ASSESSMENT, data, token }) {
  const responseData = await postRequestWithHeader(url, data, token);
  return responseData;
}

export async function getSelfAssessment({ url = ALL_SELF_ASSESSMENT, token, email }) {
  url = url + "?email=" + email;
  console.log("Request Body : " + url);
  const responseData = await getRequestWithHeaderData(url, token);
  return responseData;
}

export async function login(email, password) {
  let responseData;
  let data = {
    email: email,
    password,
  };
  responseData = await postRequest(LOGIN, data);
  return responseData;
}

export async function getUserData(token) {
  let responseData = await getRequestWithHeader(USER_DATA, token);
  return responseData;
}

export async function getCounsellorPatients(token) {
  let responseData = await getRequestWithHeader(GET_COUNSELLOR_PATIENTS, token);
  return responseData;
}

export async function putCounsellorPatients(data, token) {
  let responseData = await putRequest(GET_COUNSELLOR_PATIENTS, data, token);
  return responseData;
}

export async function getCounsellorDoctors(token) {
  let responseData = await getRequestWithHeader(GET_COUNSELLOR_DOCTORS, token);
  return responseData;
}

export async function counsellorGetAllAppointmentByDate({
  url = COUNSELLOR_GET_ALL_APPOINTMENT,
  date,
  token,
}) {
  url = url + "?appointment=" + date;
  let responseData = await getRequestWithHeaderData(url, token);
  return responseData;
}

export async function doctorGetAllAppointmentByDate({
  url = DOCTOR_GET_ALL_APPOINTMENT,
  date,
  token,
}) {
  url = url + "?appointment=" + date;
  let responseData = await getRequestWithHeaderData(url, token);
  return responseData;
}

export async function patientGetAllAppointmentByDate(token) {
  let responseData = await getRequestWithHeader(PATIENT_GET_ALL_APPOINTMENT, token);
  return responseData;
}
