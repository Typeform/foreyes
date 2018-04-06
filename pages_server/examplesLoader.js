const pathToComponents = "../../KITT/src/components"
const layoutExtension = ".layoutTest.js"
const layoutSpecExtension = ".gspec"
const visualExtension = ".visualTest.js"

const examples = {
    toggle: require("../../KITT/src/components/toggle/toggle.visualTest.js").default,
    empty_state: require("../../KITT/src/components/empty-state/empty-state.layoutTest.js").default
}

export default examples;