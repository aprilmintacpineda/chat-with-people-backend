export function getGraphQLFriendlyFields (fields, exceptions = []) {
  return Object.keys(fields).reduce((value, key) => {
    if (key != 'request' && !exceptions.includes(key)) {
      if (!value) {
        return `${key}: "${fields[key].value}"`;
      }

      return `${value}, ${key}: "${fields[key].value}"`;
    }

    return value;
  }, '');
}