import React, { Component } from 'react';

import Editor from './components/editor/Editor';
import { Titlebar } from './layouts/titlebar/Titlebar';

import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <Titlebar />
        <Editor />
      </div>
    );
  }
}
