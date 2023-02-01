import axios from "axios";

export const JSON_CONTENT_TYPE = "application/json";
export const JSON_API_CONTENT_TYPE = "application/vnd.api+json";
export const FORM_CONTENT_TYPE = "application/x-www-form-urlencoded";
export const FORM_CONTENT_MULTIPART = "multipart/form-data";

const REST_BASE_URL = 'http://127.0.0.1:8000/do-an/v1';


/**
 * HTTP REST api access
 *   contentType: accepted json/json api content type
 */
export const httpAccess = (contentType) => {
  try {
    return axios.create({
      baseURL: REST_BASE_URL,
      timeout: 1000 * 30, // time out 30 seconds
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-type": contentType,
      },
    });
  } catch (error) {
    console.log("Fail", error);
    // callbackFunc(error);
  }
};

const checkToken = (token) => {
  return (token == null || token.length === 0 || token === "null") ? false: true;
}

