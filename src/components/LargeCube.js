import React from 'react';
import SmallCube from './SmallCube';
import {observer} from 'mobx-react';
import StoreContext from '../StoreContext';

class LargeCube extends React.Component {
    render() {
        const store = this.context;
        return (
                <div id='largecube' style={this.getStyle(store)}>
                    {store.smallCubes.map((smallCubeModel, key) => <SmallCube model={smallCubeModel} key={key}/>)}
                </div>
        );
    }

    getStyle(store) {
        const cubeBaseSize = 300,
            scale =  Math.min(window.innerWidth, window.innerHeight) * .33 / cubeBaseSize;
        return {transform: store.matrix.scale3d(scale)};
    }
}

LargeCube.contextType = StoreContext;

export default observer(LargeCube);
