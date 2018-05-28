import React from 'react';
import { configure, storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import examples from './componentsWithExamplePages'
import customExamples from './componentsWithCustomExamplePages'
import ComponentExample from './componentExample'
import BaseStyles from '../../src/components/base-styles'
const config = require('../katt.config')


addDecorator(story => (
    <BaseStyles>
        {story()}
    </BaseStyles>
))

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