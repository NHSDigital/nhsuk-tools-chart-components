/* eslint-disable @typescript-eslint/explicit-function-return-type */
const path = require('path');

module.exports = {
  process(_, filename) {
    return {
      code: `module.exports = ${JSON.stringify(path.basename(filename))};`,
    };
  },
};