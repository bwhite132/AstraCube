import React from 'react';
import FaceExterior from './FaceExterior';
import {observer} from 'mobx-react';
import StoreContext from '../StoreContext';
import classNames from 'classnames';
import {fireMouseMove} from '../Util';


class Face extends React.Component {
    onDown = (e) => {
        this.context.startTwist(this.props.model);
        e.stopPropagation();
    }

    //Touch events fire from originating component instead of the one being touched
    //Instead use mousemove since the component will be the correct face for selection
    onTouchMove = (e) => {
        fireMouseMove(e);
    }

    onMouseMove = () => {
        this.context.addAnotherTwistFaceIfAllowed(this.props.model);
        this.context.deselectFacesIfAtStart(this.props.model);
    }

    getColorClassName() {
        return this.props.model.color.toLowerCase();
    }

    getPositionClassName() {
        return this.props.model.position.toLowerCase();
    }

    render() {
        const {showExterior, isSelected} = this.props.model;
        return (
            <div className={classNames('face', this.getColorClassName(), this.getPositionClassName())} onMouseMove={this.onMouseMove} onPointerDown={this.onDown} onTouchMove={this.onTouchMove}>
                {showExterior && <FaceExterior isSelected={isSelected} isLightOn={this.props.isLightOn}/>}
            </div>
        )
    }
}

Face.contextType = StoreContext;

export default observer(Face);