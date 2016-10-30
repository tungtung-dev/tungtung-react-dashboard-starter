//Import React
import React,{Component} from 'react';
import {Col} from 'reactstrap';
import Sidebar from './sidebar/index';
import MenuBar  from './menubar/index';
import Header  from './header/index';
import classnames from 'classnames';
import './style.scss';

export default class AppWrapper extends Component {

    constructor() {
        super(...arguments);
        this.state = {
            showSidebar: false
        }
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    toggleSidebar(){
        this.setState({
            showSidebar: !this.state.showSidebar
        })
    }

    componentDidMount() {
        //this.props.loadDefault();
    }

    render() {
        const {isAuthenticated, auth} = this.props;
        return (
            <div className={classnames('dashboard-container', {'show-sidebar': this.state.showSidebar})}>
                <Header isAuthenticated={isAuthenticated} auth={auth}/>
                <div style={{height: 'calc(100% - 48px)'}}>
                    <Sidebar currentPath={this.props.location.pathname} showSidebar={this.state.showSidebar}/>
                    <div className="wrapper">
                        <Col md={12} style={{height: '100%'}}>
                            <MenuBar onClick={this.toggleSidebar} showSidebar={this.state.showSidebar}/>
                            {this.props.children}
                        </Col>
                    </div>
                </div>
            </div>
        )
    }
}
