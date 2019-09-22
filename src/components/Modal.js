import React, {useState, useEffect} from 'react';
import Select from 'react-select';

function SearchBar({show, onClose, children}) {
  const close = (e) => {
    e.stopPropagation();
    onClose && onClose();
  }

  return (
    <React.Fragment>{ show &&
      <div className="backdrop" onClick={close}>
        <div className="modalContainer" onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
    }</React.Fragment>
  );
}

export default SearchBar;
