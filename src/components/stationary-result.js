import React from 'react';
import { join } from 'lodash-es';

export const StationaryResult = ({ frame, stationary }) => {
  const {
    ability,
    gender,
    ivs,
    nature,
    psv,
    shiny
  } = stationary;
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
      <Result label="Nature" value={nature} />
      <Result label="IVs" value={join(ivs, '/')} />
      <Result label="Gender" value={gender} />
      <Result label="Ability" value={ability} />
      <Result label="PSV" value={psv} />
      <Result label="Shiny" value={shiny ? 'True' : 'False'} />
    </div>;
}