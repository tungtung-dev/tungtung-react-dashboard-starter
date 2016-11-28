import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import uuid from 'uuid';
import Equal from 'deep-equal';
import {Popover, PopoverContent } from 'reactstrap';
import classnames from 'classnames';
import MediaManager from '../manager_default';
import {Toaster} from '../../layouts';
import "./style.scss";

const Div = ({children, className}) => <div className={className}>{children}</div>
const Span = ({children, className}) => <span className={className}>{children}</span>

export default class ChooseImageWrap extends Component {
    static propTypes = {
        element: PropTypes.oneOf(['div','span']),
        onChoose: PropTypes.func
    }

    state = {
        showFoldersSidebar: false,
        showPopover: false
    }

    shouldComponentUpdate(prevProps, prevState){
        return !Equal(prevProps, this.props) || !Equal(this.state, prevState);
    }

    @autobind
    toggleShowFoldersSidebar(){
        this.setState({showFoldersSidebar: !this.state.showFoldersSidebar});
    }

    @autobind
    chooseMedia(media){
        if(!media.type.match('image/*')){
            Toaster.show({ message: "Invalid image", timeout: 5000, intent: 3});
        }
        else{
            this.props.onChoose(media);
            this.togglePopover();
        }
    }

    getWrap(){
        switch (this.props.element){
            case 'span': return Span;
            default: return Div;
        }
    }

    renderToggleFolderSidebar(){
        return <button className="btn btn-transparent" onClick={this.toggleShowFoldersSidebar}>
            <i className={this.state.showFoldersSidebar ? 'fa fa-close' : 'fa fa-folder'}/> {this.state.showFoldersSidebar ? 'Hide' : 'Show'} Folders
        </button>
    }

    renderMediaManager(){
        return <div className="media-manager-popover-container">
            <MediaManager onChooseMedia={this.chooseMedia} customToolbar={this.renderToggleFolderSidebar()}/>
        </div>
    }

    @autobind
    togglePopover(e){
        if(e) e.preventDefault();
        this.setState({showPopover: !this.state.showPopover});
    }

    render() {
        const Wrap = this.getWrap();
        const popoverName = `popover-${uuid.v4()}`;
        const cloneChildren = React.cloneElement(this.props.children, {
            id: popoverName,
            onClick: this.togglePopover
        })
        return <Wrap className={this.props.className}>
            {cloneChildren}
            <Popover placement="bottom" isOpen={this.state.showPopover} target={popoverName} toggle={this.togglePopover}>
                <PopoverContent className={classnames('media-manager-popover', {'show-folder-sidebars': this.state.showFoldersSidebar})}>
                    {this.renderMediaManager()}
                </PopoverContent>
            </Popover>
        </Wrap>
    }
}