function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(36).padStart(2, '0'))
    .join('')
    .substr(2, 9);
}

export default (prefix = 'uniqueId') => {
  const randomArr = new Int8Array(10);
  window?.crypto?.getRandomValues(randomArr);
  return `${prefix}_${bufferToHex(randomArr)}`;
};
