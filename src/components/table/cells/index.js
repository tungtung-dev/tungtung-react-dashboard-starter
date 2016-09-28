import React, {Component} from 'react';

export class CellFlexAlignCenter extends Component{
    render(){
        return <span style={{display: 'flex', alignItems: 'center', paddingLeft: 10, paddingRight: 10, height: '100%'}}>
            {this.props.children}
        </span>
    }
}

export class CellText extends Component {
    render() {
        const {rowIndex, data, field} = this.props;
        return <CellFlexAlignCenter>
            {data[rowIndex][field]}
        </CellFlexAlignCenter>
    }
}

export default {CellText, CellFlexAlignCenter}