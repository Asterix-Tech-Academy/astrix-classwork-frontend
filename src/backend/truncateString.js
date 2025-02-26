export const truncateString = (str, maxLength) => {
  if (typeof maxLength === 'string' && maxLength.endsWith('cnt')) {
    const percentage = parseFloat(maxLength);
    maxLength = calcTruncateWinWidth(percentage);
  }

  if (str.length > maxLength) {
    return str.slice(0, maxLength) + '...';
  }
  return str;
};

export const calcTruncateWinWidth = (value) => {
  const viewportWidth = window.innerWidth;
  return Math.floor((value / 100) * viewportWidth);
};
