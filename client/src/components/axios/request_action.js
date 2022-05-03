import axios from "axios";
import { $REQUESTS_SERVER, Auth } from "../config";

export async function registerRequest(dataToSubmit) {
  return await axios
    .post(`${$REQUESTS_SERVER}/setRequest`, dataToSubmit, Auth)
    .then((response) => response.data);
}
export async function getGroupRequests(dataToSubmit) {
  return await axios
    .post(`${$REQUESTS_SERVER}/getGroupRequests`, dataToSubmit,Auth)
    .then((response) => response.data);
}