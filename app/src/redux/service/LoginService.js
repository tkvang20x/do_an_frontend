import { axiosClient, httpAccess, JSON_CONTENT_TYPE } from "../../common/http-commons";
import Utils from "../../common/utils";
import CommonService from "./commonService";

const login = async (dataLogin) => {
    var loginResponse = null;
    try {
        const loginPath = process.env.REACT_APP_LOGIN_MANAGER_PATH;
        loginResponse = await httpAccess(JSON_CONTENT_TYPE).post(
            loginPath, JSON.stringify(dataLogin));
        return loginResponse;
    } catch (error) {
        console.log("[Login]- Fail", error);
        return CommonService.errorServiceHandle(error);
    }

}

const changePassword = async (dataPassChange) => {
    try {
        const dataPassword = {
            oldpass: dataPassChange.oldpass,
            newpass: dataPassChange.newpass
        }

        return axiosClient.put(process.env.REACT_APP_CHANGE_PASSWORD_PATH, dataPassword);
    } catch (error) {
        console.log("[Manager - ChangePassword]", error);
    }
}

const forgetPassword = async (email, role) => {
    try {
        // const dataPassword = {
        //     oldpass: dataPassChange.oldpass,
        //     newpass: dataPassChange.newpass
        // }

        return axiosClient.put(process.env.REACT_APP_FORGOT_PASSWORD_PATH.replace("{role}", role) ,email);
    } catch (error) {
        console.log("[Manager - ChangePassword]", error);
    }
}

const LoginService = {
    login,
    changePassword,
    forgetPassword
}

export default LoginService;