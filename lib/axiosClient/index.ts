import axios from "axios";
import axiosConfig from "./config";

const client = axios.create(axiosConfig);

export default client;
