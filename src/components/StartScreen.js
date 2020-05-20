import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import StoreContext from '../StoreContext';


class StartScreen extends React.Component {
    startGame = () => {
        this.context.startGame();
    }

    render() {
        return (
            <div className='startScreen'>
                <h1>AstraCube</h1>

                <p>Rotate entire cube by dragging outside</p>
                <p>Twist direction by dragging inside</p>

                <button onClick={this.startGame}>
                    <FontAwesomeIcon icon={faPlay}/> Play
                </button>
            </div>
        )
    }
}

StartScreen.contextType = StoreContext;

export default StartScreen;