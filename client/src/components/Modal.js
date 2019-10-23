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
          <section className="modalContainer" onClick={e => e.stopPropagation()}>
            {children}
          </section>
        </div>
      )}
    </React.Fragment>
  );
}

export default SearchBar;
