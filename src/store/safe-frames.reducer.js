import { createCreator } from '../utils/create-creators';

const defaultState = {
  seed: '00000000',
  npcCount: '4',
  startFrame: '478',
  endFrame: '1000',
  results: []
};

export const safeFrameReducer = (prevState = defaultState, { type, payload }) => {
  switch(type) {
    case 'SET_SAFE_FRAME_START':
      return {
        ...prevState,
        startFrame: payload
      };
    case 'SET_SAFE_FRAME_END':
      return {
        ...prevState,
        endFrame: payload
      };
    case 'SET_SAFE_FRAME_RESULTS':
      return {
        ...prevState,
        results: payload
      };
    case 'SET_SAFE_FRAME_INIT_SEED':
      return {
        ...prevState,
        seed: payload
      };
    case 'SET_SAFE_FRAME_NPC_COUNT':
      return {
        ...prevState,
        npcCount: payload
      };
  }

  return prevState;
}

export const setSafeFrameEndCreator = createCreator('SET_SAFE_FRAME_END');
export const setSafeFrameResultsCreator = createCreator('SET_SAFE_FRAME_RESULTS');
export const setSafeFrameStartCreator = createCreator('SET_SAFE_FRAME_START');
export const setSafeFrameSeedCreator = createCreator('SET_SAFE_FRAME_INIT_SEED');
export const setSafeFrameNPCCountCreator = createCreator('SET_SAFE_FRAME_NPC_COUNT');