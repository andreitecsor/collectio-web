import React from "react";
import './pop-up.styles.scss';

const PopUp = (props) => {
    return (props.trigger)
        ? (
            <div className='pop-up'>
                <div className='content'>
                    <span className='dismiss' onClick={() => props.close ? props.close() :
                        undefined}>&#10005;</span>
                    {props.children}
                </div>
            </div>
        )
        : "";
}

export default PopUp;