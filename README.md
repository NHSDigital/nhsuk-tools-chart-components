# NHS.UK Tools Chart components

This repository contains the code for NHS.UK Chart components

These chart components are designed for visualizing Body Mass Index (BMI), Child Body Mass Index (CBMI), and Blood Pressure (BP) data.

Initially, these charts were integrated into separate codebases for each of the individual tools. To support consistency and reusability across NHS projects, we have migrated these chart components into a dedicated library.

A storybook instance for the components can be found in `https://tools-graph-components.nhswebsite-dev.nhs.uk/?path=/docs/welcome--docs`

## Installation

Ensure you have Node.js 20.x.x. installed. Usage of NVM is recommended, to allow for easily switching between versions on different projects.

`npm install` will install dependencies.

## Build

`npm run build` will build the project.

## Build storybook

`npm run storybook` will build and deploy the storybook locally in `http://localhost:6006/`
