# Sort GraphQL Schema

[![npm version](https://badge.fury.io/js/sort-graphql-schema.svg)](https://www.npmjs.com/package/sort-graphql-schema)
[![Build Status](https://travis-ci.org/nelson-ai/sort-graphql-schema.svg?branch=master)](https://travis-ci.org/nelson-ai/sort-graphql-schema)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)

Sort JSON GraphQL schemas for commit consistency.
Useful when using Relay with non-deterministically auto-generated schemas.

## Installation

Runs on Node v6 or higher.

`npm install sort-graphql-schema --save-dev`

## Usage

```js
const fs = require('fs')
const { graphql } = require('graphql');
const { introspectionQuery } = require('graphql/utilities');
const sortSchema = require('sort-graphql-schema');
const schema = require('./path/to/schema');

graphql(schema, introspectionQuery)
.then(result => {
  fs.writeFileSync('/path/to/output.json', JSON.stringify(sortSchema(result), null, 2));

  console.log('Done!');
});
```

## Contributing

Yes, thank you. Please lint, update/write tests and add your name to the package.json file before you PR.

### License

MIT
