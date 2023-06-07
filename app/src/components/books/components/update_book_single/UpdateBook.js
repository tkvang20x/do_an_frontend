import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import './UpdateBook.scss';

import { openNotificationCommon } from "../../../../common/const";
import DropDown from "../../../../share/ecm-base/components/dropdown-v2/DropDown";
import BookAction from "../../../../redux/action/BookAction";

const UpdateBook = ({codeBooks, dataBook , onCloseModal }) => {

    let listStatusBook = [
        {
            title: "Sách mới",
            value: "NEW"
        },
        {
            title: "Sách cũ",
            value: "OLD"
        }
    ]

    const { register, setValue ,formState: { errors }, handleSubmit } = useForm({ mode: "onChange" });
    const dispatch = useDispatch()
    const filter = useSelector(state => state.bookReducer.paginationFilter)

    const [formUpdate, setFormUpdate] = useState(
        {
            status_book: dataBook?.status_book,
            status_borrow: dataBook?.status_borrow,
            user_borrow: dataBook?.user_borrow,
            compartment: dataBook?.compartment
        }
    )

    useEffect(() => {
        setValue("compartment", formUpdate?.compartment)
    }, [])

    const handleChangeInput = (field, value) => {
        let newFormData = {}
        newFormData = { ...formUpdate, [field]: value };

        setFormUpdate(newFormData)
    }

    const handleSubmitForm = () => {
        BookAction.updateBookAction(dispatch,codeBooks,dataBook.code_id, formUpdate ,filter).then(response => {
            if (response === true) {
                onCloseModal()
            }
        })
    }

    console.log(formUpdate);

    return (
        <form id="do-an-form-update-book" onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="do-an-form-update-book__body">
                <div className="do-an-form-update-book__body__content">
                    <div className="do-an-form-update-book__body__content__info">
                        <div className="do-an-form-update-book__body__book-input">
                            <div className="do-an-form-update-book__body__book-input__key">
                                <span>Trạng thái sách: <i className="do-an__input-require">*</i></span>
                            </div>
                            <div className="do-an-form-update-book__body__book-input__input">
                                {/* <input
                                    className={`do-an__input do-an-input-name ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("status_book",
                                        {
                                            required: true,
                                            maxLength: 100,
                                            onChange: (e) => handleChangeInput("status_book", e.target.value)
                                        }
                                    )}
                                /> */}
                                <DropDown
                                    className="do-an-dropdown-update"
                                    listItem={listStatusBook}
                                    selected={formUpdate?.status_book || "NEW"}
                                    name="status_book"
                                    onSelected={handleChangeInput}
                                >
                                </DropDown>
                            </div>
                        </div>
                        <div className="do-an-form-update-book__body__book-input">
                            <div className="do-an-form-update-book__body__book-input__key">
                                <span>Ngăn số:</span>
                            </div>
                            <div className="do-an-form-update-book__body__book-input__input">
                                <input
                                    className={`do-an__input do-an-input-name ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("compartment",
                                        {
                                            max: 1000,
                                            min:0,
                                            required:true,
                                            onChange: (e) => handleChangeInput("compartment", e.target.value)
                                        }
                                    )}
                                    type="number"
                                    style={{width:"20%"}}
                                />
                                {errors.compartment?.type === "max" &&
                                    <div className="input-value-error">Giới hạn ngăn tủ nhỏ hơn 1000!</div>}
                                    {errors.compartment?.type === "min" &&
                                    <div className="input-value-error">Ngăn số không được âm!</div>}
                            </div>
                        </div>

                    </div>

                    <button id="do-an-form-update-book-button" type="submit" hidden={true}></button>
                </div>
            </div>
        </form>
    )
}

export default UpdateBook;