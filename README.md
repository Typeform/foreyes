#### (This README is a WIP subject to change.)

# KATT

[![Build Status](https://travis-ci.com/Typeform/kitt.svg?token=axsNaJqw6sjfoKFeCyDk&branch=master)](https://travis-ci.com/Typeform/kitt)

KATT is the testing tool for all of Typeform's Design Systems.

At this moment, KATT allows you to easily mount pages where all design-valid combinations of a component appear \([kitchen sink pages](https://medium.com/eightshapes-llc/component-qa-in-design-systems-b18cb4decb9c)). There are also helpers to create these pages. For the moment you can manually test the visuals of a component without having to leave the page.

## Getting Started

### Prerequisites

KATT tests `React` components, so it also uses `node.js` and `yarn`. Your Design System project should work with these 3 technologies.

### Installing

_(TBD: how to turn it into a @typeform npm package in order to add it to the Design System project)_

Clone this repository as a folder inside your design system.

KATT needs to know some configuration variables. Fill `katt.config.js`:
* path_to_components: Relative/absolute path to the folder containing the components in the design system, each in their own subfolder;
* path_to_examples: This is where the files that create the testing pages should be.
* component_folder_blacklist: Folders inside the component folders (in the design system) that are not components and thus should be ignored.

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

## Testing a component

In order to test a component you must first provide a page in which it lives. There's two pages you can create (one component can have both!)

### Kitchen sink page

To have a kitchen sink page, you'll use `yarn generate-combinations-for <componentName>`. This script will attempt -automatically- to create a file with all possible combinations of every attribute of a component.

Most likely, there will be attributes that won't be filled (a string has almost infinite values), and you will be asked to fill the combinations yourself. The file will be `<PATH_TO_EXAMPLES>/<componentName>.exampleCombinations.js`.

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

### Custom page

If you want to test a very specific component configuration (with some very specific children), simply create the file `<PATH_TO_EXAMPLES>/<componentName>.customExample.js` and fill with a React component. This would work: 

```javascript
import React from 'react'
import Split from '../src/split'

const SplitExample = () => {
  return (
    <Split>
     <div>very specific child.</div>
    </Split>
  )
}

export default SplitExample
```

That's it! All you need to do is go to the KATT folder and use `yarn start`. Then you can go to your kitchen sink page under `localhost:<PORT>/<componentName>` ("localhost:8080/button"). Repeat for all components you with to test.

### Starting the hard way
If you've just installed KATT on your design system and there are already many untested components, you can use `yarn mass-generate-combinations`. This will call `yarn generate-combinations-for` for every component in your project.

The development team serves this script as is and does not take responsibility for any gargantuan PRs which may derive from using this power unwisely.

## Contributing

Please contact one of the authors to see how you can help! In the future, we hope we can open source this tool and make it public use. 

If you're still lost don't hesitate to join our #moonshots Slack channel!

## Versioning

Until this tool moves out of Alpha, no versioning will be done.

## Authors

Refer to one of the authors for help and issues.

* **Daniel Giralt Len** - *Coordinator and developer*
* **Jordi Pons Llauradó** - *Developer*