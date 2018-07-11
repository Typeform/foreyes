#### (This README is a WIP subject to change.)

# KATT

[![Build Status](https://travis-ci.com/Typeform/kitt.svg?token=axsNaJqw6sjfoKFeCyDk&branch=master)](https://travis-ci.com/Typeform/kitt)

KATT is the testing tool for all of Typeform's Design Systems.

At this moment, KATT allows you to mount pages where all design-valid combinations of a component appear \([kitchen sink pages](https://medium.com/eightshapes-llc/component-qa-in-design-systems-b18cb4decb9c)). There are also helpers to create these pages. After creating the pages, they will be visually compared across browsers: currently Chrome (master) against Firefox.

## Getting Started

### Prerequisites

KATT tests `React` components, so it also uses `node.js` and `yarn`. Your Design System project should work with these 3 technologies.

### Installing

KATT is a Typeform's NPM package. So configure your NPM token in your project, then add the package:

```bash
echo //registry.npmjs.org/:_authToken=${NPM_TOKEN} > .npmrc
yarn add @typeform/katt
yarn katt setup
```

KATT needs to know some configuration variables. The previous command should have copied `katt.config.js` into your project's root. Here's how to fill the information:
* **path_to_components**: Relative/absolute path to the folder containing the components in the design system, each in their own subfolder;
* **path_to_examples**: Where the files that create the test pages should be.
* **component_folder_blacklist**: Folders inside the component folders (in the design system) that are not components and thus should be ignored.

For example:

```javascript
module.exports = {
    path_to_components: '../src/components/',
    path_to_examples: '../tests/',
    component_folder_blacklist: ['__mocks__','a-components-index','demos','panel-settings','base-styles'],
}
```

Remember to give katt.config.js the proper permissions:

```bash
chmod 711 katt.config.js
```

## Preparing the pages

In order to test a component you must first provide a page in which it lives. There's two pages you can create (one component can have both!)

### Kitchen sink page

To have a kitchen sink page, you'll use `katt generate-combinations-for -- --component <componentName>`. This script will attempt -automatically- to create a file with all possible combinations of every attribute of a component. These attributes must be **documented in the PropTypes**.

Most likely, there will be attributes that won't be filled automatically (a string has almost infinite values), and you will be asked to fill the combinations yourself. The file will be `<PATH_TO_EXAMPLES>/<componentName>.exampleCombinations.js`.

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

### Custom template

If you want to test a very specific component configuration (a container with some very specific children), create the file `<PATH_TO_EXAMPLES>/<componentName>.customExample.js` and fill with a React component. This would work: 

```javascript
import React from 'react'
import Split from '../src/split'
import Button from '../src/button'

const SplitExample = () => {
  return (
    <Split>
     <div>very specific child. You can also have other components in this template</div>
     <Button> New component! </Button>
    </Split>
  )
}

export default SplitExample
```

*Automatically testing these template pages is TBD.*

### Alternative: Starting the hard way
If you've just installed KATT on your design system and there are already many untested components, you can use `katt mass-generate-combinations`. This will call `katt generate-combinations-for` for every component in your project, **thus creating a file for each one**.

KATT's development team serves this script as is and does not take responsibility for any gargantuan PRs which may derive from using this power unwisely.

## <a name="serving-pages"></a>Serving the pages

Once the examples files are written, use `katt start`. The pages will be live under `localhost:8080` as a [Storybook](https://storybook.js.org).

### Decorators

You can put additional [Storybook decorations](https://storybook.js.org/basics/writing-stories/#using-decorators) around a component. Copy `decorator.dist.js` into `decorator.js` and fill accordingly. This is especially useful if you have React components that add supporting code such as font styles and families.

## Running the tests

While the [pages are being served](#serving-pages), execute `katt visual-test-for -- --component <component-folder-name>`. Browsers will start opening, that's expected.

This will output three screenshots:
* Chrome screenshot as the baseline (we assume developers develop in Chrome and thus Chrome visuals are correct)
* Firefox screenshot
* Diff screenshot.

Additionally the console will output the mismatch percentage, if any.

*Next steps: Run all available tests in succession*

## Authors

Refer to one of the authors for help and issues.

* **Daniel Giralt Len** - *Coordinator and developer*
* **Jordi Pons Llauradó** - *Developer*
