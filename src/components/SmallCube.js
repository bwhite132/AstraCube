import React from 'react';
import Face from './Face';
import {observer} from 'mobx-react';

class SmallCube extends React.PureComponent {
    render() {
        return (
            <div className='smallcube' style={this.getTransformStyle()} onTransitionEnd={this.onTwistEnd} onAnimationEnd={this.onLightingEnd}>
                {this.props.model.faces.map(this.getFace)}
            </div>
        );
    }

    getFace = (faceModel) => (
        <Face model={faceModel} key={faceModel.id} isLightOn={this.props.model.isLightOn}/>
    )

    getTransformStyle() {
        const model = this.props.model;
        const zValues = [100, 0, -100];
        return {
            transform: `rotateY(${model.getYRotate()}deg) rotateX(${model.getXRotate()}deg) rotateZ(${model.getZRotate()}deg) translate3d(${model.xRow * 100}px, ${model.yRow * 100}px,${zValues[model.zRow]}px)`,
            transition: model.twistDimension === null ? '0s' : '.75s linear'
        };
    }

    onTwistEnd = () => {
        this.props.model.completeTwist();
    }

    onLightingEnd = (e) => {
        if(e.animationName === 'fadeOut') {
            this.props.model.hideLight();
        }
    }
}


export default observer(SmallCube);

