# ANGULAR 2 & D3v4

This project was created to demonstrate the use of some libraries with Angular2:

- Twitter Bootstrap integration for responsiveness.
- D3v4 integration for drawing shapes on canvas.
- JQuery integration for saving and loading canvas shapes as JSON.


## Bootstrap & JQuery integration

### Install

Install bootstrap dependency: `npm install bootstrap -S`

Install bootstrap typings: `npm install @types/bootstrap -D`

Install JQuery dependency: `npm install jquery -S`

Install jQuery typings: `npm install @types/jquery -D`

Edit the file angular-cli.json as following:

~~~JSON
"styles": [
    "styles.css",
    "../node_modules/bootstrap/dist/css/bootstrap.min.css"
],
"scripts": [
    "../node_modules/jquery/dist/jquery.js", 
    "../node_modules/bootstrap/dist/js/bootstrap.js"
],
~~~

>Import jQuery script in angular-cli.json only if others libraries need jQuery as dependency like bootstrap



### Using Bootstrap

You are now able to use bootstrap in your html files.

### Using JQuery

Import the jQuery library and use it as $ object:

~~~javascript
import * as $ from 'jquery'; // use $ or any variable you prefer
~~~

>Create the jQuery variable from import only if the script hasn't been imported in angular-cli.json
>Otherwise the global import make $ and jQuery variable directly available

~~~javascript
$('#myDiv').append('<h2>Hello world</h2>');
$("#myDiv").css( 'border', '3px solid red' );
~~~

>Now you can use intellisense for jQuery


## D3v4 integration

Install d3 library: `npm install d3 -S`

Install d3 typings: `npm install @types/d3 -D`

Import the d3 library and use it as d3 object: `import * as d3 from 'd3';`


## Installation

1. Clone this repo
2. npm install


## Usage

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request  :smiley:



This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.21.
