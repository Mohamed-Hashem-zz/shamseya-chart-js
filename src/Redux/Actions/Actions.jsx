import axios from "axios";
import { LINE_CHART_DATA_2, LINE_CHART_DATA_4, QUESTIONS } from './Types';

export const getQuestions = () => { // Get Questions Api

    return async (dispatch) => {

        await axios.get('https://staging.mymelior.com/v1/questions', {
            headers: {
                'Authorization': 'Bearer SLSmxK17vjRInEWIiFQjwE1QIDfeSM'
            },
            method: "GET",
            mode: 'cors',
        }).then((res) => {
            const { data } = res;
            // console.log("Questions = ", data)
            dispatch({ type: QUESTIONS, Reviews: data })

        }).catch((err) => {
            console.log(err.message);
            dispatch({ type: QUESTIONS, Reviews: [] })
        })
    }
}

export const getReviewsQuestion2 = (date) => {

    let dateRange = [];

    const dateFormat = date ? formatDate(date) : 0 //Call Function formatDate To Format Date to YYYY-MM-DD

    const monthDiff = months_Difference(date[0], date[1]); // The Number of Months Between Two Dates

    console.log("Redux 2 = ", dateFormat);

    return async (dispatch) => {

        let Reviews2 = [];

        await axios.get(`https://staging.mymelior.com/v1/branches/1/progress?date_from=${dateFormat[0]}&date_to=${dateFormat[1]}`, {
            headers: {
                'Authorization': 'Bearer SLSmxK17vjRInEWIiFQjwE1QIDfeSM'
            },
            method: "GET",
            mode: 'cors',
        }).then((res) => {

            const { data: { line_chart_data } } = res; // destruct line_chart_data from response request

            let Reviews = line_chart_data.map(review => {
                review.submitted_at = (new Date(review.submitted_at).toISOString()).slice(0, 19); // to change date format to my format (formatDateZone)
                return review
            }); // make map to get all

            let prevDateMonth = formatDateZone(new Date(date[0])).slice(0, 19) // First Date Month Start To Make Bar Chart Start From this Date

            let nextDateMonth = getNextMonth(new Date(prevDateMonth)).toISOString().slice(0, 19) // next Date Month

            for (let index = 0; index < monthDiff; index++) {       // Save Every Complements which send in one month together

                dateRange[index] = Reviews.filter(review => (review.submitted_at >= prevDateMonth && review.submitted_at < nextDateMonth) ? review : null) //eslint-disable-line

                prevDateMonth = getNextMonth(new Date(prevDateMonth)).toISOString().slice(0, 19)

                nextDateMonth = getNextMonth(new Date(nextDateMonth)).toISOString().slice(0, 19)
            }

            let lastReviews2 = [];

            for (let index = 0; index < dateRange.length; index++) {

                Reviews2 = dateRange[index].map(review => review.answers[2]);

                let filterGood = Reviews2.filter(review => review.choice === 4)  // Filter Good Answers together to know how many

                let filterNatural = Reviews2.filter(review => review.choice === 6) // Filter Natural Answers together to know how many

                let filterBad = Reviews2.filter(review => review.choice === 1) // Filter Bad Answers together to know how many

                Reviews2 = {
                    Length: Reviews2.length,
                    Reviews: { ...Reviews2 },
                    Good: filterGood.length,
                    Natural: filterNatural.length,
                    Bad: filterBad.length
                }   // Make every Month together

                lastReviews2.push(Reviews2) // push all Complements in this month to array which send to bar chart graph
            }

            Reviews2 = lastReviews2;

            console.log("Reviews 2 = ", Reviews2);

            dispatch({ type: LINE_CHART_DATA_2, Reviews2, monthDiff: monthDiff });

        }).catch((err) => {
            console.log(err.message);
            dispatch({ type: LINE_CHART_DATA_2, Questions: [], Reviews2: [], monthDiff: 0 });
        })
    }
}

export const getReviewsQuestion4 = (date) => {

    let dateRange = [];

    const dateFormat = date ? formatDate(date) : 0 //Call Function formatDate To Format Date to YYYY-MM-DD

    const monthDiff = months_Difference(date[0], date[1]); // The Number of Months Between Two Dates

    console.log("Redux 4 = ", dateFormat);

    return async (dispatch) => {

        let Reviews4 = [];

        await axios.get(`https://staging.mymelior.com/v1/branches/1/progress?date_from=${dateFormat[0]}&date_to=${dateFormat[1]}`, {
            headers: {
                'Authorization': 'Bearer SLSmxK17vjRInEWIiFQjwE1QIDfeSM',
            }
        }).then((res) => {

            const { data: { line_chart_data } } = res;  // destruct line_chart_data from response request

            let Reviews = line_chart_data.map(review => {
                review.submitted_at = (new Date(review.submitted_at).toISOString()).slice(0, 19); // to change date format to my format (formatDateZone)
                return review
            });

            let prevDateMonth = formatDateZone(new Date(date[0])).slice(0, 19)

            let nextDateMonth = getNextMonth(new Date(prevDateMonth)).toISOString().slice(0, 19)

            for (let index = 0; index < monthDiff; index++) {

                dateRange[index] = Reviews.filter(review => (review.submitted_at >= prevDateMonth && review.submitted_at < nextDateMonth) ? review : null) //eslint-disable-line

                prevDateMonth = getNextMonth(new Date(prevDateMonth)).toISOString().slice(0, 19)  // First Date Month Start To Make Bar Chart Start From this Date

                nextDateMonth = getNextMonth(new Date(nextDateMonth)).toISOString().slice(0, 19)  //  Next Date Month
            }

            let lastReviews4 = []
            for (let index = 0; index < dateRange.length; index++) {
                Reviews4 = dateRange[index].map(review => review.answers[3]); // review.answers[3] For Question 4

                let filterGood = Reviews4.filter(review => review.choice === 4) // Filter Good Answers together to know how many
                let filterNatural = Reviews4.filter(review => review.choice === 6) // Filter Natural Answers together to know how many
                let filterBad = Reviews4.filter(review => review.choice === 1) // Filter Bad Answers together to know how many

                Reviews4 = {
                    Length: Reviews4.length,
                    Reviews: { ...Reviews4 },
                    Good: filterGood.length,
                    Natural: filterNatural.length,
                    Bad: filterBad.length
                }

                lastReviews4.push(Reviews4) // push all Complements in this month to array which send to bar chart graph
            }

            Reviews4 = lastReviews4;

            console.log("Reviews 4 = ", Reviews4);

            dispatch({ type: LINE_CHART_DATA_4, Reviews4, monthDiff: monthDiff });

        }).catch((err) => {
            console.log(err.message);
            dispatch({ type: LINE_CHART_DATA_4, Reviews4: [], monthDiff: 0 });
        })
    }
}

function months_Difference(date1, date2) { // Calculate The Number of Months Between Two Dates
    let months = (date2.getFullYear() - date1.getFullYear()) * 12;
    months -= date1.getMonth();
    months += date2.getMonth();
    return months <= 0 ? 0 : months;
}

function formatDate(dateFormat) { // Format Date To YYYY-MM-DD
    // return dateFormat.map((date => new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0]))
    return dateFormat.map((date => new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0]))
}

function getNextMonth(date) { // To get Next Moth
    let nextMonth = new Date(date.setMonth(date.getMonth() + 1)); // nextMonth Date
    nextMonth = new Date(nextMonth.setHours(2, 0, 0, 0));
    return nextMonth;
}

function formatDateZone(date) { // To Format Date To make As Date Zone
    date = new Date(date.setHours(2, 0, 0, 0));
    return new Date(date).toISOString();
}