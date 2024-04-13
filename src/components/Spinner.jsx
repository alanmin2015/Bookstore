import React from 'react';
import { Circles } from 'react-loader-spinner'

function Spinner() {
    return (
        <div className='spinner-center'>
            <Circles
                color="rgb(0,163,154)"
            />
        </div>

    );
}

export default Spinner;