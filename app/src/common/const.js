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
