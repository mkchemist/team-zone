import axios from "axios";
import { baseApiUrl } from "../utils/utils";

const DEFAULT_HTTP_SERVICE_CONFIG = {
  base: "",
  headers: {},
};

/**
 * create axios instance based on
 * the given configurations
 *
 * @param {Object} config
 * @returns {Axios}
 */
export default function HttpService(config = {}) {
  /** normalize configurations */
  config = {
    ...DEFAULT_HTTP_SERVICE_CONFIG,
    ...config,
  };

  /** destruct base and headers */
  let { base, headers } = config;

  let service = axios.create();
  service.defaults.baseURL = baseApiUrl +base;
  service.defaults.headers = headers;

  return service;
}
