import React from 'react'
import './Confirm.scss'
import Modal from "../modal/Modal"

const Confirm = (props) => {

    const { title, width, children, visible, className, onOk, onCancel, okText, cancelText, hiddenCancel } = props

    return (
        <Modal
            title={title}
            width={width}
            onCancel={onCancel}
            className={className}
            visible={visible}
            footer={
                <div className="ocr-base-confirm-button">
                    <button type="button"
                        className="mb-btn mb-btn-blue"
                        onClick={onOk}>
                        {okText || "Xác nhận"}
                    </button>
                    <button type="button"
                            hidden={hiddenCancel}
                        className="mb-btn mb-btn-nomal-gray"
                        onClick={onCancel}>
                        {cancelText || "Hủy"}
                    </button>
                </div>
            }>
            <div className="ocr-base-confirm-body">
                {children}
            </div>
        </Modal>
    )
}

export default Confirm;