const parseNewline = (value: string) => {
  const parse = value.replace(/\\n/gi, "\n");

  return parse;
};

export default parseNewline;
