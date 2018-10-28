import './style/header.css';
import React from 'react';
import { map } from 'lodash-es';
import { connect } from 'react-redux';
import { EggResult } from '../components/egg-result';
import { StationaryResult } from '../components/stationary-result';

const handleResultType = resultType => {
  switch(resultType) {
    case 'egg':
      return EggResult;
    case 'stationary':
      return StationaryResult;
  }

  return EggResult;
};

export const Results = ({ rngResults }) => {
  const { results, type } = rngResults;
  const resultType = handleResultType(type);

  return <div>
      Results:
      {map(results, resultType)}
    </div>;
};

export const ResultsScreen = connect(
  ({ rngResults }) => ({ rngResults }),
  {}
)(Results);
