import { isEqual } from 'lodash-es';
import { createCreator } from '../utils/create-creators';

export const rngResultsReducer = (prevState = { result: [], type: 'egg' }, { type, payload }) => {
  if (isEqual(type, 'SET_RESULTS')) {
    return payload;
  }

  return prevState;
}

export const setRNGResultsCreator = createCreator('SET_RESULTS');
