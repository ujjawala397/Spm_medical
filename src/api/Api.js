import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  getRequestWithHeader,
  postRequestWithHeader,
} from "./requestexecutor";

import { REGISTER, LOGIN, USER_DATA, ASSESSMENT } from "./url";

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
