import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import './UpdateBooks.scss';
import image2 from '../../../../share/image/123.jpg';
import ConstAPI from '../../../../common/const';
import constImage from "../../../../common/constImage";
import BooksAction from "../../../../redux/action/BooksAction";
import DropDown from '../../../../share/ecm-base/components/dropdown-v2/DropDown';
import GroupsAction from "../../../../redux/action/GroupsAction";
import { useParams } from 'react-router-dom';


const UpdateBooks = ({ onCloseModal , codeBooks}) => {

    const paginationFilter = {
        page: 1,
        size: 20,
        order_by: "created_time",
        order: -1,
    }

    const { register, setValue, formState: { errors }, handleSubmit } = useForm({ mode: "onChange" });
    const dispatch = useDispatch()
    const [image, setImage] = useState(image2)
    const filter = useSelector(state => state.booksReducer.paginationFilter)
    const listGroups = useSelector(state => state.groupsReducer.listGroups)
    const booksDetail = useSelector(state => state.booksReducer.detailBooks)

    const { code } = useParams()

    useEffect(() => {
        if(codeBooks === null || codeBooks === undefined){
            BooksAction.getDetailBooksAction(dispatch, code)
        }else{
            BooksAction.getDetailBooksAction(dispatch, codeBooks)
        }
        GroupsAction.getListGroupsAction(dispatch, paginationFilter)
    }, [])

    const [formUpdateBooks, setFormUpdateBooks] = useState({})

    useEffect(() => {
        setValue("name", booksDetail?.name)
        setValue("description", booksDetail?.description)
        setValue("title", booksDetail?.title)
        setValue("author", booksDetail?.author)
        setValue("name_university", booksDetail?.name_university)
        setValue("publishing_year", booksDetail?.publishing_year)
        setValue("origin", booksDetail?.origin)
        setValue("group_code", booksDetail?.group_code)
        setValue("cabinet", booksDetail?.cabinet)
        setImage(`${ConstAPI.BASE_HOST_API}${booksDetail?.avatar}`)
        setFormUpdateBooks({
            "name": booksDetail?.name,
            "description": booksDetail?.description,
            "title": booksDetail?.title,
            "author": booksDetail?.author,
            "name_university": booksDetail?.name_university,
            "publishing_year": booksDetail?.publishing_year,
            "origin": booksDetail?.origin,
            "group_code": booksDetail?.group_code,
            "cabinet": booksDetail?.cabinet
        })
    }, [booksDetail])


    const [listDefaultDropDown, setListDefaultDropDown] = useState([])

    useEffect(() => {
        let listGrgoupsDropDown = listGroups.map((item) => {
            return {
                title: item?.group_name,
                value: item?.group_code
            }
        })
        setListDefaultDropDown([...listGrgoupsDropDown])
    }, [listGroups])

    const checkFileTypeAvatar = (files) => {
        const { length } = files;
        if (length > 0) {
            const { type } = files[0];
            return (constImage.LIST_FILE_TYPE_AVATAR.findIndex(item => `IMAGE/${item}` === type.toLocaleUpperCase()) > -1)
        }
        return true
    }
    const checkFileSizeAvatar = (files) => {
        const { length } = files;
        if (length > 0) {
            const { size } = files[0];
            return (size / 1024 / 1024 <= 5)
        }
        return true
    }

    const onImageChange = async (event) => {
        if (event.target.files && event.target.files[0] && event.target.files[0]['type'].split('/')[0] === 'image') {
            console.log(event.target.files);

            setImage(URL.createObjectURL(event.target.files[0]));
            handleChangeInput("avatar", event.target.files[0])
        }
    }

    const handleChangeInput = (field, value) => {
        const newFormData = { ...formUpdateBooks, [field]: value };
        setFormUpdateBooks(newFormData)
    }

    const handleSubmitForm = () => {
        if(codeBooks === null || codeBooks === undefined){
            BooksAction.updateBooksAction(dispatch, code, formUpdateBooks)
        }else{
            BooksAction.updateBooksAction(dispatch, codeBooks, formUpdateBooks)
        }
        BooksAction.getListBooksAction(dispatch, filter)
        onCloseModal()
    }

    return (
        <form id="do-an-form-update-books" onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="do-an-form-update-books__body">
                {/* <div className="do-an-form-update-books__body__title">
                    Thông tin:
                </div> */}

                <div className="do-an-form-update-books__body__content">
                    <div className="do-an-form-update-books__body__content__info">
                        <div className="do-an-form-update-books__body__group-input">
                            <div className="do-an-form-update-books__body__group-input__key">
                                <span>Tên Sách: <i className="do-an__input-require">*</i></span>
                            </div>
                            <div className="do-an-form-update-books__body__group-input__input">
                                <input
                                    className={`do-an__input do-an-input-name ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("name",
                                        {
                                            required: true,
                                            maxLength: 100,
                                            onChange: (e) => handleChangeInput("name", e.target.value)
                                        }
                                    )}
                                />
                                {errors.name?.type === "required" &&
                                    <div className="input-value-error">Tên sách không được trống!</div>}
                                {errors.name?.type === "maxLength" &&
                                    <div className="input-value-error">Tên sách không được vượt quá 100 ký tự!</div>}
                            </div>
                        </div>
                        <div className="do-an-form-update-books__body__group-input">
                            <div className="do-an-form-update-books__body__group-input__key">
                                <span>Thể loại: <i className="do-an__input-require">*</i></span>
                            </div>
                            <div className="do-an-form-update-books__body__group-input__input">
                                <DropDown className="do-an-dropdown-update"
                                    listItem={listDefaultDropDown}
                                    selected={formUpdateBooks.group_code || listDefaultDropDown[0]?.value}
                                    name="group_code"
                                    onSelected={handleChangeInput}
                                />

                            </div>
                        </div>
                        <div className="do-an-form-update-books__body__group-input">
                            <div className="do-an-form-update-books__body__group-input__key">
                                <span>Mô tả:</span>
                            </div>
                            <div className="do-an-form-update-books__body__group-input__input">
                                <input
                                    className={`do-an__input do-an-input-name ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("description",
                                        {
                                            maxLength: 500,
                                            onChange: (e) => handleChangeInput("description", e.target.value)
                                        }
                                    )}
                                />
                                {errors.description?.type === "maxLength" &&
                                    <div className="input-value-error">Mô tả sách không được vượt quá 500 ký tự!</div>}
                            </div>
                        </div>
                        <div className="do-an-form-update-books__body__group-input">
                            <div className="do-an-form-update-books__body__group-input__key">
                                <span>Tiêu đề: <i className="do-an__input-require">*</i></span>
                            </div>
                            <div className="do-an-form-update-books__body__group-input__input">
                                <input
                                    className={`do-an__input do-an-input-name ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("title",
                                        {
                                            required: true,
                                            maxLength: 100,
                                            onChange: (e) => handleChangeInput("title", e.target.value)
                                        }
                                    )}
                                />
                                {errors.title?.type === "required" &&
                                    <div className="input-value-error">Tiêu đề sách không được trống!</div>}
                                {errors.title?.type === "maxLength" &&
                                    <div className="input-value-error">Tiêu đề sách không được vượt quá 100 ký tự!</div>}
                            </div>
                        </div>
                        <div className="do-an-form-update-books__body__group-input">
                            <div className="do-an-form-update-books__body__group-input__key">
                                <span>Tác giả: <i className="do-an__input-require">*</i></span>
                            </div>
                            <div className="do-an-form-update-books__body__group-input__input">
                                <input
                                    className={`do-an__input do-an-input-name ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("author",
                                        {
                                            required: true,
                                            maxLength: 100,
                                            onChange: (e) => handleChangeInput("author", e.target.value)
                                        }
                                    )}
                                />
                                {errors.author?.type === "required" &&
                                    <div className="input-value-error">Tác giả sách không được trống!</div>}
                                {errors.author?.type === "maxLength" &&
                                    <div className="input-value-error">Tác giả sách không được vượt quá 100 ký tự!</div>}
                            </div>
                        </div>
                        <div className="do-an-form-update-books__body__group-input">
                            <div className="do-an-form-update-books__body__group-input__key">
                                <span>Thuộc đại học: <i className="do-an__input-require">*</i></span>
                            </div>
                            <div className="do-an-form-update-books__body__group-input__input">
                                <input
                                    className={`do-an__input do-an-input-name ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("name_university",
                                        {
                                            required: true,
                                            maxLength: 100,
                                            onChange: (e) => handleChangeInput("name_university", e.target.value)
                                        }
                                    )}
                                />
                                {errors.name_university?.type === "required" &&
                                    <div className="input-value-error">Tên đại học sở hữu sách không được trống!</div>}
                                {errors.name_university?.type === "required" &&
                                    <div className="input-value-error">Tên đại học sở hữu sách không được trống!</div>}
                            </div>
                        </div>
                        <div className="do-an-form-update-books__body__group-input">
                            <div className="do-an-form-update-books__body__group-input__key">
                                <span>Năm xuất bản: <i className="do-an__input-require">*</i></span>
                            </div>
                            <div className="do-an-form-update-books__body__group-input__input">
                                <input
                                    className={`do-an__input do-an-input-name input-number ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("publishing_year",
                                        {
                                            required: true,
                                            maxLength: 4,
                                            onChange: (e) => handleChangeInput("publishing_year", e.target.value)
                                        }
                                    )}
                                />
                                {errors.publishing_year?.type === "required" &&
                                    <div className="input-value-error">Năm xuất bản sách không được trống!</div>}
                                {errors.publishing_year?.type === "maxLength" &&
                                    <div className="input-value-error">Năm xuất bản sách không được vượt quá 4 ký tự!</div>}
                            </div>
                        </div>
                        <div className="do-an-form-update-books__body__group-input">
                            <div className="do-an-form-update-books__body__group-input__key">
                                <span>Nhà xuất bản: <i className="do-an__input-require">*</i></span>
                            </div>
                            <div className="do-an-form-update-books__body__group-input__input">
                                <input
                                    className={`do-an__input do-an-input-name ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("origin",
                                        {
                                            required: true,
                                            maxLength: 100,
                                            onChange: (e) => handleChangeInput("origin", e.target.value)
                                        }
                                    )}
                                />
                                {errors.author?.type === "required" &&
                                    <div className="input-value-error">Nhà xuất bản sách không được trống!</div>}
                                {errors.origin?.type === "maxLength" &&
                                    <div className="input-value-error">Nhà xuất bản sách không được vượt quá 100 ký tự!</div>}
                            </div>
                        </div>
                        <div className="do-an-form-update-books__body__group-input">
                            <div className="do-an-form-update-books__body__group-input__key">
                                <span>Tủ đựng: <i className="do-an__input-require">*</i></span>
                            </div>
                            <div className="do-an-form-update-books__body__group-input__input">
                                <input
                                    className={`do-an__input do-an-input-name input-number ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("cabinet",
                                        {
                                            required: true,
                                            maxLength: 2,
                                            onChange: (e) => handleChangeInput("cabinet", e.target.value)
                                        }
                                    )}
                                    type="number"
                                />
                                {errors.cabinet?.type === "required" &&
                                    <div className="input-value-error">Số của tủ đựng sách không được trống!</div>}
                                {errors.cabinet?.type === "maxLength" &&
                                    <div className="input-value-error">Số của tủ đựng sách không được vượt quá 100!</div>}
                            </div>
                        </div>
                    </div>
                    <div className="do-an-form-update-books__body__content__avatar">
                        <div className="do-an-form-update-books__body__group-input__input-add-image">
                            <div>
                                <input type="file" accept="image/*" className={`ocr-designer-input-add-image ${errors.image ? 'is-invalid' : ''}`}
                                    {...register("avatar",
                                        {
                                            onChange: (e) => onImageChange(e),
                                            validate: {
                                                checkFileType: files => checkFileTypeAvatar(files) || `Ảnh đại diện chỉ nhận các file ${constImage.LIST_FILE_TYPE_AVATAR.join(", ")}`,
                                                checkFileSize: files => checkFileSizeAvatar(files) || "Ảnh đại diện không vượt quá 5MB"
                                            }
                                        }
                                    )} />
                                {/* {errors.avatar?.type === "required" &&
                                    <div className="input-value-error">Ảnh sách không được trống!</div>} */}
                                {errors.avatar?.message &&
                                    <div className="input-value-error">{errors.avatar?.message}</div>}
                            </div>
                            <img className="do-an-preview-image" src={image}></img>
                            <div className="do-an-title-avatar">
                                Ảnh đại diện
                            </div>
                        </div>
                    </div>
                    <button id="do-an-form-update-books-button" type="submit" hidden={true}></button>
                </div>
            </div>
        </form>
    )
}

export default UpdateBooks;