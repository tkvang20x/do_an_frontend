import { openNotificationCommon } from "../../common/const";
import Utils from "../../common/utils";
import UserService from "../../redux/service/UserService";
import { UserSlice } from "../../redux/slice/UserSlice";

/**
 *[LiST] - Get list Project Action
 *
 * @param {*} dispatch
 * @param {*} params
 */
const getListUserAction = async (dispatch, paging) => {
    try {
        // get response from api
        console.log(paging);
        const response = await UserService.getListUser(paging);
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
                UserSlice.actions.loadListUserReducer(
                    listResults
                )
            );

            // dispatch paging
            dispatch(
                UserSlice.actions.setPagination({
                    page: pagingResult.page,
                    size: pagingResult.limit,
                    totalPage: pagingResult.total_page,
                    totalItem: pagingResult.total_records,
                })
            );
        } else {
            // dispath data to reducer - empty
            dispatch(
                UserSlice.actions.loadListUserReducer([])
            );
            dispatch(
                UserSlice.actions.setPagination({
                    page: 1,
                    size: paging.size,
                    totalPage: 0,
                    totalItem: 0,
                })
            );
        }
    } catch (err) {
        console.log("getListUserAction - error: ", err);
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
const updateUserFilterAction = (dispatch, filter, newFilter) => {
    // dispath data to reducer
    dispatch(
        UserSlice.actions.loadPaginationFilter(filter)
    );
};

const updateUserPagination = (dispatch, pagination) => {
    dispatch(
        UserSlice.actions.setPagination(pagination)
    );
}

const getDetailUserAction = async (dispatch, code) => {
    try {
        const response = await UserService.getDetailUser(code)
        if (
            Utils.isNotNullOrUndefined(response) &&
            Utils.isNotNullOrUndefined(response.data) &&
            Utils.isNotNullOrUndefined(response.data.data)
        ) {
            dispatch(
                UserSlice.actions.saveDetailUser(
                    response.data.data
                )
            )
        }
    } catch (error) {
        console.log("UserAction || getDetail || Cause by ", error)
    }

}

const removeUser = async (dispatch, code, filter) => {
    try {
        const response = await UserService.remove(code)
        if (response.data.status === 204){
            openNotificationCommon("success", "Thông báo", `Xóa người dùng ${code} thành công!`)
            getListUserAction(dispatch, filter)
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


const UserAction = {
    getListUserAction,
    updateUserFilterAction,
    updateUserPagination,
    getDetailUserAction,
    removeUser
}

export default UserAction;
