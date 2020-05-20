import React from 'react';
import LargeCube from './LargeCube';
import StoreContext from '../StoreContext';
import {getXYFromEvent} from '../Util';
import swoosh1 from '../assets/swoosh1.wav';
import swoosh2 from '../assets/swoosh2.wav';
import celestial from '../assets/celestial.wav';
import {Howl} from 'howler';

class GameScreen extends React.Component {
    onMove = (e) => {
        const loc = getXYFromEvent(e);
        this.context.rotateCube(loc);
    }

    onDown = (e) => {
        const loc = getXYFromEvent(e);
        this.context.setRotateFromPosition(loc);
    }

    onUp = () => {
        this.context.stopRotate();
        const isNewTwist = this.context.twistIfSelection();
        this.context.deselectTwistFaces();
        if (isNewTwist) {
            this.playTwistSound();
        }
    }

    playTwistSound() {
        const sound = new Howl({
            src: [this.getRandomTwistSound()]
        });
        sound.play();
    }

    getRandomTwistSound() {
        const randIndex = Math.floor(Math.random() * 2),
            sounds = [swoosh1, swoosh2];
        return sounds[randIndex];
    }

    onTwistEnd = () => {
        this.context.endTwist();
    }

    render() {
        return (
            <div id='gamescreen'
                 onTransitionEnd={this.onTwistEnd} onPointerDown={this.onDown} onMouseMove={this.onMove}
                 onTouchMove={this.onMove} onTouchEnd={this.onUp} onMouseUp={this.onUp}>
                <audio autoPlay loop>
                    <source src={celestial} type='audio/wav'/>
                </audio>
                <LargeCube/>
            </div>
        );
    }
}

GameScreen.contextType = StoreContext;

export default GameScreen;
