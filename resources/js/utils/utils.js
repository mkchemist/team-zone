/** current app users */
export const user = JSON.parse(document.getElementById('user').value)
/** user token */
export const apiToken = document.getElementById('api_token').value;
/** csrf token */
export const csrfToken = document.getElementById('csrf_token').value;
/** application base api url */
export const baseApiUrl = document.getElementById('app_base_api_url').value;
/** application base uri */
export const baseUri = document.getElementById('app_base_uri').value;

/**
 * generate full url from the given url
 *
 * @param {String} url
 * @returns {String}
 */
export function url(url = "") {
  if(url.startsWith("/")) {
    url = url.substr(1);
  }
  return baseApiUrl+url;
}


