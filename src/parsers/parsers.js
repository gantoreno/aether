const esprima = require('esprima');

exports.lexical = program => {
  try {
    return esprima.tokenize(program);
  } catch (e) {
    return {};
  }
};

exports.syntax = program => {
  try {
    return esprima.parseScript(program);
  } catch (e) {
    return {};
  }
};
