import React from 'react';
import HeadlineOneButton from '../HeadlineThreeButton';
import BlockTypeSelect from '../BlockTypeSelect';

const DefaultBlockTypeSelect = ({ getEditorState, setEditorState }) => (
  <BlockTypeSelect
    getEditorState={getEditorState}
    setEditorState={setEditorState}
    structure={[
      HeadlineOneButton
    ]}
  />
);

export default DefaultBlockTypeSelect;
