import React from 'react';

function SearchBar({ show, onClose, children }) {
  const close = e => {
    e.stopPropagation();
    onClose && onClose();
  };

  return (
    <React.Fragment>
      {show && (
        <div className="backdrop" onClick={close}>
          <div className="modalContainer" onClick={e => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default SearchBar;
