import { isEqual } from 'lodash-es';
import { createCreator } from '../utils/create-creators';

export const navBarReducer = (prevState = false, { type, payload }) => {

  if (isEqual(type, 'SET_NAV_BAR_STATE')) {
    return payload;
  }

  return prevState;
}

export const setNavBarStateCreator = createCreator('SET_NAV_BAR_STATE');
