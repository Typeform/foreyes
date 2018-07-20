#### (This README is a WIP subject to change.)

# KATT

[![Build Status](https://travis-ci.com/Typeform/kitt.svg?token=axsNaJqw6sjfoKFeCyDk&branch=master)](https://travis-ci.com/Typeform/kitt)

KATT is the testing tool for all of Typeform's Design Systems. 

KATT allows you to mount pages with any component's every visual combination \([kitchen sink pages](https://medium.com/eightshapes-llc/component-qa-in-design-systems-b18cb4decb9c)), or your custom templates too. There are also helpers to create these pages. After creating the pages, they will be visually compared across browsers: currently Chrome (master) against Firefox.

## Getting Started

### Prerequisites

KATT tests `React` components, so it also uses `node.js` and `yarn`. Your Design System project should work with these 3 technologies.

### Installing

KATT is a Typeform's **private** NPM package. So configure your NPM token in your project, then add the package:

```bash
echo //registry.npmjs.org/:_authToken=${NPM_TOKEN} > .npmrc
yarn add @typeform/katt
yarn katt setup
```

### (Optional) Configuring in Travis

In package.json, add:
```
scripts: {
    "katt-start-server": "yarn katt run-server &",
    "katt-run-tests": "yarn katt test-all"
    //...
```

In .travis.yml, add:
```
addons:
  chrome: stable

before_install:
  - echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc
  - export MOZ_HEADLESS=1

before_script:
  - yarn katt-start-server

script:
  - yarn katt-run-tests
```

## Preparing the pages

In order to test a component you must first provide a page in which it lives. There's two types: Kitchen Sink or Custom. One component can have one of each.

### Kitchen sink page

To have a kitchen sink page, you'll use `yarn katt create-file --component <componentName>`. This script will attempt -automatically- to create a file with all possible combinations of every attribute of a component. These attributes must be **documented in the PropTypes**.

Most likely, there will be attributes that won't be filled automatically (a string has almost infinite values), and you will be asked to fill the combinations yourself. The file will be `<path_to_examples>/<componentName>.exampleCombinations.js`.

For instance, for a component button, the file could be:

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

If you want to test a very specific component configuration (a container with some very specific children), create the file `<path_to_examples>/<componentName>.customExample.js` and fill with a React component. This would work: 

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

### (Alternative) Starting the hard way
If you've just installed KATT on your design system and there are already many untested components, you can use `yarn katt create-all-files`. This will create an example file **for each component in your project** that doesn't already have one.

*KATT's development team serves this script as is and does not take responsibility for any gargantuan PRs which may derive from using this power unwisely.*

## <a name="serving-pages"></a>Serving the pages

Once the examples files are written, use `yarn katt start-server`. The pages will be live under `localhost:8080` as a [Storybook](https://storybook.js.org).

### Decorators

You can put additional [Storybook decorations](https://storybook.js.org/basics/writing-stories/#using-decorators) around a component. Use `kattConfig/decorator.js` accordingly. This is useful if you have React wrapper components that add supporting code such as font styles and families.

### Running one test

While the [pages are being served](#serving-pages), execute `yarn katt test --component <component-folder-name> --isTemplate <are you testing a custom page?>`. (Browsers may start opening, that's expected)

This will output three screenshots, found in `screenshots/`:
* Chrome screenshot as the baseline (we assume developers develop in Chrome and thus Chrome visuals are correct)
* Firefox screenshot.
* Diff screenshot. Pixels in fuchsia represent difference.

Additionally the console will output the mismatch percentage, if any.

### Running all tests

Use `yarn katt test-all`. Screenshots will be aptly named for every component and whether it's a kitchen sink or a custom template.

Note that with **many** components this may take a while and take some space (~1MB/10 components)

*Next steps: Allow changing tolerance*
*Next steps: Allow changing viewport size*
*Next steps: Host pages in travis somewhere to be grabbed*
*Next steps: Refactor so .storybook config folder doesn't need to be pasted into the root*

## Authors

Refer to one of the authors for help and issues.

* **Daniel Giralt Len** - *Coordinator and developer*
* **Jordi Pons Llauradó** - *Developer*
