# This README is a WIP subject to change.

## Installing

Some scripts require Ruby.

```bash
brew install ruby
```

## Configuration

Clone this repository as a folder inside your design system

KATT needs to know some configuration variables. Copy `katt.config.dist` into `katt.config`.
* PATH_TO_COMPONENTS: Relative/absolute path to the folder containing the components and example pages, each in their own subfolder;
* PORT: Port where the testing server will be executed (just make it one you're not using);
* COMPONENT_FOLDER_BLACKLIST: And folders inside the component folders that are not components and thus should be ignored. Separated by a comma,

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