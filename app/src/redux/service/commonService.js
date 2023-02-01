import {openNotification} from "../../layout/Layout"

/**
 * Service error handle
 * @param {*} err
 * @returns
 */
const errorServiceHandle = (err) => {
  openNotification("error", "Thông báo", "Đã có lỗi xảy ra!")
  if (err == null || err === undefined) {
    return { data: { status: 500 } };
  }
  var errorData = JSON.stringify(err);
  errorData = JSON.parse(errorData);

  return { data: { status: errorData["status"] } };
};

const CommonService = {
  errorServiceHandle,
};

export default CommonService;
