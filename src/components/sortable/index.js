import React, { Component } from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './card';

const style = {
    border: '1px solid red',
    width: '100%',
};

class Sortable extends Component {
    state = {
        cards: [{
            id: 1,
            text: 'Write a cool JS library',
        }, {
            id: 2,
            text: 'Make it generic enough',
        }, {
            id: 3,
            text: 'Write README',
        }, {
            id: 4,
            text: 'Create some examples',
        }, {
            id: 5,
            text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
        }, {
            id: 6,
            text: '???',
        }, {
            id: 7,
            text: 'PROFIT',
        }],
        dragIndex: null,
        hoverIndex: null,
    };


    immutablySwapItems = (items, firstIndex, secondIndex) => {
        // Constant reference - we can still modify the array itself
        const results = items.slice();
        const firstItem = items[firstIndex];
        results[firstIndex] = items[secondIndex];
        results[secondIndex] = firstItem;

        return results;
    }

    moveCard = (dragIndex, hoverIndex) => {
        const { cards } = this.state;
        const dragCard = cards[dragIndex];

        this.setState(state => ({
            //cards: this.immutablySwapItems(cards, dragIndex, hoverIndex),
            dragIndex,
            hoverIndex,
        }));
    }

    render() {
        const { cards, hoverIndex, dragIndex } = this.state;
        console.log('--> dragIndex', dragIndex);
        console.log('--> hoverIndex', hoverIndex);

        return (
            <DragDropContextProvider backend={HTML5Backend}>
                <div style={style}>
                    {cards.map((card, i) => (
                        <Card
                            dragIndex={dragIndex}
                            hoverIndex={hoverIndex}
                            key={card.id}
                            index={i}
                            id={card.id}
                            text={card.text}
                            cardDrop={this.cardDrop}
                            moveCard={this.moveCard}
                        />
                    ))}
                </div>
            </DragDropContextProvider>
        );
    }
}

export default Sortable;