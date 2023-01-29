import axios from "axios";

export const JSON_CONTENT_TYPE = "application/json";
export const JSON_API_CONTENT_TYPE = "application/vnd.api+json";
export const FORM_CONTENT_TYPE = "application/x-www-form-urlencoded";
export const FORM_CONTENT_MULTIPART = "multipart/form-data";
import { callbackFunc } from "../App";

const REST_BASE_URL = process.env.OCR_COORDINATOR_HOST;
const REST_BASE_URL_KEYCLOAK = process.env.REACT_APP_API_KEYCLOAK_LINK;

/**
 * HTTP REST api access
 *   contentType: accepted json/json api content type
 */
export const httpAccess = (contentType, usesrState) => {
  try {
    return axios.create({
      baseURL: REST_BASE_URL,
      timeout: 1000 * 30, // time out 30 seconds
      headers: {
        "Content-type": contentType,
        Authorization: checkToken(sessionStorage.getItem("token")) ? `Bearer ${sessionStorage.getItem("token")}`: null,
      },
    });
  } catch (error) {
    console.log("Fail", error);
    callbackFunc(error);
  }
};

const checkToken = (token) => {
  return (token == null || token.length === 0 || token === "null") ? false: true;
}

