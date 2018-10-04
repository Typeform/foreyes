Foreyes can be run to test a series of React components bundled in a [Design System](https://www.invisionapp.com/inside-design/guide-to-design-systems).

It offers a way to mount them on [Storybook](https://github.com/storybooks/storybook). Thus, two steps are needed to test a design system: prepare the example pages, and running the tests.

Note: `<pathToExamples>` and `<serverPort>` refer to the variables configured when running the Foreyes' setup.

# Preparing the example pages

## Kitchen sink pages

Components usually have a set of configurations that define how they look. A large button may have a bigger font; a button of type "warning" may display reddish colors.

A [Kitchen Sink Page](https://medium.com/eightshapes-llc/component-qa-in-design-systems-b18cb4decb9c) is a page where all these combinations are displayed together.

To create a kitchen sink page, use `yarn foreyes create-file --component <componentName>`. It will attempt to read the **PropTypes** of the component and derive possible combinations from it. This example will be written under `<pathToExamples>/<componentName>.exampleCombinations.js`.

Most likely, there will be attributes that won't be filled automatically (a string has almost infinite values), and you will be asked to fill the combinations.

For instance, for a component button the file could look like:

```javascript
exports.default = {
    size: ['xlarge', 'large', 'medium', 'small'], //filled manually
    iconSvg: [''],
    type: ['level0', 'level1', 'level2', 'warning'],
    children: ['Click here!'] //Special attribute to add text
};
```

Alternative, you can try `yarn foreyes create-all-files`. This will create an example file **for each component in your project** that doesn't already have one.

*Foreyes' development team serves this script as is and does not take responsibility for any gargantuan PRs which may derive from using this power unwisely.*

## Custom template

If you want to test a very specific component configuration (a container with some very specific children), create the file `<pathToExamples>/<componentName>.customExample.js` and fill with a React component. This would work: 

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

# <a name="serving-pages"></a>Serving the pages

Once the examples files are written, use `yarn foreyes run-server`. The pages will be live under `localhost:<serverPort>` as a [Storybook](https://storybook.js.org).

# Text execution

While the [pages are being served](#serving-pages), execute `yarn foreyes test --component <component-folder-name> --isTemplate <are you testing a custom page?>` to run one example.

Use `yarn foreyes test-all` to test all examples. Screenshots will be aptly named for every component and whether it's a kitchen sink or a custom template.

## Running on CI (Travis)

In package.json, add:

```javascript
scripts: {
    "foreyes-start-server": "yarn foreyes run-server &",
    "foreyes-run-tests": "yarn foreyes test-all"
    //...
```

In .travis.yml, add:

```yml
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

# Decorators

You can put additional [Storybook decorations](https://storybook.js.org/basics/writing-stories/#using-decorators) around a component. Use `foreyesConfig/decorator.js` accordingly. This is useful if you have React wrapper components that add supporting code such as font styles and families.
