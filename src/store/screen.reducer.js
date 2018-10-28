import { isEqual } from 'lodash-es';
import { createCreator } from '../utils/create-creators';

export const screenReducer = (
  prevState = { name: 'main', title: 'Egg RNG' },
  { type, payload }
) => {
  if (isEqual(type, 'SET_SCREEN')) {
    return payload;
  }

  return prevState;
}

export const changeScreenCreator = createCreator('SET_SCREEN');
