/**
 * Check object is not null or undefined
 * @param {*} object 
 * @returns 
 */
const isNotNullOrUndefined = (object) => {
    if (typeof (object) !== "undefined" && object !== null && object !== {}) {
        return true;
    }
    return false;
}

/**
 * Check object array is not null or undefined or empty
 * @param {*} objects
 * @returns 
 */
 const isCollectionNotNullOrUndefined = (objects) => {
    if (typeof (objects) !== "undefined" && objects !== null && objects.length > 0) {
        return true;
    }
    return false;
}

const encode = (input) => {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {
        chr1 = input[i++];
        chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index 
        chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
            keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
}

const Utils = {
    isNotNullOrUndefined,
    encode,
    isCollectionNotNullOrUndefined
};

export default Utils;