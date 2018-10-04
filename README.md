#### (This README is a WIP subject to change.)

# Foreyes
## 📺  Visually detects changes accross browsers in any of your projects! 

[![Build Status](https://travis-ci.com/Typeform/kitt.svg?token=axsNaJqw6sjfoKFeCyDk&branch=master)](https://travis-ci.com/Typeform/Foreyes)

Foreyes allows you to visually compare pages using many different approaches:
- Any given URL (See [running against a URL](#Running-against-a-URL))
- Pages mounted with every component's visual combination \([kitchen sink pages](https://medium.com/eightshapes-llc/component-qa-in-design-systems-b18cb4decb9c)), 
- Your custom templates. There are also helpers to create these pages. 

After creating the pages, they will be visually compared across browsers. Chrome acts as a master layout against Firefox and IE11.

## Getting Started

### Prerequisites

Foreyes uses `node.js` and `yarn` to execute the urls or components and compare the differences. Your project should work with these 3 technologies to work seamlessly.

At the moment, IE11 is run on browserstack. Be sure to add these ENV vars on your machine with your data.
```
BROWSERSTACK_USERNAME
BROWSERSTACK_KEY
```

### Installing

Foreyes is a Typeform's **private** NPM package. So configure your NPM token in your project, then add the package:

```bash
echo //registry.npmjs.org/:_authToken=${NPM_TOKEN} > .npmrc
yarn add @typeform/foreyes
yarn foreyes setup
```

### (Optional) Configuring in Travis

In package.json, add:
```
scripts: {
    "foreyes-start-server": "yarn foreyes run-server &",
    "foreyes-run-tests": "yarn foreyes test-all"
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
  - yarn foreyes-start-server

script:
  - yarn foreyes-run-tests
```

## Execution
### Running against a URL

Foreyes can visually compare URLs directly. Add URLs to the list in the `foreyesConfig/fixturesUrls.json`. Then use `yarn foreyes test-urls`

Screenshots will be saved under the specified folder in the setup. Keep in mind each execution will replace the old screenshots.

*Next steps: Refactor so .storybook config folder doesn't need to be pasted into the root*

### Running against React components
If you're interested in visually compare specific mounted components, check out this [cool guide!](./react-components.md)

## Authors

Refer to one of the authors for help and issues.

* **Daniel Giralt Len** - *Coordinator and developer*
* **Jordi Pons Llauradó** - *Developer*
* **Toni Feliu** - *Developer*
* **Pau Boix** - *Developer*
