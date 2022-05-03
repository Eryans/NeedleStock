export const $USER_SERVER = "http://localhost:5000/api/user";
export const $GROUP_SERVER = "http://localhost:5000/api/group";
export const $ITEMS_SERVER = "http://localhost:5000/api/item";
export const $REQUESTS_SERVER = "http://localhost:5000/api/request";

const user = JSON.parse(localStorage.getItem("user"))
const access_token = user
  ? user.token
  : null;
export const Auth = {
    headers: { Authorization: `Bearer ${access_token}` }
};
