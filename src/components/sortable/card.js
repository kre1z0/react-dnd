import React, { Component } from 'react';
import PropTypes from 'prop-types';
import flow from 'lodash/flow';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './item-types';

const style = {
    width: 500,
    border: '1px dashed gray',
    transitionDuration: '300ms',
    padding: '0.5rem 1rem',
    backgroundColor: 'white',
    cursor: 'move',
};

const cardSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index,
        };
    },
};

const cardTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        //// Determine rectangle on screen
        //const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
        //
        //// Get vertical middle
        //const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        //
        //// Determine mouse position
        //const clientOffset = monitor.getClientOffset();
        //
        //// Get pixels to the top
        //const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        //
        //// Only perform the move when the mouse has crossed half of the items height
        //// When dragging downwards, only move when the cursor is below 50%
        //// When dragging upwards, only move when the cursor is above 50%
        //
        //// Dragging downwards
        //if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        //    return;
        //}
        //
        //// Dragging upwards
        //if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        //    return;
        //}

        // Time to actually perform the action
        props.moveCard(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    },
    drop(tt, bb, gg) {
        console.log('--> drop', tt, bb, gg);
    }
};

class Card extends Component {
    state = {
        height: 50,
    };
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        isDragging: PropTypes.bool.isRequired,
        id: PropTypes.any.isRequired,
        text: PropTypes.string.isRequired,
        moveCard: PropTypes.func.isRequired,
    };
    getTransform(index, hoverIndex, dragIndex) {
        if (hoverIndex === index) return `translateY(${68}px)`
        //else return `translateY(${-68}px)`
    }

    render() {
        const {
            text,
            id,
            isDragging,
            connectDragSource,
            connectDropTarget,
            hoverIndex,
            dragIndex,
            index,
            //transform,
        } = this.props;
        const { height } = this.state;
        const opacity = isDragging ? 0 : 1;
        //console.log('--> index', index);
        const transform = this.getTransform(index, hoverIndex, dragIndex);

        return connectDragSource(connectDropTarget(
            <div style={{ ...style, opacity, height, transform }}>
                {' '}
                {text}
                {' '}
                <span style={{ color: 'red', fontWeight: 'bold' }}>
                     {id}
                </span>
            </div>,
        ));
    }
}

export default flow([
    DropTarget(ItemTypes.CARD, cardTarget, connect => ({
        connectDropTarget: connect.dropTarget(),
    })),
    DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    })),
])(Card);