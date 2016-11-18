import React, { PureComponent, PropTypes} from 'react';
import update from 'react/lib/update';
import Card from './card';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)
export default class Container extends PureComponent {
    constructor(props) {
        super(props);
        this.moveCard = this.moveCard.bind(this);
    }

    moveCard(dragIndex, hoverIndex) {
        const { cards } = this.props;
        const dragCard = cards[dragIndex];

        this.props.onChange(update(cards, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard]
            ]
        }));
    }

    render() {
        const { cards, cardComponent, cardProps} = this.props;

        return (
            <div className={`select-multiple-cards ${this.props.className}`}>
                {cards.map((card, i) => {
                    return (
                        <Card {...card}
                              key={card.id}
                              index={i}
                              cardComponent={cardComponent}
                              cardProps={cardProps}
                              moveCard={this.moveCard} />
                    );
                })}
            </div>
        );
    }
}

Container.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string
    })),
    cardComponent: PropTypes.func,
    cardProps: PropTypes.object
}