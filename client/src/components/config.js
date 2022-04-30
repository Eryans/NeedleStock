export const $USER_SERVER = "http://localhost:5000/api/user";
export const $ITEMS_SERVER = "http://localhost:5000/api/item";

const access_token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;
export const Auth = {
    headers: { Authorization: `Bearer ${access_token}` }
};
