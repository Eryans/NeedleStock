export const $USER_SERVER = "http://localhost:5000/api/user";
const access_token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;
export const HEADERS = {
  Authorization: `token ${access_token}`,
};
