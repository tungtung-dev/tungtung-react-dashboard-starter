import React, { Component, PropTypes } from 'react';
import {autobind} from 'core-decorators';
import update from 'react-addons-update';
import slug from 'slug';
import ValidateWrapControl from '../validate_wrap_control';
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

    @autobind
    deleteMedia(index){
        this.props.onChange(update(this.getMedias(), {
            $splice: [[index, 1]]
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
            onChange: this.changeValueMedia,
            onDelete: this.deleteMedia
        }
        return <ValidateWrapControl {...this.props}>
            <div className="select-multiple-media">
                <CardDragSortable className="media-lists" cards={this.getMedias()} onChange={this.handleChangeSortcard} cardComponent={Media} cardProps={cardProps}/>
                <ChooseMediaSelectedWrap onChoose={this.handleChoose}>
                    <button className="btn btn-default fullwidth">Add file</button>
                </ChooseMediaSelectedWrap>
            </div>
        </ValidateWrapControl>
    }
}

SelectMultipleMedia.propTypes = {
    medias: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string
    })),
    onChange: PropTypes.func
}