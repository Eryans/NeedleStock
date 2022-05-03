import axios from "axios";
import { $REQUEST_SERVER, Auth } from "../config";

export async function registerItem(dataToSubmit) {
  return await axios
    .post(`${$REQUEST_SERVER}/setRequest`, dataToSubmit, Auth)
    .then((response) => response.data);
}
export async function getGroupRequests() {
  return await axios
    .get(`${$REQUEST_SERVER}/getRequest`, Auth)
    .then((response) => response.data);
}