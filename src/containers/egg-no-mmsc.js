import React from 'react';
import { assign, intersectionWith, isEmpty, isEqual, join, map, parseInt } from 'lodash-es';
import { connect } from 'react-redux';
import { createTimeline } from 'gen7rng';
import { TextInput } from '../components/text-input';
import { StyledButton } from '../components/styled-button';
import { parseList } from '../utils/parse-number-list';
import { calcPSV } from '../utils/calc-psv';
import {
  setTimelineStart,
  setTimelineNPCCount,
  setTimelineSeconds,
  setTimelineSeed,
  setTimelineResults,
  setTimelineTSVs
} from '../store/dispatchers';

export const EggMainRNGPID = ({ setStart, setNPCCount, setSeconds, setSeed, setResults, setTSVs, timelineScreen }) => {
  const { npcCount, seconds, seed, startFrame, tsvs, results: timelineResults } = timelineScreen;
  const formattedTSVs = map(tsvs, parseInt);
  const formatResult = ({ frame, psv }) => (
    <div>
      Frame: {frame} - PSV: {psv}
    </div>
  );
  const setTimeline = () => {
    const timelineArgs = map([startFrame, npcCount, seconds, 38], parseInt);
    const timeline = createTimeline(parseInt(seed, 16), ...timelineArgs);
    const timelineWithPSVs = map(timeline, res => assign({}, res, { psv: calcPSV(res.rand) }));
    setResults(timelineWithPSVs);
  };
  const results = isEmpty(tsvs)
    ? timelineResults
    : intersectionWith(timelineResults, formattedTSVs, ({ psv }, tsv) => isEqual(psv, tsv));

  return (
    <div>
      <TextInput placeholder="Init Seed" onChange={setSeed} />
      <TextInput placeholder="Start frame" onChange={setStart} />
      <TextInput placeholder="NPC Count" onChange={setNPCCount} />
      <TextInput placeholder="Timeline Seconds" onChange={setSeconds} />

      <TextInput
        placeholder="Shiny Egg TSVs"
        onChange={tsvList => setTSVs(parseList(4, ', ', tsvList))}
        value={join(tsvs, ', ')}
      />

      <StyledButton onClick={setTimeline}>Create timeline</StyledButton>

      {isEmpty(results) ? '' : map(results, formatResult)}
    </div>
  );
};

export const EggMainRNGPIDScreen = connect(
  ({ timelineScreen }) => ({ timelineScreen }),
  {
    setStart: setTimelineStart,
    setNPCCount: setTimelineNPCCount,
    setSeconds: setTimelineSeconds,
    setSeed: setTimelineSeed,
    setResults: setTimelineResults,
    setTSVs: setTimelineTSVs
  }
)(EggMainRNGPID);
