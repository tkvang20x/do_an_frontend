import { axiosClient } from '../../common/http-commons';
import Utils from '../../common/utils';

const ManagerService = {
    getListManager: (paging) => {
        try {
            // Get data with default
            if (!Utils.isNotNullOrUndefined(paging)) {
                return axiosClient.get(
                    process.env.REACT_APP_GET_LIST_AND_CREATE_MANAGERS
                );
                // Get data with parameters
            } else {
                return axiosClient.get(
                    process.env.REACT_APP_GET_LIST_AND_CREATE_MANAGERS,
                    { params: paging }
                );
            }
        } catch (error) {
            console.log("[Manager - Get list]", error);
        }
    },

    getDetailManager: (code) => {
        try {
            // Get data with default
            return axiosClient.get(
                process.env.REACT_APP_RUD_MANAGERS.replace('{code}', code)
            );
        } catch (error) {
            console.log("[ManagerService - Get detail]", error);
        }
    },

     // ------------------------------------------------------------------------------------------------------------
     remove: (code) => {
        try {
            return axiosClient.delete(
                process.env.REACT_APP_RUD_MANAGERS.replace("{code}", code)
            )
        } catch (error) {
            console.log("ManagerService || Delete || Cause by ", error)
        }
    },

    create: (formData) => {
        console.log(formData);
        try {
            const managerData = JSON.stringify(
                {
                    name: formData.name,
                    date_of_birth: formData.date_of_birth,
                    gender: formData.gender,
                    course: formData.course,
                    university: formData.university,
                    phone: formData.phone,
                    email: formData.email,
                    user_name: formData.user_name,
                    password: formData.password,
                    role: formData.role
                });
            const formDataManager = new FormData();
            formDataManager.append("data", managerData);
            formDataManager.append("avatar", formData.avatar);
            return axiosClient.post(process.env.REACT_APP_GET_LIST_AND_CREATE_MANAGERS, formDataManager,
                { headers: { "Content-Type": "multipart/form-data" } });
        } catch (error) {
            console.log("[Manager - create]", error);
        }
    },

    update: (code, formData) => {
        try {
            const managerData = JSON.stringify(
                {
                    name: formData.name,
                    date_of_birth: formData.date_of_birth,
                    gender: formData.gender,
                    course: formData.course,
                    university: formData.university,
                    phone: formData.phone,
                    email: formData.email,
                });
            const formDataManager = new FormData();
            formDataManager.append("data_update", managerData);
            return axiosClient.put(process.env.REACT_APP_RUD_MANAGERS.replace('{code}', code), formDataManager,
                { headers: { "Content-Type": "multipart/form-data" } });
        } catch (error) {
            console.log("[Manager - update]", error);
        }
    },

    changeAvatar: (code, avatar) => {
        try {
            const imageForm = new FormData();
            imageForm.append("avatar", avatar);
            return axiosClient.put(process.env.REACT_APP_CHANGE_AVATAR_MANAGER.replace('{code}', code), imageForm,
            { headers: { "Content-Type": "multipart/form-data" } });
        } catch (error) {
            console.log("[Manager - updateAvatar]", error);
        }
    },
}

export default ManagerService;