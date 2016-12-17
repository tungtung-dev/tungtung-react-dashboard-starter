import React, { PropTypes } from 'react';
import {isDescendant} from 'react-sortable-tree';

export default class NodeRendererDefault extends React.PureComponent{
    renderButtonDrag(){
        const {node, connectDragSource} = this.props;
        if (typeof node.children === 'function' && node.expanded) {
            // Show a loading symbol on the handle when the children are expanded
            //  and yet still defined by a function (a callback to fetch the children)
            return (
                <button className="tt-btn-drag btn btn-blue">
                    <i className="fa fa-barcode"/>
                </button>
            );
        } else {
            // Show the handle used to initiate a drag-and-drop
            return connectDragSource((
                <button className="tt-btn-drag btn-transparent btn-black">
                    <i className="fa fa-bars"/>
                </button>
            ), { dropEffect: 'copy' });
        }
    }

    renderButtonCollapse(){
        const {toggleChildrenVisibility, node, path, treeIndex, isDragging} = this.props;
        if(toggleChildrenVisibility && node.children && node.children.length > 0){
            return <button
                aria-label={node.expanded ? 'Collapse' : 'Expand'}
                className={node.expanded ? 'btn btn-black fill tt-card-collapse' : 'btn btn-black fill tt-card-expand'}
                onClick={() => toggleChildrenVisibility({node, path, treeIndex})}
            >
                {(node.expanded && !isDragging) ? '-' :  '+'}
            </button>
        }
        return null;
    }

    redernDetail(){
        const {node} = this.props;
        return <div className="tt-menu-detail">
            {this.props.renderRow(node, this.props)}
        </div>
    }

    componentDidMount(){
        const {node, path, treeIndex} = this.props;
        //this.props.toggleChildrenVisibility({node, path, treeIndex});
    }

    render(){
        const {
            connectDragPreview,
            node,
            draggedNode,
        } = this.props;

        const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);

        return (
            <div className="tt-menu-card">
                {this.renderButtonCollapse()}
                <div>
                    {connectDragPreview(
                        <div className="tt-menu-card-container" style={{opacity: isDraggedDescendant ? 0.5 : 1}}>
                            {this.renderButtonDrag()}
                            {this.redernDetail()}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

NodeRendererDefault.propTypes = {
    node:          PropTypes.object.isRequired,
    path:          PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])).isRequired,
    treeIndex:     PropTypes.number.isRequired,
    isSearchMatch: PropTypes.bool,
    isSearchFocus: PropTypes.bool,

    scaffoldBlockPxWidth:     PropTypes.number.isRequired,
    toggleChildrenVisibility: PropTypes.func,
    buttons:                  PropTypes.arrayOf(PropTypes.node),
    className:                PropTypes.string,
    style:                    PropTypes.object,

    // Drag and drop API functions
    // Drag source
    connectDragPreview: PropTypes.func.isRequired,
    connectDragSource:  PropTypes.func.isRequired,
    startDrag:          PropTypes.func.isRequired, // Needed for drag-and-drop utils
    endDrag:            PropTypes.func.isRequired, // Needed for drag-and-drop utils
    isDragging:         PropTypes.bool.isRequired,
    draggedNode:        PropTypes.object,
    // Drop target
    isOver:  PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
};
