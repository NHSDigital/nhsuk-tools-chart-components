module.exports = {
  'src/**/*.ts': () => 'npx tsc',
  '**/*.(js|ts)': (filenames) => [
    `npx eslint -- ${filenames.join(' ')}`,
    `npx prettier --write -- ${filenames.join(' ')}`,
  ],
  './*.(md|json)': (filenames) => [
    `npx prettier --write -- ${filenames.join(' ')}`,
  ],
};
