import React, {useEffect} from 'react';
import ModelViewer from 'metamask-logo';

function Logo(props) {
  useEffect(() => {
    const viewer = ModelViewer(props);

    document.getElementById('logo-container').appendChild(viewer.container)
  }, []);

  return (
    <span id="logo-container">
    </span>
  );
}

export default Logo;
