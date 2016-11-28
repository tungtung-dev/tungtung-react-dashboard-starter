// Import react
import React from 'react';
import {Route, IndexRoute} from 'react-router';

// Import components
import {AppContainer, AuthContainer, UserManager, Layout, PostManager, Examples} from './containers/index';
import MediaManager from './components/media-manager/index'
import {AuthenticatedComponent as requireAuth} from './containers/libs/index';

export default () => {
    return (
        <Route path="/" component={AppContainer}>
            <Route component={requireAuth(Layout.LayoutAuthenticated)}>
                <IndexRoute component={PostManager.Lists}/>
                <Route path="/posts"component={PostManager.Wrapper}>
                    <IndexRoute components={PostManager.Lists}/>
                    <Route path="create" component={PostManager.Create}/>
                    <Route path="edit/:postSlug" component={PostManager.Edit}/>
                    <Route path=":postSlug" component={PostManager.View}/>
                </Route>
                <Route path="/users" component={UserManager.Wrapper}>
                    <IndexRoute component={UserManager.Lists}/>
                </Route>
                <Route path="/media" component={MediaManager}></Route>
                <Route path="/examples/page-tabs" components={Examples.PageTabs}/>
            </Route>
            <Route path="/auth">
                <Route path="login" component={AuthContainer.Login}/>
                <Route path="register" component={AuthContainer.Register}/>
                <Route path="logout" component={AuthContainer.Logout}/>
                <Route path="forgot-password" component={AuthContainer.ForgotPassword}/>
                <Route path="new-password" component={AuthContainer.NewPassword}/>
                <Route path="change-password" component={AuthContainer.ChangePassword}/>
            </Route>
        </Route>
    )
}