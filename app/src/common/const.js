import { notification } from "antd";

/*const routes link*/
export const routesLink = [
    {
        path: "/ocr/processes/user-verify",
        name: "",
        breadcrumb: "user-verify",
        role: "MenuMaterialOCR",
    },
    {
        path: "/ocr/processes/view-detail",
        name: "",
        breadcrumb: "view-detail",
        role: "MenuMaterialOCR",
    }
];


export const stopLoading = () => {
    document.getElementById("loading").classList.remove("loading");
}

export const startLoading = () => {
    document.getElementById("loading").classList.add("loading");
}


