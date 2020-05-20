import React from 'react';
import LightRays from './LightRays';



function FaceExterior({isSelected, isLightOn}) {
    return (
        <>
            <div className={`faceColor ${isSelected ? 'selectedFace' : ''}`} />
            <LightRays isHidden={!isLightOn}/>
        </>
    );
}

export default FaceExterior;