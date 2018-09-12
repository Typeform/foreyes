#### (This README is a WIP subject to change.)

# KATT
## 📺  Visually detects changes accross browsers in any of your projects! 

[![Build Status](https://travis-ci.com/Typeform/kitt.svg?token=axsNaJqw6sjfoKFeCyDk&branch=master)](https://travis-ci.com/Typeform/KATT)


KATT allows you to visually compare pages using many different approaches:
- Any given URL (See [running against a URL](#Running-against-a-URL))
- Pages mounted with every component's visual combination \([kitchen sink pages](https://medium.com/eightshapes-llc/component-qa-in-design-systems-b18cb4decb9c)), 
- Your custom templates. There are also helpers to create these pages. 

After creating the pages, they will be visually compared across browsers. Chrome acts as a master layout against Firefox and IE11.

## Getting Started

### Prerequisites

KATT uses `node.js` and `yarn` to execute the urls or components and compare the differences. Your project should work with these 3 technologies to work seamlessly.

At the moment, IE11 is run on browserstack. Be sure to add these ENV vars on your machine with your data.
```
BROWSERSTACK_USERNAME
BROWSERSTACK_KEY
```

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

## Execution
### Running against a URL

KATT can visually compare URLs directly. Add URLs to the list in the `kattConfig/fixturesUrls.json`. Then use `yarn katt test-urls`


*Next steps: Refactor so .storybook config folder doesn't need to be pasted into the root*

### Running against React components
If you're interested in visually compare specific mounted components, check out this [cool guide!](./react-components.md)

## Authors

Refer to one of the authors for help and issues.

* **Daniel Giralt Len** - *Coordinator and developer*
* **Jordi Pons Llauradó** - *Developer*
* **Toni Feliu** - *Developer*
* **Pau Boix** - *Developer*
