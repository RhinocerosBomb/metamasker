const enterKeyPress = (e, cb) => {
  if(e.charCode == 13) cb(e);
}

export default enterKeyPress;
