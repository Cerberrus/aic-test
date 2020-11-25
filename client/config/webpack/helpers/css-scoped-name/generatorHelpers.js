const fs = require('fs');
const path = require('path');

const getGeneratorDataPath = generatorIdentifier => (
    path.resolve(__dirname, `${generatorIdentifier}.json`)
);

const getGeneratorData = (generatorIdentifier) => {
    const path = getGeneratorDataPath(generatorIdentifier);

    if (fs.existsSync(path)) {
        return require(path);
    }

    return {};
};

const saveGeneratorData = (generatorIdentifier, uniqIds) => {
    const path = getGeneratorDataPath(generatorIdentifier);
    const data = JSON.stringify(uniqIds, null, 2);

    fs.writeFileSync(path, data, 'utf-8');
};

module.exports = {
    getGeneratorData,
    saveGeneratorData,
};