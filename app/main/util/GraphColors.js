"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Color {
    static rgbValue(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash % 256;
    }
    static toColor(apiString) {
        let seed1 = apiString;
        let seed2 = apiString + "a";
        let seed3 = apiString + "x";
        return `rgba(${Color.rgbValue(seed1)}, ${Color.rgbValue(seed2)}, ${Color.rgbValue(seed3)}, 1)`;
    }
}
exports.Color = Color;
//# sourceMappingURL=GraphColors.js.map