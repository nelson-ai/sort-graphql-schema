/* global describe it */
const { assert } = require('chai');
const sortSchema = require('../sortSchema');
const input = require('./input.json');

function findKeysAndNames(obj, keys = [], names = []) {
  if (obj && typeof obj === 'object') {
    Object.keys(obj).forEach(key => {
      keys.push(key);

      if (key === 'name') names.push(obj[key]);

      findKeysAndNames(obj[key], keys, names);
    });
  }

  return { keys, names };
}

function deepRandomize(obj) {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    const newArray = [];
    const keys = Object.keys(obj);

    while (keys.length) {
      const key = keys.splice(Math.floor(Math.random() * keys.length), 1);

      newArray.push(deepRandomize(obj[key]));
    }

    return newArray;
  }

  const newObject = {};
  const keys = Object.keys(obj);

  while (keys.length) {
    const key = keys.splice(Math.floor(Math.random() * keys.length), 1);

    newObject[key] = deepRandomize(obj[key]);
  }

  return newObject;
}

describe('Sorting', () => {

  it('is deterministic', () => {
    assert.deepEqual(sortSchema(input), sortSchema(input));
  });

  it('deeply sorts objects', () => {
    assert.deepEqual(sortSchema(deepRandomize(input)), sortSchema(input));
  });

  it('returns the same schema', () => {
    const {
      keys: expectedKeys,
      names: expectedNames,
    } = findKeysAndNames(input);
    const {
      keys: actualKeys,
      names: actualNames,
    } = findKeysAndNames(sortSchema(input));

    assert.sameMembers(actualKeys, expectedKeys);
    assert.sameMembers(actualNames, expectedNames);
  });

});
