import { partial } from 'lodash-es';
import { store } from './store';
import { createCreator } from '../utils/create-creators';
import { changeScreenCreator } from './screen.reducer';
import { setRNGResultsCreator } from './rng-results.reducer';
import { setNavBarStateCreator } from './nav-bar.reducer';
import {
  setSafeFrameEndCreator,
  setSafeFrameResultsCreator,
  setSafeFrameSeedCreator,
  setSafeFrameStartCreator,
  setSafeFrameNPCCountCreator
} from './safe-frames.reducer';
import {
  setTimelineStartCreator,
  setTimelineNPCCountCreator,
  setTimelineSecondsCreator,
  setTimelineSeedCreator,
  setTimelineResultsCreator,
  setTimelineTSVsCreator
} from './timeline.reducer';

const dispatchBinder = (dispatch, creator, payload) => {
  return dispatch(creator(payload));
}

const bindDispatch = creator => partial(dispatchBinder, store.dispatch, creator);

export const changeScreen = payload => {
  window.scrollTo(0, 0);
  return bindDispatch(changeScreenCreator)(payload);
};
export const setEggSetting = bindDispatch(createCreator('SET_EGG_SETTING'));
export const setEggSettings = bindDispatch(createCreator('SET_EGG_SETTINGS'));
export const setRNGResults = bindDispatch(setRNGResultsCreator);
export const setSafeFrameEnd = bindDispatch(setSafeFrameEndCreator);
export const setSafeFrameResults = bindDispatch(setSafeFrameResultsCreator);
export const setSafeFrameStart = bindDispatch(setSafeFrameStartCreator);
export const setSafeFrameSeed = bindDispatch(setSafeFrameSeedCreator);
export const setSafeFrameNPCCount = bindDispatch(setSafeFrameNPCCountCreator);
export const setTimelineNPCCount = bindDispatch(setTimelineNPCCountCreator);
export const setTimelineSeconds = bindDispatch(setTimelineSecondsCreator);
export const setTimelineSeed = bindDispatch(setTimelineSeedCreator);
export const setTimelineResults = bindDispatch(setTimelineResultsCreator);
export const setTimelineStart = bindDispatch(setTimelineStartCreator);
export const setTimelineTSVs = bindDispatch(setTimelineTSVsCreator);
export const setNavBarState = bindDispatch(setNavBarStateCreator);
export const setStationarySetting = bindDispatch(createCreator('SET_STATIONARY_SETTING'));
export const setStationarySettings = bindDispatch(createCreator('SET_STATIONARY_SETTINGS'));
export const setEventSetting = bindDispatch(createCreator('SET_EVENT_SETTING'));
export const setEventSettings = bindDispatch(createCreator('SET_EVENT_SETTINGS'));