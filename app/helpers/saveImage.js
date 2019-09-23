const base64ToImage = require('base64-to-image');
const path = require('path');

module.exports = function (image, namingArray = []) {
    const base64Str = image;
    const filePath = path.join(__dirname, '..', 'images/');
    const fileName = `${(new Date()).getTime()}-${namingArray.join('-')}`;
    const optionalObj = { fileName, type: 'jpeg' };

    return base64ToImage(base64Str,filePath,optionalObj);
}