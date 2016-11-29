// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './redux/Root';

import 'font-awesome/scss/font-awesome.scss';
import 'simple-line-icons/scss/simple-line-icons.scss';
import "sweetalert2/dist/sweetalert2.min.css";
import 'animate.css/animate.css';
import 'toastr/toastr.scss';
import '@blueprintjs/core/dist/blueprint.css'
import './assets/scss/index.scss';


ReactDOM.render(
  <Root />,
  document.getElementById('root')
);

