import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import Equal from 'deep-equal';
import MediaManagerModal from '../manager-modal/index';
import {Toaster} from '../../form';

const Div = ({children, className}) => <div className={className}>{children}</div>
const Span = ({children, className}) => <span className={className}>{children}</span>

export default class ChooseImageWrap extends Component {
    static propTypes = {
        element: PropTypes.oneOf(['div','span']),
        addAlertToast: PropTypes.func,
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
    chooseMedia(media){
        if(!media.type.match('image/*')){
            Toaster.show({ message: "Invalid image", timeout: 5000, intent: 3});
        }
        else{
            this.props.onChoose(media);
            this.toggleModal();
        }
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
            <MediaManagerModal onChooseMedia={this.chooseMedia} isOpen={this.state.showModal} toggle={this.toggleModal}/>
        </Wrap>
    }
}