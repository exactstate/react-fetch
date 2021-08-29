"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsOption = exports.CorsOption = exports.Method = void 0;
var Method;
(function (Method) {
    Method["Get"] = "get";
    Method["Post"] = "post";
    Method["Put"] = "put";
    Method["Delete"] = "delete";
    Method["Patch"] = "patch";
    Method["Options"] = "options";
})(Method = exports.Method || (exports.Method = {}));
var CorsOption;
(function (CorsOption) {
    CorsOption["SameOrigin"] = "same-origin";
    CorsOption["Cors"] = "cors";
    CorsOption["NoCors"] = "no-cors";
})(CorsOption = exports.CorsOption || (exports.CorsOption = {}));
var CredentialsOption;
(function (CredentialsOption) {
    CredentialsOption["Omit"] = "omit";
    CredentialsOption["SameOrigin"] = "same-origin";
    CredentialsOption["Include"] = "include";
})(CredentialsOption = exports.CredentialsOption || (exports.CredentialsOption = {}));
