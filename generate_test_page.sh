COMPONENT=$1
TEST_TYPE=$2

if [ "$TEST_TYPE" == "layout" ]; then
    echo "Creating a layout test page for $COMPONENT"
elif [ "$TEST_TYPE" == "visual" ]; then
    echo "Creating a visual test page for $COMPONENT"
else
    echo "Unrecognized test type $TEST_TYPE"
fi