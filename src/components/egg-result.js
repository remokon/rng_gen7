import React from 'react';
import { isNil, join, map, reverse } from 'lodash-es';
import { parseHexSeed } from '../utils/parse-hex-seed';

export const EggResult = ({ egg, eggSeeds, frame, frameAdvance, originalEggSeeds }) => {
  const {
    ability,
    ball,
    gender,
    ivs,
    nature,
    psv,
    pid,
    shiny
  } = egg;
  const eggResultStyle = {
    margin: '30px auto',
    padding: '10px 5px',
    width: '80%',
    textAlign: 'left',
    boxShadow: '0px 0px 8px 0px #9FA9B2'
  };
  const resultStyle = {
    margin: '5px auto'
  };
  const Result = ({ value, label }) => <div style={resultStyle}>{label}: {value}</div>;

  return <div style={eggResultStyle}>
      <Result label="Frame" value={frame} />
      <Result label="Gender" value={gender} />
      <Result label="Ability" value={ability} />
      <Result label="Nature" value={nature} />
      <Result label="IVs" value={join(ivs, '/')} />
      <Result label="Ball" value={ball} />
      <Result label="Frame Adv" value={frameAdvance} />
      {
        isNil(psv)
          ? ''
          : <Result label="PSV" value={psv} />
      }
      {
        isNil(pid)
          ? ''
          : <Result label="Shiny" value={shiny ? 'True' : 'False'} />
      }
      <Result
        label="From seeds"
        value={join(map(reverse([...originalEggSeeds]), parseHexSeed), ', ')}
      />
      <Result
        label="Next seeds"
        value={join(map(reverse([...eggSeeds]), parseHexSeed), ', ')}
      />
    </div>;
}