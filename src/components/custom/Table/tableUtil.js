import _ from "lodash";

/**
 * Retrieves the value of a nested property from an object using a dot-separated path.
 * If the nested property does not exist or any intermediary property along the path
 * is null or undefined, the function returns undefined.
 */
function getNestedProperty(obj, path) {
  const parts = path.split(".");
  let property = obj;
  for (let i = 0; i < parts.length; i++) {
    if (property === null || property === undefined) {
      return undefined;
    }
    property = property[parts[i]];
  }
  return property;
}

export function applyFilter(selectedGenre, completeBodyData) {

  return completeBodyData.filter((oneRowData) => {
    let boolean_array = [];
    boolean_array = selectedGenre.reduce((array, singleSelectedGenre) => {
      const pathName = Object.keys(singleSelectedGenre)[0];
     
      let genreCellData = getNestedProperty(oneRowData, pathName);
      const genreList = Object.values(singleSelectedGenre)[0];

      let resourceOrProjectID = null;
      if (typeof genreCellData == "object"){
        resourceOrProjectID = genreCellData ? genreCellData.id : null;
      }
      else {resourceOrProjectID = genreCellData;
      }

      let isMatching;
      if (genreCellData )
     
        isMatching =
          genreList.length === 0 ||

          genreList.some(
            (singleGenreData) => {
              return singleGenreData.id === resourceOrProjectID;
            }
          );

    }, []);
    return boolean_array.every((v) => v === true);
  });
}

export function applySort(filteredBodyData, sortColumn) {
  return _.orderBy(filteredBodyData, sortColumn.path, sortColumn.order);
}

export function addSumLine(itemsDisplayed) {
  /* if the first line in itemsDisplayed is sum line, then remove it */
  if (itemsDisplayed[0].resource.hasOwnProperty("sum")) {
    /* remove and return the first element in array */
    itemsDisplayed.shift();
  }

  const sumObject = {};
  itemsDisplayed.forEach((item) => {
    /* if this line is utilization line then skip it */
    if (item.resource.hasOwnProperty("pillar_item")) {
      return;
    }

    /* 
      calculate the sum value for each column 
      if this line is normal line then calculate the sum number 
    */
    for (const key in item) {
      if (
        key !== "resource" &&
        key !== "project" &&
        key !== "id" &&
        item[key] &&
        item[key].value !== null
      ) {
        if (!sumObject[key]) {
          sumObject[key] = 0;
        }
        sumObject[key] += parseFloat(item[key].value);
      }
    }
  });

  /* 
    resource: { sum: null,} is only for identify whether there is the sum line or not 
    we use resource column to identify the line: 1.normal line 2.utilization line 3.sum line 
  */
  const sumLine = {
    ...sumObject,
    resource: {
      sum: null,
    },
  };

  /* add 'sumLine' to the beginning of itemsDisplayed */
  itemsDisplayed.unshift(sumLine);

  return itemsDisplayed;
}

export function conditionalRenderCurrencyAmount(
  original_amount,
  user_office_id
) {
  if (original_amount != null) {
    let roundup = Math.ceil(parseFloat(original_amount));
    var str = roundup.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
  } else {
    return null;
  }
}

function getNestedValue(obj, key) {
  return key.split(".").reduce((nestedObj, nestedKey) => {
    return nestedObj && nestedObj[nestedKey] !== undefined
      ? nestedObj[nestedKey]
      : null;
  }, obj);
}

export function generateOptions(data, idKey, labelKey, valueKey) {
  console.log('data',data)
  console.log('idKey',idKey)
  const seen = new Set();

  const options = data
    .map((item) => {
      const id = getNestedValue(item, idKey);
      const label = getNestedValue(item, labelKey);
      const value = getNestedValue(item, valueKey);

      return {
        id,
        label,
        value,
      };
    })
    .filter((item) => {
      const k = item.id;
      return seen.has(k) ? false : seen.add(k);
    });

  seen.clear();

  return options;
}