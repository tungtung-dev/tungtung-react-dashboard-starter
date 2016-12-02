import React from 'react';
import {
    ImageSideButton,
    Block,
    addNewBlock,
} from 'medium-draft';
import {ChooseImagePopoverWrap} from 'components/media-manager';

export default class ImageSideButtonComponent extends ImageSideButton {

    /*
     We will only check for first file and also whether
     it is an image or not.
     */
    onChange({originalUrl}) {
        this.props.setEditorState(addNewBlock(
            this.props.getEditorState(),
            Block.IMAGE, {
                src: originalUrl,
            }
        ));
    }

    render() {
        return (
            <ChooseImagePopoverWrap element="span" onChoose={this.onChange}>
                <button
                    className="md-sb-button md-sb-img-button"
                    type="button"
                    title="Add an Image"
                >
                    <i className="fa fa-image"/>
                </button>
            </ChooseImagePopoverWrap>
        );
    }

}
