COMPONENTS_PATH="../KITT/src/components"
declare -a COMPONENT_BLACKLIST=("__mocks__" "a-components-index")

EXAMPLES_FILE='pages_server/componentsWithExamplePages.js'
GALEN_LAYOUTS_FILE='test_scripts/componentsWithLayoutTest.js'
GALEN_VISUALS_FILE='test_scripts/componentsWithVisualTest.js'
>$GALEN_LAYOUTS_FILE
>$GALEN_VISUALS_FILE
>$EXAMPLES_FILE

echo "const examples={" >> $EXAMPLES_FILE
echo "const layoutTestableComponents=[" >> $GALEN_LAYOUTS_FILE
echo "const visualTestableComponents=[" >> $GALEN_VISUALS_FILE

containsElement () {
  local e match="$1"
  shift
  for e; do [[ "$e" == "$match" ]] && return 0; done
  return 1
}

for entry in "$COMPONENTS_PATH"/*
do
  if [ -f $entry ]; then 
    continue 
  fi
  COMPONENT=`basename $entry`
  #TODO: continue if in blacklist
  LAYOUT_TEST="$entry/$COMPONENT.layoutTest.js"
  VISUAL_TEST="$entry/$COMPONENT.visualTest.js"
  if [ -f $LAYOUT_TEST ]; then
    echo "\t${COMPONENT//-/_}:require('../$LAYOUT_TEST').default," >> $EXAMPLES_FILE
    echo "\t'$COMPONENT'," >> $GALEN_LAYOUTS_FILE
  elif  [ -f $VISUAL_TEST ]; then
    echo "\t${COMPONENT//-/_}:require('../$VISUAL_TEST').default," >> $EXAMPLES_FILE
    echo "\t'$COMPONENT'," >> $GALEN_VISUALS_FILE
  else
    echo "WARNING: No tests written for component $COMPONENT"
  fi
done

echo "};\nexport default examples;" >> $EXAMPLES_FILE
echo "];" >> $GALEN_LAYOUTS_FILE
echo "];" >> $GALEN_VISUALS_FILE

#galen test ./test_scripts/layout.js