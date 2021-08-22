# Migration Checklist

## Updated app.js File
- (/) Move API Calls from Client to Server Side, add node-fetch to package.json, require fetch in server file
- (/) Move the Consts to the .env, add the env to package.json, require node-fetch in server file

## Set up Webpack
- (/) created index.js for webpack
- (/) exported functions from app.js and import them in index.js. Export them form there as well.
- (/) rename .css file into scss
- (OPEN) !!! Move event listener and function call for js on load to index.js / (OPEN) Create new function for event listener to be executed on load
- (/) !!! Create on load java script file out of webpack config
- (/) import .scss file into index.js
- (/) Create Webpack Config Files
- (/) Update called functions based on Webpack Config File Setup with exported Library in html files
- (/) update links in html file to import the right files
- (OPEN) Update package.json with webpack necessary functions

- () update folder structure
- () updated server.js express static link to new folder structure

- () write readMe
