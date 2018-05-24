import React from 'react';
import { configure, storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import examples from './componentsWithExamplePages'
import ComponentExample from './componentExample'
import BaseStyles from '../../src/components/base-styles'
const config = require('../katt.config')


addDecorator(story => (
    <BaseStyles>
        {story()}
    </BaseStyles>
))

function loadStories() {
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
configure(loadStories, module);