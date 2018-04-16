# This README is a WIP subject to change.

## Installing

Clone this repository as a folder inside your design system

KATT needs to know some configuration variables, described in the katt.config folder:
* Relative/absolute path to the folder containing the components and example pages, each in their own subfolder;
* Port where the testing server will be executed;
* And folders inside the component folders that are not components and thus should be ignored. Separated by a comma,

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