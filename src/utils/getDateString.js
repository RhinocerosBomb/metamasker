const monthToString = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

const getDateString = date => {
  return monthToString[date.getMonth()] + ' ' + date.getDate();
};

export default getDateString;
