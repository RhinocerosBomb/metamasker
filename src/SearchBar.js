import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import Modal from './Modal';

const customSelectStyles = {
  control: styles => ({
    ...styles,
    background: '#282828',
    boxShadow: 'none',
    border: '1px solid #240090',
    '&:hover': {border: '2px solid #3500D3'}
  }),
  multiValue: styles => ({
    ...styles,
    backgroundColor: '#3500D3',
  }),
  multiValueLabel: styles => ({
    ...styles,
    color: '#fff'
  }),
  menu: styles => ({
    ...styles,
    backgroundColor: '#0C0032',
    border: '1px solid #3500D3'
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isFocused ? '#190061' : '#0C0032',
    '&:hover': {backgroundColor: '#190061'}
  })
};
function SearchBar({show, onClose, ...props}) {
  return (
      <Modal show={show} onClose={onClose}>
        <div className="searchContainer" onClick={e => e.stopPropagation()}>
          <Select styles={customSelectStyles} maxMenuHeight={230} {...props}/>
        </div>
      </Modal>
  );
}

export default SearchBar;
