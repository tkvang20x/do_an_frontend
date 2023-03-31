import { openNotificationCommon } from "../../common/const";
import Utils from "../../common/utils";
import ManagerService from "../service/ManagerService";
import { ManagerSlice } from "../slice/ManagerSlice";

/**
 *[LiST] - Get list Project Action
 *
 * @param {*} dispatch
 * @param {*} params
 */
const getListManagerAction = async (dispatch, paging) => {
    try {
        // get response from api
        console.log(paging);
        const response = await ManagerService.getListManager(paging);
        if (
            Utils.isNotNullOrUndefined(response) &&
            Utils.isNotNullOrUndefined(response.data) &&
            Utils.isNotNullOrUndefined(response.data.data) &&
            Utils.isNotNullOrUndefined(response.data.data.result) &&
            Utils.isNotNullOrUndefined(response.data.data.pagination)
        ) {
            var listResults = response.data.data.result;
            var pagingResult = response.data.data.pagination;

            // dispath data to reducer
            dispatch(
                ManagerSlice.actions.loadListManagerReducer(
                    listResults
                )
            );

            // dispatch paging
            dispatch(
                ManagerSlice.actions.setPagination({
                    page: pagingResult.page,
                    size: pagingResult.limit,
                    totalPage: pagingResult.total_page,
                    totalItem: pagingResult.total_records,
                })
            );
        } else {
            // dispath data to reducer - empty
            dispatch(
                ManagerSlice.actions.loadListManagerReducer([])
            );
            dispatch(
                ManagerSlice.actions.setPagination({
                    page: 1,
                    size: paging.size,
                    totalPage: 0,
                    totalItem: 0,
                })
            );
        }
    } catch (err) {
        console.log("getListManagerAction - error: ", err);
        openNotificationCommon("error", "Thông báo", "Đã có lỗi xảy ra!")
        return null;
    }
};

/**
 *[LiST] - Load Filter Data
 *
 * @param {*} dispatch
 * @param {*} params
 */
const updateManagerFilterAction = (dispatch, filter, newFilter) => {
    // dispath data to reducer
    dispatch(
        ManagerSlice.actions.loadPaginationFilter(filter)
    );
};

const updateManagerPagination = (dispatch, pagination) => {
    dispatch(
        ManagerSlice.actions.setPagination(pagination)
    );
}

const getDetailManagerAction = async (dispatch, code) => {
    try {
        const response = await ManagerService.getDetailManager(code)
        if (
            Utils.isNotNullOrUndefined(response) &&
            Utils.isNotNullOrUndefined(response.data) &&
            Utils.isNotNullOrUndefined(response.data.data)
        ) {
            dispatch(
                ManagerSlice.actions.saveDetailManager(
                    response.data.data
                )
            )

            return response.data.data
        }
    } catch (error) {
        console.log("ManagerAction || getDetail || Cause by ", error)
    }

}

const removeManager = async (dispatch, code, filter) => {
    try {
        const response = await ManagerService.remove(code)
        if (response.data.status === 204){
            openNotificationCommon("success", "Thông báo", `Xóa người dùng ${code} thành công!`)
            getListManagerAction(dispatch, filter)
            return true
        }else{
            openNotificationCommon("error", "Thông báo", `Xóa người dùng ${code} thất bại!`)
        }
        return false
    } catch (error) {
        openNotificationCommon("error", "Thông báo", `Xóa người ${code} thất bại!`)
        console.log("BooksAction || remove || Cause by ", error)
        return false
    }
  }

  export const createManagerAction = async (formData, dispatch, filter) => {
    try {
      const response = await ManagerService.create(
        formData
      );
  
      if (response.data.status === 201) {
        openNotificationCommon("success", "Thông báo", "Thêm mới người quản lý thành công!")
        getListManagerAction(dispatch, filter)
        return true
      } else {
        openNotificationCommon("error", "Thông báo", "Thêm mới quản lý thất bại!")
        return false
      }
    //   return response
    } catch (err) {
      console.log("createManagerAction - error: ", err);
      openNotificationCommon("error", "Thông báo", "Đã có lỗi xảy ra!")
      return null;
    }
  };

  const updateManagerAction = async (dispatch,code, formData) => {
    try {
      const response = await ManagerService.uodate(code, formData)
      if (response.data.status === 200){
        openNotificationCommon("success", "Thông báo", `Cập nhật thành công!`)
        dispatch(
              ManagerSlice.actions.saveDetailManager(
                response.data.data
              )
        )
        return true
    }else{
        openNotificationCommon("error", "Thông báo", `Cập nhật thất bại!`)
    }
      return false;
    } catch (err) {
      console.log("UpdateManager Action - error: ", err);
      openNotificationCommon("error", "Thông báo", "Đã có lỗi xảy ra!")
      return null;
    }
  }


const ManagerAction = {
    getListManagerAction,
    updateManagerFilterAction,
    updateManagerPagination,
    getDetailManagerAction,
    removeManager,
    createManagerAction,
    updateManagerAction
}

export default ManagerAction;
