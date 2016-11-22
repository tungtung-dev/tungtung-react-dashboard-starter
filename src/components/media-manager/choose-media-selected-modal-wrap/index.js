import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import Equal from 'deep-equal';
import MediaManagerModal from '../manager-modal/index';
import {Toaster} from '../../layouts';

const Div = ({children, className}) => <div className={className}>{children}</div>
const Span = ({children, className}) => <span className={className}>{children}</span>

export default class ChooseImageWrap extends Component {
    static propTypes = {
        element: PropTypes.oneOf(['div','span']),
        onChoose: PropTypes.func
    }

    state = {
        showModal: false
    }

    shouldComponentUpdate(prevProps, prevState){
        return !Equal(prevProps, this.props) || !Equal(this.state, prevState);
    }

    @autobind
    toggleModal(e){
        if(e) e.preventDefault();
        this.setState({showModal: !this.state.showModal});
    }

    @autobind
    chooseMediaChecked(medias){
        if(!medias) return ;
        if(medias && medias.length === 0){
            Toaster.show({ message: "Please choose files", timeout: 5000, intent: 3});
            return ;
        }
        this.props.onChoose(medias);
        this.toggleModal();
    }

    @autobind
    chooseMedia(media){
        this.props.onChoose([media]);
        this.toggleModal();
    }

    getWrap(){
        switch (this.props.element){
            case 'span': return Span;
            default: return Div;
        }
    }

    render() {
        const cloneChildren = React.cloneElement(this.props.children, {
            onClick: this.toggleModal
        });
        const Wrap = this.getWrap();
        return <Wrap className={this.props.className}>
            {cloneChildren}
            <MediaManagerModal
                onChooseMedia={this.chooseMedia}
                onChooseMediaChecked={this.chooseMediaChecked}
                isOpen={this.state.showModal}
                toggle={this.toggleModal}
                isMultipleChoose
            />
        </Wrap>
    }
}

