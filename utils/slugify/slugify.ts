export default (text: string) => {
  return text.replace(/([^0-9آ-یa-z]|-)+/g, '-');
};
