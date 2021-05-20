import axios from "axios";
import { URL_BASE } from "../constants";


console.log("URL_BASE",URL_BASE);
export const Axios = axios.create({
  baseURL: URL_BASE
});