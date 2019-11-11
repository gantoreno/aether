import React, { Component } from 'react';

import './Titlebar.css';

export class Titlebar extends Component {
  state = {
    maximized: false,
    prevX: window.screenX,
    prevY: window.screenY,
    prevWidth:
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth,
    prevHeight:
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
  };

  onClose = () => {
    window.close();
  };

  toggleSize = () => {
    let { maximized, prevX, prevY, prevWidth, prevHeight } = this.state;

    if (maximized) {
      window.resizeTo(prevWidth, prevHeight);
      window.moveTo(prevX, prevY);
    } else {
      window.moveTo(0, 0);
      window.resizeTo(window.screen.availWidth, window.screen.availHeight);
    }

    maximized = !maximized;

    this.setState({ maximized });
  };

  minimize = () => {
    window.moveTo(-100000, -100000);
  };

  render() {
    const { maximized } = this.state;

    return (
      <div className='Titlebar'>
        <div className='logo'></div>

        <div className='elements'>
          <div className='title'>{document.title}</div>
        </div>

        <div className='window-buttons'>
          <div className='button' id='min-button' onClick={this.minimize}>
            <span>&#xE921;</span>
          </div>
          {maximized ? (
            <div
              className='button'
              id='restore-button'
              onClick={this.toggleSize}
            >
              <span>&#xE923;</span>
            </div>
          ) : (
            <div className='button' id='max-button' onClick={this.toggleSize}>
              <span>&#xE922;</span>
            </div>
          )}
          <div className='button' id='close-button' onClick={this.onClose}>
            <span>&#xE8BB;</span>
          </div>
        </div>
      </div>
    );
  }
}
