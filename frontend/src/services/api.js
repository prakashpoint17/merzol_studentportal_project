import axios from "axios";
import { exp } from "firebase/firestore/pipelines";


const API = axios.create({
    baseURL : "http://127.0.0.1:8000/api",
});

export default API;
