import { openNotificationCommon, startLoading, stopLoading } from "../../common/const";
import Utils from "../../common/utils";
import GroupsService from "../../redux/service/GroupsService";
import { GroupsSlice } from "../../redux/slice/GroupsSlice";

/**
 *[LiST] - Get list Project Action
 *
 * @param {*} dispatch
 * @param {*} params
 */
const getListGroupsAction = async (dispatch, paging) => {
  try {
    // get response from api
    const response = await GroupsService.getList(paging);
    console.log(response);
    if (
      Utils.isNotNullOrUndefined(response) &&
      Utils.isNotNullOrUndefined(response.data) &&
      Utils.isNotNullOrUndefined(response.data.data.result) 
    ) {
      var listResults = response.data.data.result;
      var pagingResult = response.data.data.pagination;
      // dispath data to reducer
      dispatch(
        GroupsSlice.actions.loadListGroupsReducer(
          listResults
        )
      );

      // dispatch paging
      dispatch(
        GroupsSlice.actions.setPagination({
            page: pagingResult.page,
            size: pagingResult.limit,
            totalPage: pagingResult.total_page,
            totalItem: pagingResult.total_records,
        })
    );

    } else {
      // dispath data to reducer - empty
      dispatch(
        GroupsSlice.actions.loadListGroupsReducer([])
      );

      dispatch(
        GroupsSlice.actions.setPagination({
            page: 1,
            size: paging.size,
            totalPage: 0,
            totalItem: 0,
        })
    );
    }
  } catch (err) {
    console.log("getListGroupsAction - error: ", err);
    openNotificationCommon("error", "Thông báo", "Đã có lỗi xảy ra!")
    return null;
  }
};

const updateGroupAction = async (dispatch, group_code, formData, filter) => {
  try {
    const response = await GroupsService.update(group_code, formData)
    if (response.data.status === 200) {
      openNotificationCommon("success", "Thông báo", `Cập nhật thành công!`)

      getListGroupsAction(dispatch, filter);

      return true
    } else {
      openNotificationCommon("error", "Thông báo", `Cập nhật thất bại!`)
    }
    return false;
  } catch (err) {
    console.log("UpdateGroup Action - error: ", err);
    openNotificationCommon("error", "Thông báo", "Đã có lỗi xảy ra!")
    return null;
  }
}

/**
 *[LiST] - Load Filter Data
 *
 * @param {*} dispatch
 * @param {*} params
 */
 const updateGroupFilterAction = (dispatch, filter) => {
  // dispath data to reducer
  dispatch(
      GroupsSlice.actions.loadPaginationFilter(filter)
  );
};

const updateGroupPagination = (dispatch, pagination) => {
  dispatch(
    GroupsSlice.actions.setPagination(pagination)
  );
}

const createGroupAction = async (formData, dispatch, filter) => {
  try {
    const response = await GroupsService.create(
      formData
    );

    if (response.data.status === 201) {
      openNotificationCommon("success", "Thông báo", "Thêm mới thể loại thành công!")
      getListGroupsAction(dispatch, filter)
      return true
    } else {
      openNotificationCommon("error", "Thông báo", "Thêm mới thể loại thất bại!")
      return false
    }
  //   return response
  } catch (err) {
    console.log("createGroupAction - error: ", err);
    openNotificationCommon("error", "Thông báo", "Đã có lỗi xảy ra!")
    return false;
  }
};

const removeGroup = async (dispatch, group_code, filter) => {
  try {
      const response = await GroupsService.remove(group_code)
      if (response.data.status === 204){
          openNotificationCommon("success", "Thông báo", `Xóa thể loại ${group_code} thành công!`)
          getListGroupsAction(dispatch, filter)
          return true
      }else{
          openNotificationCommon("error", "Thông báo", `Xóa thể loại ${group_code} thất bại!`)
      }
      return false
  } catch (error) {
      openNotificationCommon("error", "Thông báo", `Xóa thể loại ${group_code} thất bại!`)
      console.log("GroupAction || remove || Cause by ", error)
      return false
  }
}

const GroupsAction = {
  getListGroupsAction,
  updateGroupAction,
  updateGroupFilterAction,
  updateGroupPagination,
  createGroupAction,
  removeGroup
}

export default GroupsAction;
