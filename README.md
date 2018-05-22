#### (This README is a WIP subject to change.)

# KATT

KATT is the testing tool for all of Typeform's Design Systems.

At this moment, KATT allows you to easily mount pages where all design-valid combinations of a component appear \([kitchen sink pages](https://medium.com/eightshapes-llc/component-qa-in-design-systems-b18cb4decb9c)). There are also helpers to create these pages. For the moment you can manually test the visuals of a component without having to leave the page.

## Getting Started

### Prerequisites

KATT tests `React` components, so it also uses `node.js` and `yarn`. Your Design System project should work with these 3 technologies.

### Installing

_(TBD: how to turn it into a @typeform npm package in order to add it to the Design System project)_

Clone this repository as a folder inside your design system.

KATT needs to know some configuration variables. Copy `katt.config.dist` into `katt.config`.
* PATH_TO_COMPONENTS: Relative/absolute path to the folder containing the components and example pages, each in their own subfolder;
* PORT: Port where the testing server will be executed (just make it one you're not using);
* COMPONENT_FOLDER_BLACKLIST: And folders inside the component folders that are not components and thus should be ignored. Separated by a comma,

For example:

```bash
PATH_TO_COMPONENTS=../src/components/
PORT=8080
COMPONENT_FOLDER_BLACKLIST=__mocks__,a-components-index,demos,panel-settings
```

Remember to give katt.config the proper permissions:

```bash
chmod 711 katt.config
```

## Testing a component
To have a kitchen sink page, you'll use `yarn generate-combinations-for <componentName>`. This script will attempt -automatically- to create a file with all possible combinations of every attribute of a component.

Most likely, there will be attributes that won't be filled (a string has almost infinite values), and you will be asked to fill the combinations yourself. The file will be `<PATH_TO_COMPONENTS>/<componentName>/<componentName>.exampleCombinations.js`.

For instance, for a component button, the file should be:

```javascript
exports.default = {
    size: ['xlarge', 'large', 'medium', 'small'], //filled manually
    fullWidth: [true, false],
    iconPosition: ['left', 'right'], //filled manually
    iconSvg: [''],
    type: ['level0', 'level1', 'level2', 'warning'],
    children: ['Click here!'] //Special attribute to add text
};
```

That's it! All you need to do is go to the KATT folder and use `yarn start`. Then you can go to your kitchen sink page under `localhost:<PORT>/<componentName>` ("localhost:8080/button"). Repeat for all components you with to test.

### Starting the hard way
If you've just installed KATT on your design system and there are already many untested components, you can use `yarn mass-generate-combinations`. This will call `yarn generate-combinations-for` for every component in your project.

The development team serves this script as is and does not take responsibility for any gargantuan PRs which may derive from using this power unwisely.

## On galen

(TBD)

Observe `galen.config`, which offers a default, but modifiable, configuration for galen. More information in its [official page.](http://galenframework.com/docs/getting-started-configuration/)

Observer `galenTestData.js`, which offers a series of screen sizes and browsers. More information it its [official page.](http://galenframework.com/docs/reference-javascript-tests-guide/#Reusingparameterizationelementtorunonlyonce)

## Contributing

(TBD)

## Versioning

(TBD)

## Authors

Refer to one of the authors for help and issues.

* **Daniel Giralt Len** - *Coordinator and developer*
* **Jordi Pons Llauradó** - *Developer*