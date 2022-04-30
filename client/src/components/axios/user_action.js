import axios from "axios";
import { $USER_SERVER, Auth } from "../config";

export async function registerUser(dataToSubmit) {
  return await axios
    .post(`${$USER_SERVER}/register`, dataToSubmit)
    .then((response) => response.data);
}
export async function loginUser(dataToSubmit) {
  return await axios
    .post(`${$USER_SERVER}/login`, dataToSubmit)
    .then((response) => response.data);
}
