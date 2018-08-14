import React from 'react'
import { configure, storiesOf } from '@storybook/react'
import ComponentExample from './componentExample'

const loadExamples = examples => {
  Object.keys(examples).forEach(item => {
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

const loadCustomExamples = customExamples => {
  Object.keys(customExamples).forEach(item => {
    const Comp = customExamples[item]
    storiesOf(item, module).add('custom', () => <Comp />)
  })
}

export default (examples, customExamples) => {
  configure(() => {
    loadExamples(examples)
    loadCustomExamples(customExamples)
  }, module)
}
