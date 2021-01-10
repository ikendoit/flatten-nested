#!/bin/node

// const DEBUG = true;
const DEBUG = false;
const log_text = (...a) => {
  if (DEBUG) console.log(...a);
};

// utils
const isJsonLeafType = (value) => {
  const isStringOrNumberOrBoolean = ["string", "number", "boolean"].includes(
    typeof value
  );
  const isNull = value == null;

  if (isStringOrNumberOrBoolean || isNull) return true;
  return false;
};

/**
 * Refer to docs on how the flatting nested process works.
 * @input object: nested objects or JSON leaf types to flatten
 * @input allPermutationSoFar: Array to keep track of all permutation so far. Pass an empty array here to keep all the generated permuattions.
 * @input flatConfig: Object: contains configurations for nest-penetrating
 *    - keyNames: Array<String>: From what keys to start the flattening nested process during nest-penetrating
 *    - depth: Integer: From what depth to start the flattening nested process during penetrating I mean nest-penetrating
 * @output Array<Object>: array with the objects flattened based on configuration
 */
const flattenNested = (
  inputObject,
  allPermutations = [],
  flatConfig,
  lastVisit = " ",
  overwriteLastVisit = null
) => {
  log_text(JSON.stringify({ ...inputObject }, null, 2));

  let allValidJSONLeafs = true;
  const objKeys = Object.keys(inputObject).sort(); // sort the keys so we go down alphabetically.

  objKeys.forEach((objKey) => {
    const objValue = inputObject[objKey];
    if (isJsonLeafType(objValue)) {
      log_text("pushed json leaf", objKey);
      return;
    } else if (Array.isArray(objValue)) {
      const overallLastVisit = lastVisit;

      objValue.forEach((childArrayEle, childArrayIndex) => {
        const visiting = `${objKey}.${childArrayIndex}`;
        // this key has already been visited before.
        if (lastVisit >= visiting) {
          return;
        }
        lastVisit = visiting;

        if (isJsonLeafType(childArrayEle)) {
          flattenNested(
            {
              ...inputObject,
              [objKey]: childArrayEle,
            },
            allPermutations,
            flatConfig,
            lastVisit
          );
        } else if (Array.isArray(childArrayEle)) {
          log_text("drilling down array object");
          flattenNested(
            {
              ...inputObject,
              [objKey]: childArrayEle,
            },
            allPermutations,
            flatConfig,
            ObjKey
          );
        } else if (typeof objValue == "object") {
          log_text("drilling down array object");

          // next object in iteration will have the "objKey: <objectDict>" removed, and <objectDict> exploded on.
          const mergedObject = {
            ...inputObject,
          };
          delete mergedObject[objKey];

          // want to append parent key as prefix for children key objects
          const childKeys = Object.keys(childArrayEle);
          childKeys.forEach((childKey) => {
            const childFlatKeyOnParent = `${objKey}.${childKey}`;
            mergedObject[childFlatKeyOnParent] = childArrayEle[childKey];
          });

          // pass the merged inputObject into next recursion
          log_text("calling object drill down", lastVisit);
          flattenNested(
            mergedObject,
            allPermutations,
            flatConfig,
            overallLastVisit
          );
        }
      });

      allValidJSONLeafs = false;
      return;
    }

    // last case, this has got to be an object, but using type check in case something invalid like "function".
    if (typeof objValue == "object") {
      // this key has already been visited before.
      if (
        (!overwriteLastVisit && lastVisit >= objKey) ||
        (overwriteLastVisit && overwriteLastVisit >= objKey)
      ) {
        return;
      }
      lastVisit = objKey;

      // next object in iteration will have the "objKey: <objectDict>" removed, and <objectDict> exploded on.
      const mergedObject = {
        ...inputObject,
      };
      delete mergedObject[objKey];

      // want to append parent key as prefix for children key objects
      const childKeys = Object.keys(objValue);
      childKeys.forEach((childKey) => {
        const childFlatKeyOnParent = `${objKey}.${childKey}`;
        mergedObject[childFlatKeyOnParent] = objValue[childKey];
      });

      log_text("calling object drill down", lastVisit);
      flattenNested(mergedObject, allPermutations, flatConfig, lastVisit);
      allValidJSONLeafs = false;
      return;
    }
  });

  if (allValidJSONLeafs) {
    log_text("created: ", inputObject);
    allPermutations.push(inputObject);
  } else {
    log_text("NOT IT", inputObject);
  }
};

module.exports.flattenNested = flattenNested;
