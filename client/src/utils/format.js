export const getInitials = (word) => {
  // b=positon w=matches any word g=repeat the word through all string
  let matches = word.match(/\b(\w)/g);
  return matches.join('');
};

export const formatWord = (word) => word.replace(/\s/g, '-');
