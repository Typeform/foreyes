import React from 'react';
import { configure, storiesOf } from '@storybook/react';
import examples from './componentsWithExamplePages'
import customExamples from './componentsWithCustomExamplePages'
import ComponentExample from './componentExample'
require(`${__dirname}/../decorator`)

function loadStories() {
    loadExamples()
    loadCustomExamples()
}

function loadExamples() {
    Object.keys(examples).forEach((item) => {
        storiesOf(item, module).add('default', () => (
            <div>
            <ComponentExample
                possibleAttributesValues={examples[item].combinations}
                reactComponent={examples[item].component}
            />
            </div>
        ))
    })
}

function loadCustomExamples() {
    Object.keys(customExamples).forEach((item) => {
        const Comp = customExamples[item]
        storiesOf(item, module).add('custom', () => (
            <Comp />
        ))
    })
}

configure(loadStories, module);