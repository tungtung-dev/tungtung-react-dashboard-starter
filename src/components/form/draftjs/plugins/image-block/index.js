import { Entity } from 'draft-js';
import unionClassNames from 'union-class-names';
import React, { Component } from 'react';
import { ResizeableDecorator } from 'draft-js-resizeable-plugin';
import { FocusDecorator } from 'draft-js-focus-plugin';
import { AlignmentDecorator } from 'draft-js-alignment-plugin';
import { ToolbarDecorator } from 'draft-js-toolbar-plugin';
import {cleanProps} from '../../../../../utils';

const propsNeedClean = [`horizontal`, `vertical`, `ratio`, `resizeSteps`, `handles`, `caption`, `isFocused`, `setFocus`, `focusClassName`, `alignmentClassName`, `alignment`, `actions`, `addActions`, `renderToolbar`];

@ResizeableDecorator({
    resizeSteps: 20,
    handles: true,
    vertical: 'auto'
})
@FocusDecorator
@AlignmentDecorator
@ToolbarDecorator()
export class ImageComponent extends Component {
    render() {
        const {
            block,
            className,
            theme = {},
            ...otherProps
        } = this.props;
        // leveraging destructuring to omit certain properties from props
        const {
            blockProps, // eslint-disable-line no-unused-vars
            customStyleMap, // eslint-disable-line no-unused-vars
            customStyleFn, // eslint-disable-line no-unused-vars
            decorator, // eslint-disable-line no-unused-vars
            forceSelection, // eslint-disable-line no-unused-vars
            offsetKey, // eslint-disable-line no-unused-vars
            selection, // eslint-disable-line no-unused-vars
            tree, // eslint-disable-line no-unused-vars
            ...elementProps
        } = otherProps;
        const combinedClassName = unionClassNames(theme.image, className);
        const { src } = Entity.get(block.getEntityAt(0)).getData();
        return (
            <img
                {...cleanProps(propsNeedClean, elementProps)}
                src={src}
                role="presentation"
                className={combinedClassName}
            />
        );
    }
}