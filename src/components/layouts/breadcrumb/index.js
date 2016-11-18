import {PureComponent, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addBreadcrumb, removeBreadcrumb, updateBreadcrumb} from '../../../redux/actions/DefaultLoadAction';

@connect(() => ({}), (dispatch) => bindActionCreators({addBreadcrumb, removeBreadcrumb, updateBreadcrumb}, dispatch))
export default class Breadcrumb extends PureComponent {
    getBreadcrumb(){
        const {id, icon, href, name} = this.props;
        const breadcrumb = {
            id, icon, href, name
        }
        return breadcrumb;
    }

    componentDidMount(){
        this.props.addBreadcrumb(this.getBreadcrumb());
    }

    componentDidUpdate(){
        this.props.updateBreadcrumb(this.getBreadcrumb());
    }

    componentWillUnmount(){
        this.props.removeBreadcrumb(this.props.id);
    }

    render() {
        return null;
    }
}
Breadcrumb.propTypes = {
    id: PropTypes.string,
    icon: PropTypes.string,
    href: PropTypes.string,
    name: PropTypes.string
}
