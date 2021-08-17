import axios from "axios";
import {apiToken, baseApiUrl} from "../utils/utils"
let HttpService = axios.create({
  headers: {
    "Accept" : "application/json",
    "Authorization" : `Bearer ${apiToken}`,
    "Content-Type" : "application/json"
  },
  baseURL: baseApiUrl
})


export default HttpService
