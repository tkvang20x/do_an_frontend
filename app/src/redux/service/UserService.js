import { axiosClient } from '../../common/http-commons';
import Utils from '../../common/utils';

const UserService = {
    getListUser: (paging) => {
        try {
            // Get data with default
            if (!Utils.isNotNullOrUndefined(paging)) {
                return axiosClient.get(
                    process.env.REACT_APP_GET_LIST_AND_CREATE_USERS
                );
                // Get data with parameters
            } else {
                return axiosClient.get(
                    process.env.REACT_APP_GET_LIST_AND_CREATE_USERS,
                    { params: paging }
                );
            }
        } catch (error) {
            console.log("[User - Get list]", error);
        }
    },

    getDetailUser: (code) => {
        try {
            // Get data with default
            return axiosClient.get(
                process.env.REACT_APP_RUD_USERS.replace('{code}', code)
            );
        } catch (error) {
            console.log("[UserService - Get detail]", error);
        }
    },

     // ------------------------------------------------------------------------------------------------------------
     remove: (code) => {
        try {
            return axiosClient.delete(
                process.env.REACT_APP_RUD_USERS.replace("{code}", code)
            )
        } catch (error) {
            console.log("UserService || Delete || Cause by ", error)
        }
    },

    create: (formData) => {
        console.log(formData);
        try {
            const user = JSON.stringify(
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
            const formDataUser = new FormData();
            formDataUser.append("data", user);
            formDataUser.append("avatar", formData.avatar);
            return axiosClient.post(process.env.REACT_APP_GET_LIST_AND_CREATE_USERS, formDataUser,
                { headers: { "Content-Type": "multipart/form-data" } });
        } catch (error) {
            console.log("[User - create]", error);
        }
    },
}

export default UserService;