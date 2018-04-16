function contains() {
    local n=$#
    local value=${!n}
    for ((i=1;i < $#;i++)) {
        if [ "${!i}" == "${value}" ]; then
            echo "y"
            return 0
        fi
    }
    echo "n"
    return 1
}
source ./katt.config

EXAMPLES_FILE="pages_server/componentsWithExamplePages.js"
GALEN_LAYOUTS_FILE="test_scripts/componentsWithLayoutTest.js"
GALEN_VISUALS_FILE="test_scripts/componentsWithVisualTest.js"

EXAMPLES_TEXT="const examples={\n"
LAYOUTS_TEXT="const layoutTestableComponents=[\n"
VISUALS_TEXT="const visualTestableComponents=[\n"

COMPONENT_FOLDER_BLACKLIST=(${COMPONENT_FOLDER_BLACKLIST//,/ })

for entry in "$PATH_TO_COMPONENTS"/*
do
  if [ -f $entry ]; then
    continue
  fi
  COMPONENT=`basename $entry`
  if [ $(contains "${COMPONENT_FOLDER_BLACKLIST[@]}" "$COMPONENT") == "y" ]; then
    continue
  fi
  LAYOUT_TEST="$entry/$COMPONENT.layoutTest.js"
  VISUAL_TEST="$entry/$COMPONENT.visualTest.js"
  if [ -f $LAYOUT_TEST ]; then
    EXAMPLES_TEXT="$EXAMPLES_TEXT\t${COMPONENT//-/_}:require('../$LAYOUT_TEST').default,\n"
    LAYOUTS_TEXT="$LAYOUTS_TEXT\t'$COMPONENT',\n"
  elif  [ -f $VISUAL_TEST ]; then
    EXAMPLES_TEXT="$EXAMPLES_TEXT\t${COMPONENT//-/_}:require('../$VISUAL_TEST').default,\n"
    VISUALS_TEXT="$VISUALS_TEXT\t'$COMPONENT',\n"
  else
    echo "WARNING: No tests written for component $COMPONENT"
  fi
done

EXAMPLES_TEXT="$EXAMPLES_TEXT};\nexport default examples;"
LAYOUTS_TEXT="$LAYOUTS_TEXT];"
VISUALS_TEXT="$VISUALS_TEXT];"

echo $EXAMPLES_TEXT > $EXAMPLES_FILE
echo $LAYOUTS_TEXT > $GALEN_LAYOUTS_FILE
echo $VISUALS_TEXT > $GALEN_VISUALS_FILE
echo "var config = {\n\tcomponentsSrcURI: '$PATH_TO_COMPONENTS'\n};" > 'test_scripts/config.js'
