function getRange(startNum, endNum) {
  let arr = [];

  for (let i = startNum; i <= endNum; i++) {
    arr.push(i);
  }

  return arr;
}

export { getRange };
