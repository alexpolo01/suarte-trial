import _ from 'lodash';

/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
function getObjectDiff(object, base) {
  function changes(object, base) {
    return _.transform(object, function(result, value, key) {
      if (!_.isEqual(value, base[key])) {
        result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
      }
    });
  }
  return changes(object, base);
}

function flattenObject(obj) {
  let returnable = {};
  let objKeys = Object.keys(obj);
  for (let i = 0; i < objKeys.length; i++) {
    if (typeof obj[objKeys[i]] === "object") {
      let aux = { ...returnable, ...flattenObject(obj[objKeys[i]]) };
      returnable = aux;
    } else {
      returnable[objKeys[i]] = obj[objKeys[i]];
    }
  }
  return returnable;
}

function areObjectsDifferent(object, base) {
  return !_.isEqual(object, base);
}

function objectContains(attributeToSearch, object) { // Attribute can be simple and anidated like: "a" or "a.b.c.user_data"
  const attributes = attributeToSearch.split(".");
  let objectIterator = object;
  for(let i=0; i<attributes.length; i++) {
    if(objectIterator[attributes[i]] !== undefined) {
      objectIterator = objectIterator[attributes[i]];
    } else {
      return false;
    }
  }
  return true;
}

function getAttributeValue(attributeToSearch, object) {
  if(!object) return undefined;
  const attributes = attributeToSearch.split(".");
  let objectIterator = object;
  for(let i=0; i<attributes.length; i++) {
    if(objectIterator[attributes[i]] !== undefined) {
      objectIterator = objectIterator[attributes[i]];
    } else {
      return undefined;
    }
  }

  return objectIterator;
}

function copyObject(object) {
  return JSON.parse(JSON.stringify(object));
}

// this is implemented to work with react's state changes detection system. That's why i create copies while i'm deep exploring, because i want to tell react ·"hey, this object has changed"·
// we create copies of every data structure that we are going to modify, so that react doesnt tell us to not mutate the state
function addAttributeToObject(attributeToSearch, value, object) {
  let newObject = { ...object };
  let objectIterator = newObject; // Reference value to update the new object with the new values  
  const attributes = attributeToSearch.split('.');
  const len = attributes.length;
  for(let i = 0; i < len-1; i++) {
    let elem =attributes[i];
    if(!objectIterator[elem]) { 
      objectIterator[elem] = {};
    }
    else {
      objectIterator[elem] = { ...objectIterator[elem] };
    }
    objectIterator = objectIterator[elem];
  }
  objectIterator[attributes[len-1]] = value;
  return newObject;
}

function removeAttributeFromObject(attributeToSearch, object) {
  let newObject = { ...object };
  let objectIterator = newObject; // Reference value to update the new object with the new values  
  const attributes = attributeToSearch.split('.');
  const len = attributes.length;
  for(let i = 0; i < len-1; i++) {
    let elem =attributes[i];
    if(objectIterator[elem] === undefined) {
      return object;
    }
    else {
      objectIterator[elem] = { ...objectIterator[elem] };
      objectIterator = objectIterator[elem];
    }
  }
  delete objectIterator[attributes[attributes.length-1]]; // If we are here, that means that all attributes exist and we only have the last one to check. We delete it without checking because even if it doesnt exist it's an okay response 
  return newObject;
}

function isEmpty(object) {
  return _.isEmpty(object);
}

const ObjectUtils = { 
  objectContains,
  getAttributeValue,
  addAttributeToObject,
  copyObject,
  removeAttributeFromObject,
  getObjectDiff,
  areObjectsDifferent,
  flattenObject,
  isEmpty
};

export default ObjectUtils;