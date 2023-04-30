import $ from "jquery"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus, faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

const isNotNullOrUndefined = (object) => {
    return !!(typeof (object) !== "undefined" && object !== null && object !== {});
}

const removeFieldEmtyinObject = (object) => {
    const obj = JSON.parse(JSON.stringify(object));
    $.each(obj, function (key, value) {
        if (value === "" || value === null) {
            delete obj[key];
        } else if (Object.prototype.toString.call(value) === '[object Object]') {
            removeFieldEmtyinObject(value);
        } else if ($.isArray(value)) {
            $.each(value, function (_k, v) { removeFieldEmtyinObject(v); });
        }
    });
    return obj
}

const readFileDataAsBuffer = (file) => {

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            resolve(event.target.result);
        };

        reader.onerror = (err) => {
            reject(err);
        };

        reader.readAsArrayBuffer(file);
    });
}

const showTooltip = () => {
    $.fn.textWidth = function (text, font) {
        if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
        $.fn.textWidth.fakeEl.text(text || this.val() || this.text()).css('font', font || this.css('font'));
        return $.fn.textWidth.fakeEl.width();
    };
    $('.ocr-designer__tooltip').unbind("hover")
    $('.ocr-designer__tooltip').hover(function () {
        let tooltip = $(this);
        let tooltip_text = tooltip.attr('data-tip');
        let tooltip_placement = tooltip.attr('data-placement') !== undefined && tooltip.attr('data-placement') !== "" ? tooltip.attr('data-placement').toLowerCase() : "top";
        let tooltip_style = tooltip.attr('data-style') === "tooltip" ? "ocr-designer__tooltip-text" : "";
        let isCheckTextWitdh = tooltip.attr('data-check-text-width') === "false" ? false : true;

        //check show tooltip
        if (isCheckTextWitdh === true) {
            if (tooltip_text === undefined || tooltip_text === "" || tooltip_text === null
                || tooltip.attr('data-style') !== "tooltip" || tooltip.textWidth() <= tooltip.width()) {
                return
            }
        }
        let tooltip_class = `.${tooltip_style}-${tooltip_placement}`;
        $(tooltip_class).remove();
        $(".ocr-designer__layout-project__container").append(`<span class="ocr-designer__tooltip-content ${tooltip_style}-${tooltip_placement}">${tooltip_text}</span>`);

        //get position tooltip

        let box_tooltip = tooltip.get(0).getBoundingClientRect();
        let position_top = box_tooltip.top - 10 - $(tooltip_class).outerHeight();
        let position_bottom = box_tooltip.top + box_tooltip.height;
        let position_left = box_tooltip.left;

        let cssTooltip = {
            'left': position_left,
            'top': position_top
        }

        if (tooltip_placement === "bottom") {
            cssTooltip = {
                'left': position_left,
                'top': position_bottom
            }
        }

        $(tooltip_class).css(cssTooltip).animate({ 'opacity': '1', 'margin-left': '10' }, 200);

    }, function () {
        $(".ocr-designer__tooltip-content").animate({ 'opacity': '0', 'margin-left': '0px' }, 200, function () {
            $(this).remove();
        })
    }
    )
}

function isJSONString(text) {
    if (typeof text !== "string") {
        return false;
    }
    try {
        var json = JSON.parse(text);
        return (typeof json === 'object');
    }
    catch (error) {
        return false;
    }
}

function b64toBlob(dataURI) {
    
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
}

export const ListButton = ({
    editButtonName,
    removeButtonName,
    onEditAction,
    onRemoveAction,
    editDisable = false,
    removeDisable = false,
  }) => {
    return (
      <div className="do-an-list-action" style={{display:"grid",gridTemplateColumns:"repeat(1,1fr)"}}>
        {/* <div className="do-an-list-action-item">
          <button
              className="mb-btn mb-btn-outline-blue"
              name={editButtonName}
              data-toggle="tooltip"
              data-placement="top"
              title="Sửa"
              onClick={onEditAction}
              type="button"
              hidden={editDisable}
              disabled={editDisable}
              style={{cursor:"pointer"}}
            >
              <FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>
          </button>
        </div> */}
        <div className="do-an-list-action-item">
          <button
              className="mb-btn mb-btn-outline-red"
              name={removeButtonName}
              data-toggle="tooltip"
              data-placement="top"
              title="Xóa"
              onClick={onRemoveAction}
              type="button"
              disabled={removeDisable}
              style={{cursor:"pointer"}}
            >
             <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
          </button>
        </div>
      </div>
    );
  };


  export const ListButtonUser = ({
    editButtonName,
    removeButtonName,
    onEditAction,
    onRemoveAction,
    editDisable = false,
    removeDisable = false,
  }) => {
    return (
      <div className="do-an-list-action" style={{display:"grid",gridTemplateColumns:"repeat(1,1fr)"}}>
        <div className="do-an-list-action-item">
          <button
              className="mb-btn mb-btn-outline-blue"
              name={editButtonName}
              data-toggle="tooltip"
              data-placement="top"
              title="Sửa"
              onClick={onEditAction}
              type="button"
              hidden={editDisable}
              disabled={editDisable}
              style={{cursor:"pointer"}}
            >
              <FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>
          </button>
        </div>
        <div className="do-an-list-action-item">
          <button
              className="mb-btn mb-btn-outline-red"
              name={removeButtonName}
              data-toggle="tooltip"
              data-placement="top"
              title="Xóa"
              onClick={onRemoveAction}
              type="button"
              disabled={removeDisable}
              style={{cursor:"pointer"}}
            >
             <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
          </button>
        </div>
      </div>
    );
  };
  

const Utils = {
    isNotNullOrUndefined,
    removeFieldEmtyinObject,
    readFileDataAsBuffer,
    b64toBlob,
    showTooltip,
    isJSONString,
    ListButton,
    ListButtonUser
};

export default Utils;