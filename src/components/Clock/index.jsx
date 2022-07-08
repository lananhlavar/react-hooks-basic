import React from 'react';
import useClock from '../../hooks/useClock'



function Clock() {
const {timeString} = useClock()
    
    
    
    return (
        <p >
            {timeString}
        </p>
    );
}

export default Clock;