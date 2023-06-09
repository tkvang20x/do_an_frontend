import { openNotificationCommon, startLoading, stopLoading } from "../../common/const";
import Utils from "../../common/utils";
import booksService from "../../redux/service/BooksService";
import BooksService from "../../redux/service/BooksService";
import { BooksSlice } from "../../redux/slice/BooksSlice";

/**
 *[LiST] - Get list Project Action
 *
 * @param {*} dispatch
 * @param {*} params
 */
const getListBooksAction = async (dispatch, paging) => {
  try {
    // get response from api
    startLoading()
    const response = await BooksService.getList(paging);
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
        BooksSlice.actions.loadListBooksReducer(
          listResults
        )
      );

      // dispatch paging
      dispatch(
        BooksSlice.actions.setPagination({
          page: pagingResult.page,
          size: pagingResult.limit,
          totalPage: pagingResult.total_page,
          totalItem: pagingResult.total_records,
        })
      );
      stopLoading()
    } else {
      // dispath data to reducer - empty
      dispatch(
        BooksSlice.actions.loadListBooksReducer([])
      );
      dispatch(
        BooksSlice.actions.setPagination({
          page: 1,
          size: paging.size,
          totalPage: 0,
          totalItem: 0,
        })
      );
      stopLoading()
    }
  } catch (err) {
    console.log("getListBooksAction - error: ", err);
    openNotificationCommon("error", "Thông báo", "Đã có lỗi xảy ra!")
    stopLoading()
    return null;
  }
};

/**
 *[LiST] - Load Filter Data
 *
 * @param {*} dispatch
 * @param {*} params
 */
const updateBooksFilterAction = (dispatch, filter, newFilter) => {
  // dispath data to reducer
  dispatch(
    BooksSlice.actions.loadPaginationFilter(filter)
  );
};

const updateBooksPagination = (dispatch, pagination) => {
  dispatch(
    BooksSlice.actions.setPagination(pagination)
  );
}

/**
 * [CREATE] - Create Project data
 * @param {*} formData
 */
export const createBooksAction = async (formData, dispatch, filter) => {
  try {
    startLoading()
    const response = await BooksService.create(
      formData
    );

    if (response.data.status === 201) {
      openNotificationCommon("success", "Thông báo", "Thêm mới sách thành công!")
      getListBooksAction(dispatch, filter)
      stopLoading()
      return true
    } else {
      stopLoading()
      openNotificationCommon("error", "Thông báo", "Thêm mới sách thất bại!")
    }
    return response
  } catch (err) {
    console.log("createBooksAction - error: ", err);
    openNotificationCommon("error", "Thông báo", "Đã có lỗi xảy ra!")
    return null;
  }
};

const getDetailBooksAction = async (dispatch, code) => {
  try {
    startLoading()
    const response = await booksService.getDetail(code)
    if (
      Utils.isNotNullOrUndefined(response) &&
      Utils.isNotNullOrUndefined(response.data) &&
      Utils.isNotNullOrUndefined(response.data.data)
    ) {
      dispatch(
        BooksSlice.actions.saveDetailBooks(
          response.data.data
        )
      )
      stopLoading()
    }
  } catch (error) {
    stopLoading()
    console.log("BooksAction || getDetail || Cause by ", error)
  };
}

const updateBooksAction = async (dispatch,code, formData) => {
  try {
    startLoading()
    const response = await booksService.updateBooks(code, formData)
    if (response.data.status === 200){
      openNotificationCommon("success", "Thông báo", `Cập nhật thành công!`)
      dispatch(
            BooksSlice.actions.saveDetailBooks(
              response.data.data
            )
      )
      stopLoading()
      return true
  }else{
    stopLoading()
      openNotificationCommon("error", "Thông báo", `Cập nhật thất bại!`)
  }
    return false;
  } catch (err) {
    console.log("UpdateBooks Action - error: ", err);
    openNotificationCommon("error", "Thông báo", "Đã có lỗi xảy ra!")
    return null;
  }
}

const removeBooks = async (dispatch, code, filter) => {
  try {
      startLoading()
      const response = await booksService.remove(code)
      if (response.data.status === 204){
          openNotificationCommon("success", "Thông báo", `Xóa sách ${code} thành công!`)
          getListBooksAction(dispatch, filter)
          stopLoading()
          return true
      }else{
        stopLoading()
          openNotificationCommon("error", "Thông báo", `Xóa sách ${code} thất bại!`)
      }
      return false
  } catch (error) {
    stopLoading()
      openNotificationCommon("error", "Thông báo", `Xóa sách ${code} thất bại!`)
      console.log("BooksAction || remove || Cause by ", error)
      return false
  }
}


const BooksAction = {
  getListBooksAction,
  updateBooksFilterAction,
  updateBooksPagination,
  createBooksAction,
  getDetailBooksAction,
  updateBooksAction,
  removeBooks
}

export default BooksAction;
