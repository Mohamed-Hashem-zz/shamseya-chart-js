import React from 'react'
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars'
import { useEffect } from 'react';
import { getQuestions, getReviewsQuestion2, getReviewsQuestion4 } from './../../Redux/Actions/Actions';
import { useDispatch } from 'react-redux';

function Calender() {

    const dispatch = useDispatch(); // to Dispatch date from store

    const tempDate = [new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate()), new Date()]; // default date when start

    function onChange(e) {

        if (tempDate !== e.value) {
            dispatch(getQuestions());
            dispatch(getReviewsQuestion2(e.value))
            dispatch(getReviewsQuestion4(e.value))
        }
    }

    useEffect(() => {
        dispatch(getQuestions());
        dispatch(getReviewsQuestion2(tempDate));
        dispatch(getReviewsQuestion4(tempDate));
    }, [])//eslint-disable-line

    return (
        <React.Fragment>

            <div className="p-4 col-xxl-6 col-lg-7 col-sm-12 m-auto">
                <DateRangePickerComponent
                    placeholder="Enter Date Range"
                    format="yyyy-MM-dd"
                    onChange={onChange}
                    value={tempDate}
                />
            </div>

        </React.Fragment >
    )
}

export default Calender