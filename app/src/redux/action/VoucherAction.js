import { openNotificationCommon, startLoading, stopLoading } from "../../common/const";
import Utils from "../../common/utils";
import VoucherService from "../service/VoucherService";
import { VoucherSlice } from "../slice/VoucherSlice";

/**
 *[LiST] - Get list Project Action
 *
 * @param {*} dispatch
 * @param {*} params
 */
const getListVoucherAction = async (dispatch, paging) => {
  try {
    // get response from api
    const response = await VoucherService.getList(paging);
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
        VoucherSlice.actions.loadListVoucherReducer(
          listResults
        )
      );

      // dispatch paging
      dispatch(
        VoucherSlice.actions.setPagination({
          page: pagingResult.page,
          size: pagingResult.limit,
          totalPage: pagingResult.total_page,
          totalItem: pagingResult.total_records,
        })
      );
    } else {
      // dispath data to reducer - empty
      dispatch(
        VoucherSlice.actions.loadListVoucherReducer([])
      );
      dispatch(
        VoucherSlice.actions.setPagination({
          page: 1,
          size: paging.size,
          totalPage: 0,
          totalItem: 0,
        })
      );
    }
  } catch (err) {
    console.log("getListVoucherAction - error: ", err);
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
const updateVoucherFilterAction = (dispatch, filter, newFilter) => {
  // dispath data to reducer
  dispatch(
    VoucherSlice.actions.loadPaginationFilter(filter)
  );
};

const updateVoucherPagination = (dispatch, pagination) => {
  dispatch(
    VoucherSlice.actions.setPagination(pagination)
  );
}

const createVoucherAction = async (formData, dispatch, filter) => {
  try {
    const response = await VoucherService.create(
      formData
    );

    if (response.data.status === 201) {
      openNotificationCommon("success", "Thông báo", "Thêm mới phiếu mượn thành công!")
      getListVoucherAction(dispatch, filter)
      return true
    } else {
      openNotificationCommon("error", "Thông báo", "Thêm mới phiếu mượn thất bại!")
    }
    return response
  } catch (err) {
    console.log("createVoucherAction - error: ", err);
    openNotificationCommon("error", "Thông báo", "Đã có lỗi xảy ra!")
    return null;
  }
}

const VoucherAction = {
  getListVoucherAction,
  updateVoucherFilterAction,
  updateVoucherPagination,
  createVoucherAction
} 

export default VoucherAction;