import React, { Component, PropTypes } from 'react';
import {autobind} from 'core-decorators';
import update from 'react-addons-update';
import slug from 'slug';
import {ChooseMediaSelectedWrap} from '../../media_manager/index';
import CardDragSortable from '../card_drag_sortable/index';
import Media from './media';
import "./style.scss";

export default class SelectMultipleMedia extends Component {
    getMedias(){
        if(Array.isArray(this.props.medias)){
            return this.props.medias;
        }
        return [];
    }

    @autobind
    handleChangeSortcard(medias) {
        this.props.onChange(medias);
    }

    @autobind
    changeValueMedia(index, key, value){
        this.props.onChange(update(this.getMedias(), {
            [index]: {
                [key]: {
                    $set: value
                }
            }
        }))
    }

    changeIdMedias(medias){
        return medias.map((media, index) => ({
            ...media,
            id: `${media.id}${slug(new Date())}${index}`
        }))
    }

    @autobind
    handleChoose(medias){
        this.props.onChange([
            ...this.getMedias(),
            ...this.changeIdMedias(medias)
        ]);
    }

    render() {
        const cardProps = {
            onChange: this.changeValueMedia
        }
        return <div className="select-multiple-media">
            <CardDragSortable className="media-lists" cards={this.getMedias()} onChange={this.handleChangeSortcard} cardComponent={Media} cardProps={cardProps}/>
            <ChooseMediaSelectedWrap onChoose={this.handleChoose}>
                <button className="btn btn-default fullwidth">thêm file</button>
            </ChooseMediaSelectedWrap>
        </div>
    }
}

SelectMultipleMedia.propTypes = {
    medias: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string
    })),
    onChange: PropTypes.func
}