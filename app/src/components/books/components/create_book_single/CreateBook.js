import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import './CreateBook.scss';
import { openNotificationCommon } from "../../../../common/const";
import BookAction from "../../../../redux/action/BookAction";

const CreateBook = ({ codeBooks,onCloseModal }) => {

    const { register, formState: { errors }, handleSubmit } = useForm({ mode: "onChange" });
    const dispatch = useDispatch()
    const filter = useSelector(state => state.booksReducer.paginationFilter)

    const [formCreate, setFormCreate] = useState(
        {
            code_books: codeBooks,
            amount: 0,
            compartment: 0,
        }
    )



    const handleChangeInput = (field, value) => {
        let newFormData = {}
        newFormData = { ...formCreate, [field]: value };

        setFormCreate(newFormData)
    }

    const handleSubmitForm = () => {
        BookAction.createBookAction(dispatch, formCreate, filter)
        onCloseModal()
    }

    console.log(errors);

    return (
        <form id="do-an-form-create-book" onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="do-an-form-create-book__body">
                <div className="do-an-form-create-book__body__content">
                    <div className="do-an-form-create-book__body__content__info">
                        <div className="do-an-form-create-book__body__book-input">
                            <div className="do-an-form-create-book__body__book-input__key">
                                <span>Mã sách: <i className="do-an__input-require">*</i></span>
                            </div>
                            <div className="do-an-form-create-book__body__book-input__input">
                                <input
                                    className={`do-an__input do-an-input-name`}
                                    value={codeBooks}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className="do-an-form-create-book__body__book-input">
                            <div className="do-an-form-create-book__body__book-input__key">
                                <span>Số lượng:</span>
                            </div>
                            <div className="do-an-form-create-book__body__book-input__input">
                                <input
                                    className={`do-an__input do-an-input-name input-number ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("amount",
                                        {
                                            max: 500,
                                            min: 0,
                                            required: true,
                                            onChange: (e) => handleChangeInput("amount", e.target.value)
                                        }
                                    )}
                                    type="number"
                                />
                                {errors.amount?.type === "required" &&
                                    <div className="input-value-error">Số lượng không được trống!</div>}
                                {errors.amount?.type === "min" &&
                                    <div className="input-value-error">Số lượng không được âm!</div>}
                                {errors.amount?.type === "max" &&
                                    <div className="input-value-error">Số lượng không được vượt quá 500!</div>}
                            </div>
                        </div>

                        <div className="do-an-form-create-book__body__book-input">
                            <div className="do-an-form-create-book__body__book-input__key">
                                <span>Ngăn chứa số:</span>
                            </div>
                            <div className="do-an-form-create-book__body__book-input__input">
                                <input
                                    className={`do-an__input do-an-input-name input-number ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("compartment",
                                        {
                                            max: 100,
                                            min: 0,
                                            required: true,
                                            onChange: (e) => handleChangeInput("compartment", e.target.value)
                                        }
                                    )}
                                    type="number"
                                />
                                {errors.compartment?.type === "required" &&
                                    <div className="input-value-error">Ngăn chứa sách không được trống!</div>}
                                {errors.compartment?.type === "min" &&
                                    <div className="input-value-error">Ngăn chứa sách không được âm!</div>}
                                {errors.compartment?.type === "max" &&
                                    <div className="input-value-error">Ngăn chứa sách không được vượt quá 100!</div>}
                            </div>
                        </div>

                    </div>

                    <button id="do-an-form-create-book-button" type="submit" hidden={true}></button>
                </div>
            </div>
        </form>
    )
}

export default CreateBook;