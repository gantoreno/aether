import React from 'react';

import './Tabs.css';

export const Tabs = props => {
  const { files, onTabChange, onTabClose } = props;

  return (
    <div className='Tabs'>
      {files.map(file => {
        return (
          <div
            className={'tab' + (file.active ? ' active' : '')}
            id={file.id}
            key={file.id}
            onClick={onTabChange}
          >
            {file.title}{' '}
            <span className='close' id={file.id} onClick={onTabClose}>
              &#xE8BB;
            </span>
          </div>
        );
      })}
    </div>
  );
};
