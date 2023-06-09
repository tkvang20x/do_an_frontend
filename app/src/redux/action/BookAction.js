import { openNotificationCommon, startLoading, stopLoading } from "../../common/const";
import Utils from "../../common/utils";
import BookService from "../../redux/service/BookService";
import { BookSlice } from "../../redux/slice/BookSlice";

/**
 *[LiST] - Get list Project Action
 *
 * @param {*} dispatch
 * @param {*} params
 */
const getListBookAction = async (dispatch, code_books, paging) => {
  try {
    // get response from api
    const response = await BookService.getListBook(paging, code_books);
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
        BookSlice.actions.loadListBookReducer(
          listResults
        )
      );

      // dispatch paging
      dispatch(
        BookSlice.actions.setPagination({
          page: pagingResult.page,
          size: pagingResult.limit,
          totalPage: pagingResult.total_page,
          totalItem: pagingResult.total_records,
        })
      );
    } else {
      // dispath data to reducer - empty
      dispatch(
        BookSlice.actions.loadListBookReducer([])
      );
      dispatch(
        BookSlice.actions.setPagination({
          page: 1,
          size: paging.size,
          totalPage: 0,
          totalItem: 0,
        })
      );
    }
  } catch (err) {
    console.log("getListBookAction - error: ", err);
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
const updateBookFilterAction = (dispatch, filter, newFilter) => {
  // dispath data to reducer
  dispatch(
    BookSlice.actions.loadPaginationFilter(filter)
  );
};

const updateBookPagination = (dispatch, pagination) => {
  dispatch(
    BookSlice.actions.setPagination(pagination)
  );
}

const getDetailBookAction = async (dispatch, code_id) => {
  try {
    const response = await BookService.getDetailBook(code_id)
    if (
      Utils.isNotNullOrUndefined(response) &&
      Utils.isNotNullOrUndefined(response.data) &&
      Utils.isNotNullOrUndefined(response.data.data)
    ) {
      dispatch(
        BookSlice.actions.saveDetailBook(
          response.data.data
        )
      )
      return response
    }
  } catch (error) {
    console.log("BooksAction || getDetail || Cause by ", error)
  }

}

const createBookAction = async (dispatch, formCreate, filter) => {
  try {
    startLoading()
    const response = await BookService.createBook(formCreate)
    if (
      Utils.isNotNullOrUndefined(response) &&
      Utils.isNotNullOrUndefined(response.data) &&
      Utils.isNotNullOrUndefined(response.data.data)
    ) {
      getListBookAction(dispatch, formCreate.code_books, filter)
      openNotificationCommon("success", "Thông báo", "Thêm mới sách thành công!")
      stopLoading()
      return true
    }
    else {
      openNotificationCommon("error", "Thông báo", "Thêm mới sách thất bại!")
      stopLoading()
      return false
    }
  } catch (error) {
    console.log("BooksAction || getDetail || Cause by ", error)
  }

}

const removeBookAction = async (dispatch, codeBooks, code, filter) => {
  try {
    startLoading()
    const response = await BookService.deleteBook(code)
    if (response.data.status === 204) {
      openNotificationCommon("success", "Thông báo", `Xóa sách đơn ${code} thành công!`)
      getListBookAction(dispatch, codeBooks, filter)
      stopLoading()
      return true
    } else {
      stopLoading()
      openNotificationCommon("error", "Thông báo", `Xóa sách đơn ${code} thất bại!`)
    }
    return false
  } catch (error) {
    stopLoading()
    openNotificationCommon("error", "Thông báo", `Xóa sách đơn ${code} thất bại!`)
    console.log("BooksAction || remove || Cause by ", error)
    return false
  }
}

const updateBookAction = async (dispatch, code_books, code_id, formUpdate, filter) => {
  try {
    startLoading()
    const response = await BookService.updateBook(code_id, formUpdate)
    if (response.data.status === 200) {
      openNotificationCommon("success", "Thông báo", `Cập nhật thành công!`)

      getListBookAction(dispatch, code_books, filter);
      stopLoading()
      return true
    } else {
      stopLoading()
      openNotificationCommon("error", "Thông báo", `Cập nhật thất bại!`)
    }
    return false;
  } catch (err) {
    stopLoading()
    console.log("UpdateBook Action - error: ", err);
    openNotificationCommon("error", "Thông báo", "Đã có lỗi xảy ra!")
    return null;
  }
}


const BookAction = {
  getListBookAction,
  updateBookFilterAction,
  updateBookPagination,
  getDetailBookAction,
  createBookAction,
  removeBookAction,
  updateBookAction
}

export default BookAction;
