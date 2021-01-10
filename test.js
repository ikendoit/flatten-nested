const { flattenNested } = require("./index");
const inputGraphQL1     = require("./testing-assets/input-graphQL-1.json")
const inputGraphQL2     = require("./testing-assets/input-graphQL-2.json")
const inputGraphQL3     = require("./testing-assets/input-graphQL-3.json")
const outputGraphQL1    = require("./testing-assets/output-graphQL-1.json");
const outputGraphQL2    = require("./testing-assets/output-graphQL-2.json");
const outputGraphQL3    = require("./testing-assets/output-graphQL-3.json");

// GraphQL query sample
const case1 = () => {
  const allPermutations = [];
  // this is the target use case, with value being JSON-leaf-type
  flattenNested(
    inputGraphQL1,
    allPermutations
  );

  // console.log(allPermutations)

  console.assert( JSON.stringify(outputGraphQL1) === JSON.stringify(allPermutations), "Flatten Nested GraphQL use case-1 FAILED." )
  if (allPermutations.length !== 6) {
    throw new Error("Cast Must have 6 rows");
  }
};

const case7 = () => {
  const allPermutations = [];
  // this is the target use case, but can't tell what index each element in values array are when flattenNesting.
  // TODO: in the future: support array-index-prefix for targetted key-path ( new config in "flatConfig" parameter )
  flattenNested(
    inputGraphQL2,
    allPermutations
  );

  // console.log(allPermutations)

  console.assert( JSON.stringify(outputGraphQL2) === JSON.stringify(allPermutations), "Flatten Nested GraphQL use case-3 FAILED." )
  if (allPermutations.length !== 18) {
    throw new Error("Cast Must have 18 rows");
  }
};

const case9 = () => {
  const allPermutations = [];
  // this is the target use case, with value for each timestamp being dictionary of data
  flattenNested(
    inputGraphQL3,
    allPermutations
  );

  // console.log(allPermutations)

  console.assert( JSON.stringify(outputGraphQL3) === JSON.stringify(allPermutations), "Flatten Nested GraphQL use case-3 FAILED." )
  if (allPermutations.length !== 6) {
    throw new Error("Cast Must have 6 rows");
  }
};
const case2 = () => {
  const allPermutations = [];
  flattenNested(
    {
      a: [1, 2],
      b: [3, 4],
      c: "Should have 4 rows, hessian matrix",
    },
    allPermutations
  );

  //console.log(allPermutations)
  if (allPermutations.length !== 4) {
    throw new Error("Case Must have 4 rows");
  }
};

const case3 = () => {
  const allPermutations = [];
  flattenNested(
    {
      a: [1, 2],
      b: [3, 4],
      e: [5, 6],
      c: "random string, should not cause additional rows",
    },
    allPermutations
  );

  //console.log(allPermutations)
  if (allPermutations.length !== 8) {
    throw new Error("Case Must have 8 rows");
  }
};

const case4 = () => {
  const allPermutations = [];
  flattenNested(
    {
      a: [1, 2],
      b: [3, 4],
      e: [5, 6],
      f: [7, 8],
      c: 23123213218,
      g: {
        x: 100,
        y: 101,
      },
    },
    allPermutations
  );

  //console.log(allPermutations)
  if (allPermutations.length !== 16) {
    throw new Error("Case Must have 16 rows");
  }
};

const case5 = () => {
  const allPermutations = [];
  flattenNested(
    {
      manufactureDate: "2020-01-02",
      b: [
        {
          name: "vitamin_b1",
          nutrition: "high",
          healthy: true,
        },
        {
          name: "vitamin_b2",
          nutrition: "lower",
          healthy: true,
        },
      ],
      c: [
        {
          name: "vitamin_c1",
          nutrition: "good",
          healthy: false,
        },
        {
          name: "vitamin_c2",
          nutrition: "typical",
          healthy: true,
        },
      ],
    },
    allPermutations
  );

  //console.log(allPermutations)
  if (allPermutations.length !== 4) {
    throw new Error("Case Must have 4 rows");
  }
};

const case6 = () => {
  const allPermutations = [];
  flattenNested(
    {
      manufactureDate: "2020-01-02",
      b: [1, 2, 34],
      c: [
        {
          x: 100,
          y: {
            ya: 200,
            yb: 300,
          },
        },
        {
          x: 1000,
          y: {
            ya: 2000,
            yb: 3000,
          },
        },
      ],
    },
    allPermutations
  );

  //console.log(allPermutations);
  if (allPermutations.length !== 6){
    throw new Error("Case Must have 6 rows")
  }
};

case1()
case2()
case3()
case4()
case5()
case6()
case7()
case9()
