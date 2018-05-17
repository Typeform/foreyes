import React from "react";
import BaseStyles from "../../src/components/base-styles";
const cartesianProduct = require("cartesian-product");

const separateKeysAndValues = (combinations) => {
    const [keys, values] = [Object.keys(combinations), Object.values(combinations)];
    const combinedValues = cartesianProduct(values);
    return {keys, combinedValues};
}

const mountAllComponentInstances = (Component, combinations) => {
    const {keys, combinedValues} = separateKeysAndValues(combinations);

    const keyedCombinedValues = combinedValues.map(values => {
        const res = {}
        keys.forEach((key, i) => {
            res[key] = values[i]
        })
        return res
    })

    return keyedCombinedValues.map((props, i) => <Component key={i} {...props}/>)
}

const ComponentExample = (props) => {
    return (
        <BaseStyles>
            {mountAllComponentInstances(props.reactComponent, props.possibleAttributesValues)}
        </BaseStyles>
    );
};

export default ComponentExample;