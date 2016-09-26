// Import react
import React from 'react';
import {Route, IndexRoute} from 'react-router';

// Import components
import {AppContainer, HomeContainer, AuthContainer, ProtectedPageContainer, BookListsContainer, BookContainer} from './containers/index';
import {AuthenticatedComponent as requireAuth} from './containers/libs/index';

export default () => {
    return (
        <Route path="/" component={AppContainer}>
            <IndexRoute component={BookListsContainer.Lists}/>
            <Route path="protected-page" component={requireAuth(ProtectedPageContainer)}/>
            <Route path="book/:id" component={BookContainer.Info}/>
            <Route path="book/:id/read" component={requireAuth(BookContainer.Read)}/>
            <Route path="book/:id/read/chapter/:chapter_id" component={requireAuth(BookContainer.Read)}/>
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