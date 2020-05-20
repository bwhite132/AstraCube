import React from 'react';
import space from '../assets/space2.mp4';

function BackgroundVideo() {
    return (
        <video id='video' autoPlay loop muted playsInline>
            <source src={space} type='video/mp4'/>
        </video>
    );
}

export default BackgroundVideo;
