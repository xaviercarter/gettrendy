// https://www.youtube.com/watch?v=n80RRNS1k64&list=PLVvjrrRCBy2LWFkR7opQxWp4z0en6OHgw
//  !! moment js library date formatter tutorial code

import React from 'react'
import Moment from 'react-moment'

const DateFormatter = ({date}) => {
    return (
        <Moment format='D MMM YYYY'withTitle>
            {date}
        </Moment>
    );
};

export default DateFormatter;