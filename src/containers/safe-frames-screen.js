import React from 'react';
import { isEmpty, map, parseInt } from 'lodash-es';
import { connect } from 'react-redux';
import { getSafeFrames } from 'gen7rng';
import { TextInput } from '../components/text-input';
import { StyledButton } from '../components/styled-button';
import {
  setSafeFrameEnd,
  setSafeFrameStart,
  setSafeFrameResults,
  setSafeFrameSeed,
  setSafeFrameNPCCount
} from '../store/dispatchers';

export const SafeFrames = ({
  safeFrameScreen,
  setEnd,
  setStart,
  setResults,
  setSeed,
  setNPCCount
}) => {
  const {
    results,
    seed,
    startFrame,
    endFrame,
    npcCount
  } = safeFrameScreen;
  const formatResult = res => <div>{res}</div>;

  return <div>
      <TextInput placeholder="Init Seed" onChange={setSeed} />
      <TextInput placeholder="Start frame" onChange={setStart} />
      <TextInput placeholder="End frame" onChange={setEnd} />
      <TextInput placeholder="NPC Count" onChange={setNPCCount} />
      <StyledButton
        onClick={() => {
          const safeFrames = getSafeFrames(
            parseInt(seed, 16),
            parseInt(startFrame, 10),
            parseInt(endFrame, 10),
            parseInt(npcCount, 10)
          );
          setResults(safeFrames);
        }}
      >
        Find safe frames
      </StyledButton>
      {
        isEmpty(results)
          ? ''
          : map(results, formatResult)
      }
    </div>;
};

export const SafeFrameScreen = connect(
  ({ safeFrameScreen }) => ({ safeFrameScreen }),
  {
    setEnd: setSafeFrameEnd,
    setStart: setSafeFrameStart,
    setResults: setSafeFrameResults,
    setSeed: setSafeFrameSeed,
    setNPCCount: setSafeFrameNPCCount
  }
)(SafeFrames);
