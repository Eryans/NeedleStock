import axios from 'axios'
import { $ITEMS_SERVER, Auth } from '../config'

export async function registerItem(dataToSubmit) {
  return await axios
    .post(`${$ITEMS_SERVER}/setItem`, dataToSubmit, Auth)
    .then((response) => response.data)
}
export async function getItems() {
  return await axios
    .get(`${$ITEMS_SERVER}`, Auth)
    .then((response) => response.data)
}
export async function getSingleItem(dataToSubmit) {
  return await axios
    .post(`${$ITEMS_SERVER}/getSingleItem`,dataToSubmit, Auth)
    .then((response) => response.data)
}
