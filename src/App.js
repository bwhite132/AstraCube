import React, {useContext} from 'react';
import BackgroundVideo from './components/BackgroundVideo';
import GameScreen from './components/GameScreen';
import StartScreen from './components/StartScreen';
import {observer} from 'mobx-react';
import StoreContext from './StoreContext';

function App() {
    const store = useContext(StoreContext);
    return (
            <div id='app'>
                <BackgroundVideo />
                {store.gameStarted ? <GameScreen/> : <StartScreen/>}
            </div>
    );
}

export default observer(App);
