import axios from 'axios'
import { $GROUP_SERVER, Auth } from '../config'

export async function registerGroup(dataToSubmit) {
  return await axios
    .post(`${$GROUP_SERVER}/register`, dataToSubmit, Auth)
    .then((response) => response.data)
}
export async function getUserGroup(dataToSubmit) {
  return await axios
    .post(`${$GROUP_SERVER}/findGroups`, dataToSubmit, Auth)
    .then((response) => response.data)
}
export async function setGroup(dataToSubmit) {
  return await axios
    .post(`${$GROUP_SERVER}/setGroup`, dataToSubmit, Auth)
    .then((response) => response.data)
}
export async function getSingleGroup(dataToSubmit) {
  return await axios
    .post(`${$GROUP_SERVER}/getSingleGroup`, dataToSubmit, Auth)
    .then((response) => response.data)
}
export async function updateGroup(dataToSubmit) {
  return await axios
    .put(`${$GROUP_SERVER}/getSingleGroup`, dataToSubmit, Auth)
    .then((response) => response.data)
}
export async function updateGroupitems(dataToSubmit) {
  return await axios
    .put(`${$GROUP_SERVER}/updateGroupItems`, dataToSubmit, Auth)
    .then((response) => response.data)
}
