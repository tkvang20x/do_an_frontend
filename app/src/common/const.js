import {openNotification, subLoading, addLoading} from "../layout/Layout";

export const stopLoading = () => {
  subLoading()
}

export const startLoading = () => {
  addLoading()
}

export const openNotificationCommon = (type, message, description) => {
  openNotification(type, message, description)
};


const BASE_HOST_API = 'http://127.0.0.1:8000'

const ConstAPI = {
  BASE_HOST_API
}

export default ConstAPI;
