import React, { Component } from 'react';

import colors from 'colors';

import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/acai.css';

import { lexical, syntax } from '../../../parsers/parsers';

import './Terminal.css';

export class Terminal extends Component {
  state = {
    code: this.props.code,
    tabs: [
      {
        name: 'Lexical',
        active: true,
        output: 'Lexical'
      },
      {
        name: 'Syntax',
        active: false,
        output: 'Syntax'
      },
      {
        name: 'Semantic',
        active: false,
        output: 'Semantic'
      },
      {
        name: 'Output',
        active: false,
        output: ''
      },
      {
        name: 'Console',
        active: false,
        output: []
      }
    ],
    log: []
  };

  UNSAFE_componentWillReceiveProps({ code }) {
    this.setState({ code });
  }

  onClearOutput = () => {
    let { code } = this.state;

    code = '';

    this.setState({ code });
  };

  onCompile = () => {
    let { code, tabs, log } = this.state;

    tabs[0].output = '...';
    tabs[1].output = '...';
    tabs[2].output = '...';
    tabs[3].output = '...';
    tabs[4].output = [];
    log = [];

    this.setState({ tabs, log });

    setTimeout(() => {
      tabs[0].output = JSON.stringify(lexical(code));
      tabs[1].output = JSON.stringify(syntax(code));

      try {
        tabs[2].output = 'No errors have been found in this workplace so far';

        (() => {
          let oldLog = console.log;

          console.log = function(message) {
            log.push(`${colors.green('> ')}${message}\n`);

            oldLog.apply(console, arguments);
          };
        })();

        // eslint-disable-next-line no-eval
        tabs[3].output = eval(code);

        tabs[4].output = [...new Set(log)].join('');
      } catch (e) {
        tabs[2].output = `Error: ${e.message}`;
        tabs[3].output = null;
        tabs[4].output = null;
      } finally {
        this.setState({ tabs, log });
      }

      this.onAnimateScroll(document.querySelector('.output'), 150);
    }, 750);
  };

  onAnimateScroll = (someElement, duration) => {
    var start = someElement.scrollTop;
    var end = someElement.scrollHeight;
    var change = end - start;
    var increment = 20;

    function easeInOut(currentTime, start, change, duration) {
      currentTime /= duration / 2;

      if (currentTime < 1) {
        return (change / 2) * currentTime * currentTime + start;
      }

      currentTime -= 1;

      return (-change / 2) * (currentTime * (currentTime - 2) - 1) + start;
    }

    function animate(elapsedTime) {
      elapsedTime += increment;

      var position = easeInOut(elapsedTime, start, change, duration);

      someElement.scrollTop = position;

      if (elapsedTime < duration) {
        setTimeout(function() {
          animate(elapsedTime);
        }, increment);
      }
    }

    animate(0);
  };

  onTabChange = evt => {
    const { id } = evt.target;
    let { tabs } = this.state;

    tabs = tabs.map(tab => {
      return {
        name: tab.name,
        active: tab.name === id ? true : false,
        output: tab.output
      };
    });

    this.setState({ tabs });
  };

  onEvalOutput = code => {
    let output;

    try {
      // eslint-disable-next-line no-eval
      output = eval(code);
    } catch (e) {
      output = '';
    }

    return output;
  };

  render() {
    const { height } = this.props;
    const { tabs } = this.state;
    const { output } = tabs.filter(tab => tab.active)[0];

    return (
      <div className='Terminal'>
        <div className='navigator'>
          <div className='left'>
            {tabs.map(tab => (
              <div
                className={'tab' + (tab.active ? ' active' : '')}
                key={tab.name}
                id={tab.name}
                onClick={this.onTabChange}
              >
                {tab.name}
              </div>
            ))}
          </div>
          <div className='right'>
            <span className='clear play' onClick={this.onCompile}>
              &#xE768;
            </span>
            <span className='close' onClick={this.props.onTerminalToggle}>
              &#xE8BB;
            </span>
          </div>
        </div>
        <div className='output' style={{ height: `calc(${height}px - 94px)` }}>
          <JSONPretty data={output} space='2'></JSONPretty>
        </div>
      </div>
    );
  }
}
