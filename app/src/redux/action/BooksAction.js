import { openNotificationCommon, startLoading, stopLoading } from "../../common/const";
import Utils from "../../common/utils";
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
      const response = await BooksService.getList(paging);
      console.log(response);
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
      }
    } catch (err) {
      console.log("getListBooksAction - error: ", err);
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
  const updateBooksFilterAction = (dispatch, filter, newFilter) => {
    // dispath data to reducer
    dispatch(
      BooksSlice.actions.loadPaginationFilter({
        ...filter,
        ...newFilter,
      })
    );
  };

  const updateBooksPagination = (dispatch, pagination) => {
    dispatch(
        BooksSlice.actions.setPagination(pagination)
      );
  }


 const BooksAction = {
    getListBooksAction,
    updateBooksFilterAction,
    updateBooksPagination
 } 

 export default BooksAction;
