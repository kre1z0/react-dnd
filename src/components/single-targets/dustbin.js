import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import ItemTypes from './item-types';
import flow from 'lodash/flow';

const style = {
    height: '12rem',
    width: '12rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
};

const boxTarget = {
    drop() {
        return { name: 'Dustbin over' };
    },
};

class Dustbin extends Component {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
        isOver: PropTypes.bool.isRequired,
        canDrop: PropTypes.bool.isRequired,
    };

    render() {
        const { canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;

        let backgroundColor = '#222';
        if (isActive) {
            backgroundColor = 'green';
        } else if (canDrop) {
            backgroundColor = 'red';
        }

        return connectDropTarget(
            <div style={{ ...style, backgroundColor }}>
                {isActive ? 'Release to drop' : 'Drag a box here'}
            </div>,
        );
    }
}

export default flow([
    DropTarget(ItemTypes.BOX, boxTarget, (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    })),
])(Dustbin);
