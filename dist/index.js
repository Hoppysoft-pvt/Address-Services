"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.match.js");
require("core-js/modules/es.string.split.js");
require("core-js/modules/es.string.starts-with.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _axios = _interopRequireDefault(require("axios"));
var _material = require("@mui/material");
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _Divider = _interopRequireDefault(require("@mui/material/Divider"));
var _Autocomplete = _interopRequireDefault(require("@mui/material/Autocomplete"));
var _CircularProgress = _interopRequireWildcard(require("@mui/material/CircularProgress"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); } // material-ui
function FacebookCircularProgress(props) {
  return /*#__PURE__*/_react.default.createElement(_Box.default, {
    sx: {
      position: "relative",
      marginTop: "1%"
    }
  }, /*#__PURE__*/_react.default.createElement(_CircularProgress.default, _extends({
    variant: "determinate",
    sx: {
      color: theme => theme.palette.grey[theme.palette.mode === "light" ? 200 : 800]
    },
    size: 25,
    thickness: 3.5
  }, props, {
    value: 100
  })), /*#__PURE__*/_react.default.createElement(_CircularProgress.default, _extends({
    variant: "indeterminate",
    disableShrink: true,
    sx: {
      color: theme => theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
      animationDuration: "550ms",
      position: "absolute",
      left: 0,
      ["& .".concat(_CircularProgress.circularProgressClasses.circle)]: {
        strokeLinecap: "round"
      }
    },
    size: 25,
    thickness: 3.5
  }, props)));
}

// ===========================|| ADDRESS - FORMS ||=========================== //

const Address = props => {
  // const
  const indexId = "1e2tq2";
  const apiKey = "hs_2u37ib6w8wz4137f";

  // useState
  const [list1, setList] = (0, _react.useState)([]);
  const [selectedObj, setSelectedObj] = (0, _react.useState)([]);
  const [loading, setLoading] = (0, _react.useState)(false);

  // methods
  const appendStarToWords = str => {
    var words = str.split(/\s+/);
    var modifiedSentence = '';
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      if (i > 0) {
        modifiedSentence += ' ';
      }
      if (word.startsWith('*') || word.startsWith('?')) {
        word = word.substring(1);
      }
      modifiedSentence += word + "*";
    }
    return modifiedSentence;
  };
  const handleSearchAddress = async text => {
    setLoading(true);
    if (!text) {
      setList([]);
      setLoading(false);
      return;
    }
    const [trimmedString, firstWord, secondWord] = (text.trim().match(/^(\S+)(?:\s(.+))?$/) || []).map(str => str || '');
    let luceneQuery = "";
    if (!isNaN(firstWord)) {
      const modifiedStreetQuery = appendStarToWords(secondWord);
      luceneQuery = secondWord ? "number: ".concat(firstWord, " AND street: ").concat(modifiedStreetQuery) : "number: ".concat(firstWord);
    } else {
      const modifiedStreetQuery = appendStarToWords(trimmedString);
      luceneQuery = "street: ".concat(modifiedStreetQuery);
    }
    try {
      var _response$data;
      const response = await _axios.default.post("https://".concat(indexId, ".hoppysearch.com/v1/search"), {
        luceneQuery: luceneQuery
      }, {
        headers: {
          Authorization: apiKey
        }
      });
      setList(response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.documents);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  (0, _react.useEffect)(() => {
    if (props.onChange) {
      props.onChange({
        StreetNumber: selectedObj === null || selectedObj === void 0 ? void 0 : selectedObj.number,
        Street: selectedObj === null || selectedObj === void 0 ? void 0 : selectedObj.street,
        City: selectedObj === null || selectedObj === void 0 ? void 0 : selectedObj.city,
        State: selectedObj === null || selectedObj === void 0 ? void 0 : selectedObj.region,
        ZipCode: selectedObj === null || selectedObj === void 0 ? void 0 : selectedObj.postcode
      });
    }
  }, [selectedObj]);
  return /*#__PURE__*/_react.default.createElement(_material.Container, null, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    justifyContent: "center",
    spacing: 3
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    sm: 10,
    md: 9,
    sx: {
      mt: {
        md: 9,
        xs: 2.5
      },
      mb: {
        md: 9,
        xs: 2.5
      }
    }
  }), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 8,
    sx: {
      mb: -37.5
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Card, {
    sx: {
      mb: 6.25
    },
    elevation: 4
  }, /*#__PURE__*/_react.default.createElement(_material.CardContent, {
    sx: {
      p: 4
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    spacing: 3
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 12,
    sm: 12,
    sx: {
      mt: -1
    }
  }, /*#__PURE__*/_react.default.createElement(_material.InputLabel, {
    style: {
      textAlign: "left",
      marginBottom: 4,
      color: "#808080",
      fontWeight: 500
    }
  }, "Address"), /*#__PURE__*/_react.default.createElement(_Autocomplete.default, {
    options: list1,
    getOptionLabel: option => "".concat(option.number || "", " ").concat(option.street || ""),
    isOptionEqualToValue: (option, value) => option.street === value.street && option.city === value.city && option.hs_guid === value.hs_guid && option.postcode === value.postcode && option.region === value.region,
    renderInput: params => /*#__PURE__*/_react.default.createElement(_material.TextField, _extends({}, params, {
      InputProps: _objectSpread(_objectSpread({}, params.InputProps), {}, {
        endAdornment: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, loading ? /*#__PURE__*/_react.default.createElement(FacebookCircularProgress, null) : null, params.InputProps.endAdornment)
      })
    })),
    renderOption: (props, option, index) => /*#__PURE__*/_react.default.createElement("li", _extends({
      key: option === null || option === void 0 ? void 0 : option.hs_guid
    }, props), /*#__PURE__*/_react.default.createElement(_Box.default, {
      width: "100%"
    }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "button",
      display: "inline",
      color: "textSecondary"
    }, option === null || option === void 0 ? void 0 : option.number, "\xA0"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "button",
      display: "inline"
    }, option === null || option === void 0 ? void 0 : option.street), /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "body2",
      color: "textSecondary",
      fontSize: 12
    }, option === null || option === void 0 ? void 0 : option.city, ",\xA0", option === null || option === void 0 ? void 0 : option.region, ",\xA0", option === null || option === void 0 ? void 0 : option.postcode), /*#__PURE__*/_react.default.createElement(_Divider.default, {
      sx: {
        mt: "1%"
      }
    }))),
    noOptionsText: loading ? "Loading..." : "No options",
    onInputChange: (event, value) => handleSearchAddress(value),
    onChange: (event, newValue) => {
      if (newValue && newValue.street) {
        const selectedIndex = list1.indexOf(newValue);
        const obj = list1[selectedIndex];
        setSelectedObj(obj);
        const fullAddress = "".concat(newValue.number, " ").concat(newValue.street);
        handleSearchAddress(fullAddress);
      } else {
        setSelectedObj({
          city: "",
          region: "",
          postcode: ""
        });
      }
    }
  })), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 12,
    sm: 6,
    sx: {
      mt: -1
    }
  }, /*#__PURE__*/_react.default.createElement(_material.InputLabel, {
    style: {
      textAlign: "left",
      marginBottom: 4,
      color: "#808080",
      fontWeight: 500
    }
  }, "City"), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    value: selectedObj === null || selectedObj === void 0 ? void 0 : selectedObj.city,
    name: "City",
    onChange: event => {
      setSelectedObj(prevObj => _objectSpread(_objectSpread({}, prevObj), {}, {
        city: event.target.value
      }));
    }
  })), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 12,
    sm: 6,
    sx: {
      mt: -1
    }
  }, /*#__PURE__*/_react.default.createElement(_material.InputLabel, {
    style: {
      textAlign: "left",
      marginBottom: 4,
      color: "#808080",
      fontWeight: 500
    }
  }, "State"), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    value: selectedObj === null || selectedObj === void 0 ? void 0 : selectedObj.region,
    name: "State",
    onChange: event => {
      setSelectedObj(prevObj => _objectSpread(_objectSpread({}, prevObj), {}, {
        region: event.target.value
      }));
    }
  })), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 12,
    sm: 12,
    sx: {
      mt: -1
    }
  }, /*#__PURE__*/_react.default.createElement(_material.InputLabel, {
    style: {
      textAlign: "left",
      marginBottom: 4,
      color: "#808080",
      fontWeight: 500
    }
  }, "Zip Code"), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    value: selectedObj === null || selectedObj === void 0 ? void 0 : selectedObj.postcode,
    name: "ZipCode",
    onChange: event => {
      setSelectedObj(prevObj => _objectSpread(_objectSpread({}, prevObj), {}, {
        postcode: event.target.value
      }));
    }
  }))))))));
};
var _default = exports.default = Address;