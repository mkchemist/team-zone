import HttpService from "../service/http-service";
import { apiToken, csrfToken } from "../utils/utils";
import appConfig from "./config/app-config";

export default HttpService({
  base: appConfig.baseApi,
  headers: {
    'AUTHORIZATION' : `Bearer ${apiToken}`,
    'X-CSRF-TOKEN' : csrfToken
  }
});
