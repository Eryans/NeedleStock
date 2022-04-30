export const $USER_SERVER = "http://localhost:5000/api/user";
export const $ITEMS_SERVER = "http://localhost:5000/api/item";

const user = JSON.parse(localStorage.getItem("user"))
const access_token = user.token
  ? user.token
  : null;
export const Auth = {
    headers: { Authorization: `Bearer ${access_token}` }
};
