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
 const getListGroupsAction = async (dispatch) => {
    try {
      // get response from api
      const response = await GroupsService.getList();
      console.log(response);
      if (
        Utils.isNotNullOrUndefined(response) &&
        Utils.isNotNullOrUndefined(response.data) &&
        Utils.isNotNullOrUndefined(response.data.data) &&
        Utils.isNotNullOrUndefined(response.data.data.result)
      ) {
        var listResults = response.data.data.result;
    
        // dispath data to reducer
        dispatch(
          GroupsSlice.actions.loadListGroupsReducer(
            listResults
          )
        );
  
      } else {
        // dispath data to reducer - empty
        dispatch(
            GroupsSlice.actions.loadListGroupsReducer([])
        );
      }
    } catch (err) {
      console.log("getListGroupsAction - error: ", err);
      openNotificationCommon("error", "Thông báo", "Đã có lỗi xảy ra!")
      return null;
    }
  };


 const GroupsAction = {
    getListGroupsAction
 } 

 export default GroupsAction;
