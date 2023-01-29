import React from "react";
import ImageProcessOcr from "../pages/images-process-ocr/ImageProcessOcr";

function ContentCommon({ id }) {
    let compo;
    let urlParams;
    if (id.location.search) {
        urlParams = Object.fromEntries(new URLSearchParams(id.location.search.substring(1)));
    }
    switch (id.breadcrumb) {
        // case "user-verify":
        //     compo = <UpdateOcr urlParams={urlParams} />;
        //     break;
        case "view-detail":
            compo = <ImageProcessOcr />;
            break;
        default:
            break;
    }
    return (
        <div className="card shadow">
            {compo}
        </div>
    );
}

//Connect to store
export default ContentCommon;
