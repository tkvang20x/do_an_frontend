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
 const getListBookAction = async (dispatch,code_id ,paging) => {
    try {
      // get response from api
      const response = await BookService.getListBook(paging, code_id);
      console.log(paging);
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
    console.log(response);
      if (
          Utils.isNotNullOrUndefined(response) &&
          Utils.isNotNullOrUndefined(response.data) &&
          Utils.isNotNullOrUndefined(response.data.data) 
      ){
          dispatch(
              BookSlice.actions.saveDetailBook(
                  response.data.data
              )
          )
      }
  } catch (error) {
      console.log("BooksAction || getDetail || Cause by ", error)
  }
  
}


 const BookAction = {
    getListBookAction,
    updateBookFilterAction,
    updateBookPagination,
    getDetailBookAction
 } 

 export default BookAction;
