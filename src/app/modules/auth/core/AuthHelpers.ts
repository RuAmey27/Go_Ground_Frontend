// /* eslint-disable @typescript-eslint/no-explicit-any */
// import {AuthModel} from './_models'

// //import {AuthModel} from './_models'

// //import {AuthModel} from './_models'

// // Placeholder for storing the AuthModel in memory
// let authModel: AuthModel | undefined

// const getAuth = (): AuthModel | undefined => {
//   return authModel
// }

// const setAuth = (auth: AuthModel) => {
//   authModel = auth
// }

// const removeAuth = () => {
//   authModel = undefined
// }

// export function setupAxios(axios: any) {
//   axios.defaults.headers.Accept = 'application/json'
//   axios.defaults.withCredentials = true // Enable cookies for cross-origin requests
  
//   axios.interceptors.request.use(
//     (config: any) => {
//       // No Authorization header needed; cookies will be sent automatically with requests
//       return config
//     },
//     (error: any) => Promise.reject(error)
//   )
// }

// export {getAuth, setAuth, removeAuth}

import { AuthModel } from "./_models";

// Placeholder for storing the AuthModel in memory
let authModel: AuthModel | undefined;

const getAuth = (): AuthModel | undefined => authModel;

const setAuth = (auth: AuthModel) => {
  authModel = auth;
};

const removeAuth = () => {
  authModel = undefined;
};

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = "application/json";
  axios.defaults.withCredentials = true; // Enable cookies for cross-origin requests

  axios.interceptors.request.use(
    (config: any) => config, // Cookies handle authentication automatically
    (error: any) => Promise.reject(error)
  );
}

export { getAuth, setAuth, removeAuth };
