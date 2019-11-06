import React from "react";
import { SliderConfig, SiteConstants, ApiConstants } from "../constants";
import NodeRSA from "node-rsa";
import { Link } from "react-router-dom";
import $ from "jquery";

export default class Helper {
  static getSliderConfig = param => {
    return {
      ...SliderConfig,
      ...param
    };
  };

  static getPropSum = (arr, prop) => {
    if (!Helper.isObjectEmpty(arr)) {
      return arr.reduce(function(a, b) {
        return a + b[prop];
      }, 0);
    }
  };

  static getValue = (obj, key, defaultValue = "") => {
    if (typeof obj !== "undefined") {
      let keys = Object.keys(obj);
      if (keys.includes(key)) {
        let finding = obj[key];
        if (!finding) {
          return defaultValue;
        } else {
          return finding;
        }
      }
    }
    if (typeof defaultValue !== "undefined") {
      return defaultValue;
    }
  };

  static prependSlash = img => {
    // if (img) {
    //     img = '/' + img;
    // }
    return img;
  };

  static isObjectEmpty = obj => {
    if (typeof obj !== "undefined") {
      return Object.keys(obj).length === 0;
    } else {
      return "false";
    }
  };

  static searchKeyValue = (obj, key, value) => {
    let response = [];
    if (!Helper.isObjectEmpty(obj)) {
      let findings = obj.filter(function(arr) {
        return arr[key] === value;
      });
      if (findings.length > 0) {
        response = findings;
      }
    }
    return response;
  };

  static filterArrayLike = (arr, key, searchTerm) => {
    if (arr.length > 0 && key && searchTerm) {
      return arr.filter(x => x[key].includes(searchTerm));
    } else {
      return arr;
    }
  };

  static filterArray(arr, keys, values, caseSens = true) {
    let result = [];
    if (
      typeof arr !== "undefined" &&
      arr !== null &&
      !Helper.isObjectEmpty(arr) &&
      keys &&
      values
    ) {
      if (caseSens === true) {
        result = arr.filter(function(e) {
          return keys.every(function(a) {
            return values.includes(e[a]);
          });
        });
      } else {
        let sorted = values
          .join("|")
          .toLowerCase()
          .split("|");
        result = arr.filter(function(e) {
          return keys.every(function(a) {
            return sorted.includes(e[a].toLowerCase());
          });
        });
      }
    }
    return result;
  }

  static groupItemBy = (data, index1) => {
    var other = {};
    if (!Helper.isObjectEmpty(data)) {
      var o;
      for (let i = 0; i < data.length; i++) {
        o = data[i][index1];
        if (!(o in other)) other[o] = [];
        other[o].push(data[i]);
      }
    }
    return other;
  };

  static arrayColumn = (arr, n) => {
    return arr.map(x => x[n]);
  };

  static chunk = (arr, chunk_size) => {
    return arr
      .map(function(e, i) {
        return i % chunk_size === 0 ? arr.slice(i, i + chunk_size) : null;
      })
      .filter(function(e) {
        return e;
      });
  };

  static distinct = (arr, prop, defaultValue = []) => {
    if (arr) {
      return arr
        .map(function(e) {
          return e[prop];
        })
        .filter(function(e, i, a) {
          return i === a.indexOf(e);
        });
    } else {
      return defaultValue;
    }
  };

  static removeObjectByKeyValue = (array, key, value) => {
    return array.filter(i => i[[key]] !== value);
  };

  static filterGallery = (array, currentValue) => {
    let gallery = [];
    if (array.length) {
      gallery.push(currentValue);
      array.map((value, i) => {
        if (value !== currentValue) {
          gallery.push(value);
        }
      });
    }
    return gallery;
  };

  static sortProperties = (obj, isNumericSort) => {
    isNumericSort = isNumericSort || false; // by default text sort
    var sortable = [];
    for (var key in obj)
      if (obj.hasOwnProperty(key)) sortable.push([key, obj[key]]);
    if (isNumericSort)
      sortable.sort(function(a, b) {
        return a[1] - b[1];
      });
  };

  static distinctObject = (array, propertyName, defaultValue = []) => {
    if (array.length > 0) {
      return array.filter(
        (e, i) =>
          array.findIndex(a => a[propertyName] === e[propertyName]) === i
      );
    } else {
      return defaultValue;
    }
  };

  static merge = (arr1, arr2, key) => {
    return [
      ...// spread to an array
      new Map(arr1.concat(arr2).map(o => [o[key], o])) // concat and initialize the map
        .values()
    ]; // get the values iterator
  };

  static sortBy = (array, key, order = "asc") => {
    return array.sort(function(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    });
  };

  static getErrorMessage = status => {
    let msg = "";
    switch (status) {
      case 500:
        msg = ApiConstants.API_NO_RESPONDING;
        break;
      case 400:
        msg = ApiConstants.API_PARAMETER_MISSING;
        break;
      case 404:
        msg = ApiConstants.API_RESOURCE_NOT_FOUND;
        break;
      default:
        msg = ApiConstants.DEFAULT_ERROR;
    }
    return msg;
  };

  static aggregateProperty = (obj, property, aggregate, shallow, depth) => {
    //return aggregated value of a specific property within an object (or array of objects..)

    if ((typeof obj !== "object" && typeof obj !== "array") || !property) {
      return;
    }

    obj = JSON.parse(JSON.stringify(obj)); //an ugly way of copying the data object instead of pointing to its reference (so the original data remains unaffected)
    const validAggregates = ["sum", "min", "max", "count"];
    aggregate =
      validAggregates.indexOf(aggregate.toLowerCase()) !== -1
        ? aggregate.toLowerCase()
        : "sum"; //default to sum

    //default to false (if true, only searches (n) levels deep ignoring deeply nested data)
    if (shallow === true) {
      shallow = 2;
    } else if (isNaN(shallow) || shallow < 2) {
      shallow = false;
    }

    if (isNaN(depth)) {
      depth = 1; //how far down the rabbit hole have we travelled?
    }

    var value = aggregate === "min" || aggregate === "max" ? null : 0;
    for (var prop in obj) {
      if (!obj.hasOwnProperty(prop)) {
        continue;
      }

      var propValue = obj[prop];
      var nested =
        typeof propValue === "object" || typeof propValue === "array";
      if (nested) {
        //the property is an object or an array

        if (prop === property && aggregate === "count") {
          value++;
        }

        if (shallow === false || depth < shallow) {
          propValue = Helper.aggregateProperty(
            propValue,
            property,
            aggregate,
            shallow,
            depth + 1
          ); //recursively aggregate nested objects and arrays
        } else {
          continue; //skip this property
        }
      }

      //aggregate the properties value based on the selected aggregation method
      if ((prop === property || nested) && propValue) {
        switch (aggregate) {
          case "sum":
            if (!isNaN(propValue)) {
              value += propValue;
            }
            break;
          case "min":
            if (propValue < value || !value) {
              value = propValue;
            }
            break;
          case "max":
            if (propValue > value || !value) {
              value = propValue;
            }
            break;
          case "count":
            if (propValue) {
              if (nested) {
                value += propValue;
              } else {
                value++;
              }
            }
            break;
        }
      }
    }

    return value;
  };

  static getColumnValueDecrypt = (single, attr) => {
    if (!Helper.isObjectEmpty(single)) {
      attr.map((singleKey, idt) => {
        if (singleKey in single) {
          if (single[singleKey]) {
            single[singleKey] = Helper.rsaDecrypt(single[singleKey]);
          }
        }
      });
    }
    return single;
  };

  static isValidURL = string => {
    if (typeof string !== "undefined" && string !== null && string.length > 0) {
      if (string.indexOf("http://") === 0 || string.indexOf("https://") === 0)
        return true;
      else return false;
    }
  };

  static getBackgroundColor = colors => {
    if (colors) {
      if (colors.length > 0) {
        let colorsObj = colors.split(",");
        if (!Helper.isObjectEmpty(colorsObj) && colorsObj.length > 1) {
          return {
            backgroundImage:
              "linear-gradient(to right," +
              colorsObj[0] +
              "," +
              colorsObj[1] +
              ")"
          };
        } else {
          return { backgroundColor: colors };
        }
      }
    }
  };

  static getQueryString = (field, url) => {
    var href = url ? url : window.location.href;
    var reg = new RegExp("[?&]" + field + "=([^&#]*)", "i");
    var string = reg.exec(href);
    return string ? string[1] : null;
  };

  static getRandomNum = length => {
    let LengthMultiplier = "1";
    for (let i = 0; i <= length; i++) {
      LengthMultiplier += "0";
    }
    return Math.floor(Math.random() * parseInt(LengthMultiplier));
  };

  static getNextXDate = (dateObj, days) => {
    if (dateObj && days) {
      dateObj.setDate(dateObj.getDate() + days);
      return dateObj;
    }
  };
  static titleCase(str) {
    if (typeof str !== "undefined" && str.length) {
      return str
        .toLowerCase()
        .split(" ")
        .map(function(word) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
    }
  }

  static disclaimerFun(shortId, longId) {
    let longClass = $("#" + longId).hasClass("d-none");
    if (longClass) {
      $("#" + shortId).addClass("d-none");
      $("#" + longId).removeClass("d-none");
      $("#disclaimerTestId").html("Read Less");
    } else {
      $("#" + longId).addClass("d-none");
      $("#" + shortId).removeClass("d-none");
      $("#disclaimerTestId").html("Read More");
    }
  }

  static getAllUrlParams = url => {
    // get query string from url (optional) or window
    var queryString = url ? url.split("?")[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {
      // stuff after # is not part of query string, so get rid of it
      queryString = queryString.split("#")[0];

      // split our query string into its component parts
      var arr = queryString.split("&");

      for (var i = 0; i < arr.length; i++) {
        // separate the keys and the values
        var a = arr[i].split("=");

        // set parameter name and value (use 'true' if empty)
        var paramName = a[0];
        var paramValue = typeof a[1] === "undefined" ? true : a[1];

        // (optional) keep case consistent
        paramName = paramName.toLowerCase();
        if (typeof paramValue === "string")
          paramValue = paramValue.toLowerCase();

        // if the paramName ends with square brackets, e.g. colors[] or colors[2]
        if (paramName.match(/\[(\d+)?\]$/)) {
          // create key if it doesn't exist
          var key = paramName.replace(/\[(\d+)?\]/, "");
          if (!obj[key]) obj[key] = [];

          // if it's an indexed array e.g. colors[2]
          if (paramName.match(/\[\d+\]$/)) {
            // get the index value and add the entry at the appropriate position
            var index = /\[(\d+)\]/.exec(paramName)[1];
            obj[key][index] = paramValue;
          } else {
            // otherwise add the value to the end of the array
            obj[key].push(paramValue);
          }
        } else {
          // we're dealing with a string
          if (!obj[paramName]) {
            // if it doesn't exist, create property
            obj[paramName] = paramValue;
          } else if (obj[paramName] && typeof obj[paramName] === "string") {
            // if property does exist and it's a string, convert it to an array
            obj[paramName] = [obj[paramName]];
            obj[paramName].push(paramValue);
          } else {
            // otherwise add the property
            obj[paramName].push(paramValue);
          }
        }
      }
    }

    return obj;
  };

  static getUnique(arr, comp) {
    const unique = arr
      .map(e => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => arr[e])
      .map(e => arr[e]);

    return unique;
  }
}
