import { combineReducers, createStore } from 'redux';
import { partial } from 'lodash-es';
import { screenReducer } from './screen.reducer';
import { rngResultsReducer } from './rng-results.reducer';
import { safeFrameReducer } from './safe-frames.reducer';
import { timelineReducer } from './timeline.reducer';
import { navBarReducer } from './nav-bar.reducer';
import { settingsReducer } from './settings.reducer';

const reducers = combineReducers({
  rngResults: rngResultsReducer,
  eggSettings: partial(settingsReducer, ['SET_EGG_SETTING', 'SET_EGG_SETTINGS']),
  safeFrameScreen: safeFrameReducer,
  isNavBarOpen: navBarReducer,
  screen: screenReducer,
  stationarySettings: partial(settingsReducer, ['SET_STATIONARY_SETTING', 'SET_STATIONARY_SETTINGS']),
  eventSettings: partial(settingsReducer, ['SET_EVENT_SETTING', 'SET_EVENT_SETTINGS']),
  timelineScreen: timelineReducer
});

export const store = createStore(reducers, {
  eggSettings: {
    applyFilters: false,
    eggSeeds: ['00000000', '00000000', '00000000', 'AABBCCDD'],
    femaleAbility: '1',
    femaleItem: 'None',
    femaleIVs: '31/31/31/31/31/31',
    filterShinies: false,
    framesToGenerate: 4,
    genderFilter: 'No Gender',
    genderRatio: '1:1',
    isFemaleDitto: false,
    ivFilterLower: '00/00/00/00/00/00',
    ivFilterUpper: '31/31/31/31/31/31',
    maleAbility: '1',
    maleItem: 'None',
    maleIVs: '31/31/31/31/31/31',
    masudaMethod: false,
    nidoType: false,
    otherTSVs: [],
    perfectIVFilter: '0',
    playerTSV: 0,
    sameDexNumber: false,
    shinyCharm: false
  },
  isNavBarOpen: false,
  rngResults: {
    type: 'egg',
    results: []
  },
  safeFrameScreen: {
    seed: '00000000',
    npcCount: '4',
    startFrame: '478',
    endFrame: '1000',
    results: []
  },
  screen: {
    name: 'main',
    title: 'Egg RNG'
  },
  stationarySettings: {
    ability: '1',
    alwaysSync: false,
    applyFilters: false,
    delay: 0,
    filterShinies: false,
    genderFilter: 'No Gender',
    genderRatio: 'Genderless',
    isForcedShiny: false,
    isShinyLocked: true,
    ivFilterLower: '00/00/00/00/00/00',
    ivFilterUpper: '31/31/31/31/31/31',
    npcCount: '0',
    perfectIVCount: 3,
    perfectIVFilter: '0',
    pidRollCount: 1,
    seconds: '1',
    seed: '0',
    startFrame: '478',
    syncNature: 'None',
    tsv: '0'
  },
  eventSettings: {
    ability: '1',
    alwaysSync: true,
    applyFilters: false,
    delay: 0,
    filterShinies: false,
    genderFilter: 'No Gender',
    genderRatio: 'Genderless',
    ivFilterLower: '00/00/00/00/00/00',
    ivFilterUpper: '31/31/31/31/31/31',
    npcCount: '4',
    perfectIVCount: 3,
    perfectIVFilter: '0',
    pidType: 1,
    seconds: '1',
    seed: '0',
    startFrame: '478',
    tsv: '0'
  },
  timelineScreen: {
    npcCount: '4',
    results: [],
    seconds: '16',
    seed: '00000000',
    startFrame: '478',
    tsvs: []
  }
});