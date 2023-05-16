import { axiosClient } from '../../common/http-commons';
import Utils from '../../common/utils';

const groupsService = {
    getList: (paging) => {
        console.log(paging);
        try {
            // Get data with default
            if (!Utils.isNotNullOrUndefined(paging)) {
                return axiosClient.get(
                    process.env.REACT_APP_GET_ALL_AND_CREATE_GROUP
                );
                // Get data with parameters
            } else {
                return axiosClient.get(
                    process.env.REACT_APP_GET_ALL_AND_CREATE_GROUP,
                    { params: paging }
                );
            }
        } catch (error) {
            console.log("[Groups - Get list]", error);
        }
    },

    update: (group_code, formData) => {
        try {
            const groupData = JSON.stringify(
                {
                    group_name: formData.group_name,
                    description: formData.description
                });
            const formDataGroup = new FormData();
            formDataGroup.append("data_update", groupData);
            return axiosClient.put(process.env.REACT_APP_UPDATE_AND_DELETE_GROUP.replace('{group_code}', group_code), formDataGroup,
                { headers: { "Content-Type": "multipart/form-data" } });
        } catch (error) {
            console.log("[Group - update]", error);
        }
    },

    create: (formData) => {
        try {
            // const groupData = JSON.stringify(
            //     {
            //         group_code:"",
            //         group_name: formData.group_name,
            //         description: formData.description,
            //     });
            // const formDataGroup = new FormData();
            // formDataGroup.append("data_create", groupData);
            return axiosClient.post(process.env.REACT_APP_GET_ALL_AND_CREATE_GROUP, formData
                // { headers: { "Content-Type": "multipart/form-data" } }
                );
        } catch (error) {
            console.log("[Manager - create]", error);
        }
    },

    remove: (group_code) => {
        try {
            return axiosClient.delete(
                process.env.REACT_APP_UPDATE_AND_DELETE_GROUP.replace("{group_code}", group_code)
            )
        } catch (error) {
            console.log("GroupService || Delete || Cause by ", error)
        }
    },
}

export default groupsService;