# Flatten Nested

### Hoping to make this a Lodash utility.

## Goal

I am using a Grafana Plugin that can call GraphQL endpoints, get the JSON response then visualize that JSON object.

Unfortunately, the parsing algorithm of either that graphQL Plugin or Grafana Server gave me non-visualizable flatten array of <column:value>'s ( The arrays in response data are exploded with index value in key names, causing hundred of different columns  )

I made this library in hope to be my first step to fix this problem. Once this is merged on Lodash, I will make a PR to that Plugin, or Grafana source code, depending on where that original algorithm is located, or I will implement a flatten-nested flag on the GraphQL server I maintain.

## What this does

Flatten Nested receives an array of ( dictionary**, JSON-leaf-type* ) and returns a flattened array with all dictionaries exploded.

Check the (testing-assets/)[testing-assets/] to see input and output samples.

*JSON-leaf-type: string/number/boolean/null

## Guide:

npm coming soon, or to be appeared on a future version of Lodash.
```
  node test.js
```

## References:

The Grafana Plugin that visualizes data from GraphQL servers: https://github.com/fifemon/graphql-datasource
