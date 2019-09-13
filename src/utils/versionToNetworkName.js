const versionToNetworkName = (version) => {
  var name;
  switch (version) {
    case '1':
      name = 'Ethereum Main Network';
      break;
    case '2':
      name = 'Morden Test network';
      break;
    case '3':
      name = 'Ropsten Test Network';
      break;
    case '4':
      name = 'Rinkeby Test Network';
      break;
    case '42':
      name = 'Kovan Test Network';
      break;
    default:
      name = '';
  }
  console.log(name);

  return name;
}

export default versionToNetworkName;
