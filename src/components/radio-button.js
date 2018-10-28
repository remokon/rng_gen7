import React from 'react';
import { isEqual, map } from 'lodash-es';
import { Checkbox } from './checkbox';
// This is a bit of a makeshift approach

export const RadioButton = ({ buttonSettings, color, onChange, selected }) => {
  return map(buttonSettings, ({ label, value })=> {
    const radioValue = value || label;
    return <Checkbox
      color={color}
      label={label}
      checked={isEqual(selected, radioValue)}
      onCheckHandler={() => onChange(radioValue)}
    />
  });
};