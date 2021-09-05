import { LINE_CHART_DATA_2, LINE_CHART_DATA_4, QUESTIONS } from './../Actions/Types';

export function reducer(prevState, { type, Questions, Reviews2, Reviews4, monthDiff }) {

    switch (type) {
        case LINE_CHART_DATA_2:
            return { ...prevState, Reviews2, monthDiff }
        case LINE_CHART_DATA_4:
            return { ...prevState, Reviews4, monthDiff }
        case QUESTIONS:
            return { ...prevState, Questions }
        default:
            return prevState;
    }
}