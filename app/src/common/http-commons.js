import axios from "axios";

export const JSON_CONTENT_TYPE = "application/json";
export const JSON_API_CONTENT_TYPE = "application/vnd.api+json";
export const FORM_CONTENT_TYPE = "application/x-www-form-urlencoded";
export const FORM_CONTENT_MULTIPART = "multipart/form-data";

/**
 * HTTP REST api access
 *   contentType: accepted json/json api content type
 */
export const httpAccess = (contentType) => {
  try {
    return axios.create({
      baseURL: process.env.REACT_APP_REST_BASE_URL,
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



const axiosClient = axios.create({
  baseURL:  process.env.REACT_APP_REST_BASE_URL
})

axiosClient.interceptors.request.use(async (config) => {
  config.headers.Authorization = localStorage.getItem("token")? `Bearer ${localStorage.getItem("token")}`: null;
  return config
})

axiosClient.defaults.headers= {
  'Content-Type': 'application/json'
}

axiosClient.interceptors.response.use((response) => {
  if (response && response.data){
      return response
  }
  return null
}, (error) => {
  throw error;
})


export {axiosClient}