
# Running against template pages

In order to test a component you must first provide a page in which it lives. There's two types: Kitchen Sink or Custom. One component can have one of each.

## Kitchen sink page

To have a kitchen sink page, you'll use `yarn foreyes create-file --component <componentName>`. This script will attempt -automatically- to create a file with all possible combinations of every attribute of a component. These attributes must be **documented in the PropTypes**.

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

## Custom template

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

# (Alternative) Starting the hard way
If you've just installed Foreyes on your design system and there are already many untested components, you can use `yarn foreyes create-all-files`. This will create an example file **for each component in your project** that doesn't already have one.

*Foreyes' development team serves this script as is and does not take responsibility for any gargantuan PRs which may derive from using this power unwisely.*

## <a name="serving-pages"></a>Serving the pages

Once the examples files are written, use `yarn foreyes start-server`. The pages will be live under `localhost:8080` as a [Storybook](https://storybook.js.org).

# Decorators

You can put additional [Storybook decorations](https://storybook.js.org/basics/writing-stories/#using-decorators) around a component. Use `foreyesConfig/decorator.js` accordingly. This is useful if you have React wrapper components that add supporting code such as font styles and families.

# Running one test

While the [pages are being served](#serving-pages), execute `yarn foreyes test --component <component-folder-name> --isTemplate <are you testing a custom page?>`. (Browsers may start opening, that's expected)

This will output three screenshots, found in `screenshots/`:
* Chrome screenshot as the baseline (we assume developers develop in Chrome and thus Chrome visuals are correct)
* Firefox screenshot.
* Diff screenshot. Pixels in fuchsia represent difference.

Additionally the console will output the mismatch percentage, if any.

# Running all tests

Use `yarn foreyes test-all`. Screenshots will be aptly named for every component and whether it's a kitchen sink or a custom template.

Note that with **many** components this may take a while and take some space (~1MB/10 components)
