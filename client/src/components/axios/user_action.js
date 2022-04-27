import axios from "axios";
import { $USER_SERVER } from "../config";

export async function registerUser(dataToSubmit){
    return await axios.post(`${$USER_SERVER}/register`, dataToSubmit).then(response => response.data)
}