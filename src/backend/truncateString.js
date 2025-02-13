export const truncateString = (str, maxLength) => {
  if (typeof maxLength === 'string' && maxLength.endsWith('cnt')) {
    const percentage = parseFloat(maxLength); // Get the numeric part
    maxLength = calcTruncateWinWidth(percentage); // Convert svw to pixels
  }

  if (str.length > maxLength) {
    return str.slice(0, maxLength) + '...';
  }
  return str;
};

export const calcTruncateWinWidth = (value) => {
  const viewportWidth = window.innerWidth; // Get the width of the viewport
  return Math.floor((value / 100) * viewportWidth); // Calculate the pixel value
};
