import addDecorator from '@storybook/react'
import React from 'react'

addDecorator(story => <span>{story()}</span>)
