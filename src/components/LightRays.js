import React from 'react';

function LightRays({isHidden}) {
    return (
        <div className={isHidden ? 'hidden' : 'blinking'}>
            <div className='lightbeam lightLeft lightsource' />
            <div className='lightbeam lightRight lightsource'/>
            <div className='lightbeam lightTop lightsource'/>
            <div className='lightbeam lightBottom lightsource'/>
        </div>
    );
}

export default React.memo(LightRays);