// Import react
import React from 'react';
import {Route, IndexRoute} from 'react-router';

// Import components
import {
    AppContainer, AuthContainer, UserManager, Layout, PostManager,
    TagManager, CategoryManager, MenuManager, SettingManager, Examples
} from './containers/index';
import MediaManager from './components/media-manager/index'
import {AuthenticatedComponent as requireAuth} from './containers/libs/index';

export default () => {
    return (
        <Route path="/" component={AppContainer}>
            <Route component={requireAuth(Layout.LayoutAuthenticated)}>
                <IndexRoute component={PostManager.Lists}/>
                <Route path="/posts"component={PostManager.Wrapper}>
                    <IndexRoute component={PostManager.Lists}/>
                    <Route path="create" component={PostManager.Create}/>
                    <Route path="edit/:postKey" component={PostManager.Edit}/>
                    <Route path=":postKey" component={PostManager.View}/>
                </Route>
                <Route path="/tags" component={TagManager.Wrapper}>
                    <IndexRoute components={TagManager.Lists}/>
                </Route>
                <Route path="/categories" component={CategoryManager.Wrapper}>
                    <IndexRoute components={CategoryManager.Lists}/>
                </Route>
                <Route path="/users" component={UserManager.Wrapper}>
                    <IndexRoute component={UserManager.Lists}/>
                </Route>
                <Route path="/menus" component={MenuManager.Wrapper}>
                    <IndexRoute component={MenuManager.Lists}/>
                </Route>
                <Route path="/settings" component={SettingManager.Wrapper}>
                    <IndexRoute component={SettingManager.Tabs}/>
                </Route>
                <Route path="/media" component={MediaManager}/>
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