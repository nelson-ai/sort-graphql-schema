function sortSchema(schemaPart) {
  if (typeof schemaPart === 'object') {

    if (schemaPart === null) return schemaPart;

    if (Array.isArray(schemaPart)) {
      const strings = [];
      const objects = [];

      schemaPart.forEach(part => {
        const type = typeof part;

        if (type === 'object') objects.push(sortSchema(part));
        else if (type === 'string') strings.push(part);
        else throw new Error(`Unknow type: ${type}`);
      });

      return strings.sort().concat(objects.sort((a, b) => a.name < b.name ? -1 : 1));
    }

    const newObject = {};

    Object.keys(schemaPart)
    .sort()
    .forEach(key => newObject[key] = sortSchema(schemaPart[key]));

    return newObject;
  }

  return schemaPart;
}

module.exports = sortSchema;
