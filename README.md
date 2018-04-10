# This README is a WIP subject to change.

## Installing

Clone this repository as a folder inside your design system

KATT needs to know the path to the folder containing the components' folders. For instance, if a relative path to that folder was `../src/components/`:

```bash
 echo "../src/components" > path_to_components 
```

Observe `galen.config`, which offers a default, but modifiable, configuration for galen. More information in its [official page.](http://galenframework.com/docs/getting-started-configuration/)

Observer `galenTestData.js`, which offers a series of screen sizes and browsers. More information it its [official page.](http://galenframework.com/docs/reference-javascript-tests-guide/#Reusingparameterizationelementtorunonlyonce)