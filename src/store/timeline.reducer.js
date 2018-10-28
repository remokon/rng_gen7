import { createCreator } from '../utils/create-creators';

const defaultState = {
  npcCount: '4',
  results: [],
  seconds: '16',
  seed: '00000000',
  startFrame: '478',
  tsvs: []
};

export const timelineReducer = (prevState = defaultState, { type, payload }) => {
  switch(type) {
    case 'SET_TIMELINE_START':
      return {
        ...prevState,
        startFrame: payload
      };
    case 'SET_TIMELINE_NPC_COUNT':
      return {
        ...prevState,
        npcCount: payload
      };
    case 'SET_TIMELINE_SECONDS':
      return {
        ...prevState,
        seconds: payload
      };
    case 'SET_TIMELINE_SEED':
      return {
        ...prevState,
        seed: payload
      };
    case 'SET_TIMELINE_RESULTS':
      return {
        ...prevState,
        results: payload
      };
    case 'SET_TIMELINE_TSVS':
      return {
        ...prevState,
        tsvs: payload
      };
  }

  return prevState;
}

export const setTimelineStartCreator = createCreator('SET_TIMELINE_START');
export const setTimelineNPCCountCreator = createCreator('SET_TIMELINE_NPC_COUNT');
export const setTimelineSecondsCreator = createCreator('SET_TIMELINE_SECONDS');
export const setTimelineSeedCreator = createCreator('SET_TIMELINE_SEED');
export const setTimelineResultsCreator = createCreator('SET_TIMELINE_RESULTS');
export const setTimelineTSVsCreator = createCreator('SET_TIMELINE_TSVS');