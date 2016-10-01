// Import react
import React from 'react';
import {Route, IndexRoute} from 'react-router';

// Import components
import {AppContainer, AuthContainer, QuizListManager, UserManagerContainer, Layout, PostManager} from './containers/index';
import {AuthenticatedComponent as requireAuth} from './containers/libs/index';

export default () => {
    return (
        <Route path="/" component={AppContainer}>
            <Route component={requireAuth(Layout.LayoutAuthenticated)}>
                <IndexRoute component={QuizListManager}/>
                <Route path="/users" component={UserManagerContainer}/>
                <Route path="/post" component={PostManager.PostForm}/>
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