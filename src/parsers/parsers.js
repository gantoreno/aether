import { tokenize, parseScript } from 'esprima';

export function lexical(program) {
  try {
    return tokenize(program);
  } catch (e) {
    return {};
  }
}

export function syntax(program) {
  try {
    return parseScript(program);
  } catch (e) {
    return {};
  }
}
