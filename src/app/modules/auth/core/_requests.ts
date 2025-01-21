// import axios from "axios";
// import { AuthModel, UserModel } from "./_models";

// const API_URL = import.meta.env.VITE_APP_API_URL;

// export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`;
// export const LOGIN_URL = `${API_URL}/login`;
// export const REGISTER_URL = `${API_URL}/register`;
// export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`;

// // Server should return AuthModel
// export function login(email: string, password: string) {
//   return axios.post<AuthModel>(LOGIN_URL, {
//     email,
//     password,
//   });
// }

// // Server should return AuthModel
// export function register(
//   email: string,
//   firstname: string,
//   lastname: string,
//   password: string,
//   password_confirmation: string
// ) {
//   return axios.post(REGISTER_URL, {
//     email,
//     first_name: firstname,
//     last_name: lastname,
//     password,
//     password_confirmation,
//   });
// }

// // Server should return object => { result: boolean } (Is Email in DB)
// export function requestPassword(email: string) {
//   return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
//     email,
//   });
// }

// export function getUserByToken(token: string) {
//   return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
//     api_token: token,
//   });
// }
// import axios from "axios";
// import { AuthModel, UserModel } from "./_models";

// const API_URL = import.meta.env.VITE_APP_API_URL;

// export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`;
// export const LOGIN_URL = `${API_URL}/login`;
// export const REGISTER_URL = `${API_URL}/register`;
// export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`;

// // // Server should return AuthModel
// // export function login(email: string, password: string) {
// //   return axios.post<AuthModel>(LOGIN_URL, {
// //     email,
// //     password,
// //   });
// // }

// export function login(email: string, password: string) {
//   return axios.post<AuthModel>(
//     LOGIN_URL,
//     {
//       email,
//       password,
//     },
//     {
//       withCredentials: true, // Ensures session cookies are sent and received
//     }
//   );
// }

// // Server should return AuthModel
// export function register(
//   email: string,
//   firstname: string,
//   lastname: string,
//   password: string,
//   password_confirmation: string
// ) {
//   return axios.post(REGISTER_URL, {
//     email,
//     first_name: firstname,
//     last_name: lastname,
//     password,
//     password_confirmation,
//   });
// }

// // Server should return object => { result: boolean } (Is Email in DB)
// export function requestPassword(email: string) {
//   return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
//     email,
//   });
// }

// export function getUserByToken(token: string) {
//   return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
//     api_token: token,
//   });
// }

import axios from "axios";
import { UserModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const LOGIN_URL = `${API_URL}/login`;
export const REGISTER_URL = `${API_URL}/signup`;
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`;
export const GET_USER_SESSION_URL = `${API_URL}/session`;

export function login(email: string, password: string) {
  return axios.post(
    LOGIN_URL,
    {
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );
}

export function register(email: string, name: string, password: string, password_confirmation: string) {
  return axios.post(
    REGISTER_URL,
    {
      email,
      name,
      password,
      password_confirmation,
    },
    {
      withCredentials: true,
    }
  );
}

export function requestPassword(email: string) {
  return axios.post(
    REQUEST_PASSWORD_URL,
    { email },
    { withCredentials: true }
  );
}

export function getUserSession() {
  return axios.get<UserModel>(GET_USER_SESSION_URL, { withCredentials: true });
}
