import React from 'react';
import Icon from './index';

export default {
  title: 'Components/AwesomeIcon',
  component: Icon,
  argTypes: {
    color: { control: { type: 'color', presetColors: ['red', 'green'] } },
  },
};

const Template = (args) => <Icon {...args} />;
export const AwesomeIcon = Template.bind({});
AwesomeIcon.args = {
  iconName: 'far fa-map-marker-alt',
  size: 20,
};
