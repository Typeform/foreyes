const addDecorator = require('@storybook/react').addDecorator;

addDecorator(story => (
  {story()}
))