import React, { useEffect, useState } from 'react';
import "./DatePicker.scss"
import $ from "jquery"
import 'jquery-ui-dist/jquery-ui.js';
import 'jquery-ui-dist/jquery-ui.css';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from 'moment'

const RangPicker = ({ onChange = Function() }) => {

    const [dataDate, setDataDate] = useState({
        dateFrom: "",
        dateTo: ""
    })

    useEffect(() => {
        $(".ecm-base-rangepicker").datepicker({
            dateFormat: "mm-dd-yy",
            minYear: "0",
            numberOfMonths: 2,
            showAnim: "slideDown",
            changeMonth: true,
            changeYear: true,
            beforeShow: function () {
                $('#ui-datepicker-div').addClass("ecm-base-date-picker-container");
            },
            onSelect: function (selectedDate) {
                const isCheckSelect = sessionStorage.getItem("ecm-base-rangepicker-is-check") === "true" ? true : false
                if (isCheckSelect) {
                    $(this).data().datepicker.inline = true
                    $(this).data().datepicker.s_first = selectedDate;
                    sessionStorage.setItem("ecm-base-rangepicker-is-check", false)
                    setDataDate({ dateFrom: $(this).data().datepicker.s_first, dateTo: $(this).data().datepicker.s_second || '' })
                    $(".ecm-base-rangepicker-input-to").focus()
                } else {
                    $(this).data().datepicker.s_second = selectedDate;
                    $(this).data().datepicker.inline = true;
                    sessionStorage.setItem("ecm-base-rangepicker-is-check", true)
                    setDataDate({ dateFrom: $(this).data().datepicker.s_first, dateTo: $(this).data().datepicker.s_second || '' })
                    $(".ecm-base-rangepicker-input-from").focus()
                }
                if ($(this).data().datepicker.s_first && $(this).data().datepicker.s_second && $(this).data().datepicker.first) {
                    var $this = $(this);
                    setTimeout(function () {
                        $this.datepicker("hide");
                        $this.data().datepicker.inline = false;
                    }, 750)
                }
                $(this).datepicker("show"); // update the dates
                $(this).data().datepicker.first = selectedDate;
            },
            onClose: function () {
                delete $(this).data().datepicker.first;
                $(this).data().datepicker.inline = false;
                $(this).blur()
                onChange({ dateFrom: $(this).data().datepicker.s_first, dateTo: $(this).data().datepicker.s_second || '' })

            }, beforeShowDay: function (date) {
                const d = date.getTime();
                const d_str = moment(date).format("yyyy-DD-MM")
                const isCheckSelect = sessionStorage.getItem("ecm-base-rangepicker-is-check") === "true" ? true : false

                const s1 = $(this).data().datepicker.s_first;
                let d1_str = ""
                let d2_str = ""
                let d1 = ""
                let d2 = ""
                if (s1) {
                    d1 = new Date(String(s1));
                    d1_str = moment(d1).format("yyyy-DD-MM")
                    d1 = d1.getTime();
                }

                const s2 = $(this).data().datepicker.s_second
                if (s2) {
                    d2 = new Date(String(s2));
                    d2_str = moment(d2).format("yyyy-DD-MM")
                    d2 = d2.getTime();
                }

                if (d_str == d1_str || d_str == d2_str) {
                    return [true, 'ecm-base-date-picker-active', ''];
                } else if (d > d1 && d < d2) {
                    return [true, 'ui-state-highlight', ''];
                } else if (d1 && d < d1 && !isCheckSelect) {
                    return [true, 'ui-datepicker-unselectable ui-state-disabled', ''];
                } else if (d2 && d > d2 && isCheckSelect) {
                    return [true, 'ui-datepicker-unselectable ui-state-disabled', ''];
                } else {
                    return [true, ''];
                }
            }
        });
    }, [])

    const handleClick = (isFrom) => {
        sessionStorage.setItem("ecm-base-rangepicker-is-check", isFrom)
        $('.ecm-base-rangepicker').datepicker("show")
    }

    const handleChangeInput = (event) => {
        const newDateDate = {...dataDate,
            [event.target.name]: event.target.value
        }
        setDataDate(newDateDate)
    }

    return (
        <>
            <div className="ecm-base-date-picker-item">
                <div className="ecm-base-date-picker-item__input">
                    <input type="text" className="ecm-base-rangepicker" hidden />
                    <input type="text" name="dateFrom" className="ecm-base-rangepicker-input-from"
                        onClick={() => handleClick(true)} value={dataDate.dateFrom}
                        onChange={(e) => handleChangeInput(e)} />
                </div>
                <div className="ecm-base-date-picker-item__seperate">
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>
                <div className="ecm-base-date-picker-item__input">
                    <input type="text" name="dateTo" className="ecm-base-rangepicker-input-to"
                    onClick={() => handleClick(false)} value={dataDate.dateTo}
                    onChange={(e) => handleChangeInput(e)} />
                </div>
            </div>
        </>
    )
}

const DatePicker = ({ onChange = Function() }) => {

    useEffect(() => {
        $("#ecm-base-datepicker").datepicker({
            dateFormat: "mm-dd-yy",
            minYear: "0",
            numberOfMonths: 1,
            showAnim: "slideDown",
            changeMonth: true,
            changeYear: true
        });
    }, [])

    return (
        <>
        <input id="ecm-base-datepicker" className="mb-input" type="text" />
        </>
    )
}

DatePicker.RangPicker = RangPicker


export default DatePicker