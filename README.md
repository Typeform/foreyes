#### (This README is a WIP subject to change.)

# KATT

KATT is the testing tool for all of Typeform's Design Systems.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

KATT tests `React` components, so it also uses `node.js` and `yarn`. Your Design System project should work with these 3 technologies.

### Installing

(TBD: how to turn it into a @typeform npm package in order to add it to the Design System project)

### One time

Clone this repository as a folder inside your design system

KATT needs to know some configuration variables. Copy `katt.config.dist` into `katt.config`.
* PATH_TO_COMPONENTS: Relative/absolute path to the folder containing the components and example pages, each in their own subfolder;
* PORT: Port where the testing server will be executed (just make it one you're not using);
* COMPONENT_FOLDER_BLACKLIST: And folders inside the component folders that are not components and thus should be ignored. Separated by a comma,

For example:

```bash
PATH_TO_COMPONENTS=../src/components/
PORT=8080
COMPONENT_FOLDER_BLACKLIST=__mocks__,a-components-index
```

Remember to give katt.config the proper permissions:

```bash
chmod 711 katt.config
```

Observe `galen.config`, which offers a default, but modifiable, configuration for galen. More information in its [official page.](http://galenframework.com/docs/getting-started-configuration/)

Observer `galenTestData.js`, which offers a series of screen sizes and browsers. More information it its [official page.](http://galenframework.com/docs/reference-javascript-tests-guide/#Reusingparameterizationelementtorunonlyonce)

## Testing a component
For every component, you must add a `<componentName>.exampleCombinations.js` file. It must export (in default) a hash where the key is the name of the attribute and the value is an array containing all the possible values it can take. For instance, for a component button, the file `button.exampleCombinations.js` would look like:

```javascript
exports.default = {
    size: ['xlarge', 'large', 'medium', 'small'],
    fullWidth: [true, false],
    iconPosition: ['left', 'right'],
    iconSvg: [''],
    type: ['level0', 'level1', 'level2', 'warning'],
    children: ['Click here!'] //Special attribute to add text
};
```

## Contributing

(TBD)

## Versioning

(TBD)

## Authors

Refer to one of the authors for help and issues.

* **Daniel Giralt Len** - *Coordinator and developer*
* **Jordi Pons Llauradó** - *Developer*