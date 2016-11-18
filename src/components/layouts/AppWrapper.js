import React,{PureComponent} from 'react';
import Sidebar from './sidebar/index';
import Header  from './header/index';
import classnames from 'classnames';
import './style.scss';

export default class AppWrapper extends PureComponent {
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

    render() {
        const {isAuthenticated, auth} = this.props;
        return (
            <div className={classnames('dashboard-container', {'show-sidebar': this.state.showSidebar})}>
                <Header isAuthenticated={isAuthenticated} auth={auth}/>
                <div style={{height: 'calc(100% - 48px)'}}>
                    <Sidebar currentPath={this.props.location.pathname} showSidebar={this.state.showSidebar}/>
                    <div className="wrapper">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}
