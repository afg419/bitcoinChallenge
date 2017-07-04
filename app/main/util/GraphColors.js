"use strict";
exports.__esModule = true;
var Color = (function () {
    function Color() {
    }
    Color.rgbValue = function (str) {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash % 256;
    };
    Color.toColor = function (apiString) {
        var seed1 = apiString;
        var seed2 = apiString + "a";
        var seed3 = apiString + "x";
        return "rgba(" + Color.rgbValue(seed1) + ", " + Color.rgbValue(seed2) + ", " + Color.rgbValue(seed3) + ", 1)";
    };
    return Color;
}());
exports.Color = Color;
