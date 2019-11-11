import React, { Component } from 'react';

import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/tomorrow_night';

import dedent from 'dedent';
import PanelGroup from 'react-panelgroup';

import { Tabs } from './tabs/Tabs';
import { Terminal } from './terminal/Terminal';

import './Editor.css';

export default class Editor extends Component {
  state = {
    files: [
      {
        id: '1',
        title: 'newfile1.js',
        active: true,
        display: true,
        mode: 'javascript',
        code: dedent`
          console.log('Hello world!')
        `
      }
    ],
    terminal: {
      show: true,
      size: 206
    }
  };

  componentDidMount = () => {
    let current = this.state.files.filter(file => file.active)[0];
    document.title = `${current.title} - Ark`;
  };

  onInput = evt => {
    let { files } = this.state;
    let current = files.filter(file => file.active)[0];
    let index = files.indexOf(current);

    current.code = evt;

    files[index] = current;

    this.setState({ files });
  };

  onTerminalToggle = () => {
    let { terminal } = this.state;

    terminal.show = !terminal.show;

    this.setState({ terminal });
  };

  onTabChange = evt => {
    if (evt.target.className === 'tab') {
      const { id } = evt.target;
      let { files } = this.state;

      files = files.map(file => ({
        id: file.id,
        title: file.title,
        display: file.display,
        mode: file.mode,
        active: file.id === id ? true : false,
        code: file.code
      }));

      this.setState({ files }, () => {
        let current = this.state.files.filter(file => file.active)[0];
        document.title = `${current.title} - Ark`;
      });
    }
  };

  onPanelUpdate = panels => {
    const { size } = panels[1];
    const { terminal } = this.state;

    terminal.size = size;

    this.setState({ terminal });
  };

  onTabClose = evt => {
    if (evt.target.className === 'close') {
      const { id } = evt.target;
      let { files } = this.state;

      files = files.map(file => ({
        id: file.id,
        title: file.title,
        display: file.id === id ? false : file.display,
        mode: file.mode,
        active: file.active,
        code: file.code
      }));

      files[0].active = true;

      this.setState({ files });
    }
  };

  render() {
    const { size } = this.state.terminal;
    const files = this.state.files.filter(file => file.display);
    const { code, mode } =
      files.length > 0 ? files.filter(file => file.active)[0] : '';

    return (
      <div className='Editor'>
        {files.length > 0 ? (
          <>
            <Tabs
              files={files}
              onTabChange={this.onTabChange}
              onTabClose={this.onTabClose}
            />
            <PanelGroup
              direction='column'
              spacing={0}
              panelWidths={[
                { minSize: 100 },
                { size: size, minSize: 150, resize: 'dynamic' }
              ]}
              onUpdate={this.onPanelUpdate}
            >
              <AceEditor
                name='Editor'
                mode={mode}
                value={code}
                width='100vw'
                theme='tomorrow_night'
                height={
                  'calc(100vh - 35px - ' +
                  (this.state.terminal.show
                    ? this.state.terminal.height + ' - 1px'
                    : '0px') +
                  ')'
                }
                onChange={this.onInput}
                className='editor-window'
                setOptions={{
                  tabSize: 2,
                  useSoftTabs: true,
                  scrollPastEnd: 1,
                  showInvisibles: false,
                  autoScrollEditorIntoView: true
                }}
                wrapEnabled={true}
                editorProps={{ $blockScrolling: true }}
                placeholder='Type something cool here...'
              />
              {this.state.terminal.show ? (
                <Terminal
                  height={size}
                  code={code}
                  mode={mode}
                  onTerminalToggle={this.onTerminalToggle}
                />
              ) : null}
            </PanelGroup>
          </>
        ) : null}
      </div>
    );
  }
}
