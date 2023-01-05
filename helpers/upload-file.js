const { v4: uuidv4 } = require('uuid');
const path = require('path');

const loadFile = (files, validExtension = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {
    return new Promise((resolve, reject) => {
        const { archive } = files;
        const cutName = archive.name.split('.');
        const extension = cutName[cutName.length - 1];

        //validate extensions
        if (!validExtension.includes(extension)) {
            return reject(`the extension: ${extension} is not allowed`);
        }

        //validate name

        const temporalName = uuidv4() + '.' + extension;

        uploadPath = path.join(__dirname, '../uploads/', folder, temporalName);

        archive.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve(temporalName);
        });
    });
};

module.exports = {
    loadFile
};
