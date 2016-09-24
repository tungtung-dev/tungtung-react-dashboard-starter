import React from 'react';
import ReactDOM from 'react-dom';
import Root from './redux/Root';

import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import 'font-awesome/scss/font-awesome.scss';
import 'simple-line-icons/scss/simple-line-icons.scss';
import 'animate.css/animate.css';
import 'toastr/toastr.scss';

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./redux/Root', () => {
    const NextApp = require('./redux/Root').default;
    ReactDOM.render(
      <NextApp />,
      document.getElementById('root')
    );
  });
}
