import { Pane, Table, Text } from 'evergreen-ui';
import { join, map, reverse } from 'lodash-es';
import React from 'react';
import { connect } from 'react-redux';
import { EggResult } from '../components/egg-result';
import { StationaryResult } from '../components/stationary-result';
import { parseHexSeed } from '../utils/parse-hex-seed';

const handleResultType = resultType => {
  switch (resultType) {
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
  console.log(rngResults);

  const is31 = ivNumber => {
    if (ivNumber === 31) {
      return (
        <Text fontFamily="mono" fontWeight="800">
          {ivNumber}
        </Text>
      );
    }
    return ivNumber;
  };

  return (
    <div>
      <Pane
        display="flex"
        padding={16}
        display="flex"
        justifyContent="space-between"
        flexDirection="row"
        flexWrap="wrap"
      >
        <Table width="100vw">
          <Table.Head>
            <Table.TextHeaderCell>Frame</Table.TextHeaderCell>
            <Table.TextHeaderCell>Adv</Table.TextHeaderCell>
            <Table.TextHeaderCell>Nature</Table.TextHeaderCell>
            <Table.TextHeaderCell>HP</Table.TextHeaderCell>
            <Table.TextHeaderCell>Atk</Table.TextHeaderCell>
            <Table.TextHeaderCell>Def</Table.TextHeaderCell>
            <Table.TextHeaderCell>SpA</Table.TextHeaderCell>
            <Table.TextHeaderCell>SpD</Table.TextHeaderCell>
            <Table.TextHeaderCell>Spe</Table.TextHeaderCell>
            <Table.TextHeaderCell>Gender</Table.TextHeaderCell>
            <Table.TextHeaderCell>Ability</Table.TextHeaderCell>
            <Table.TextHeaderCell>Psv</Table.TextHeaderCell>
            <Table.TextHeaderCell flexBasis={'314px'}>Seeds</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body>
            {results.map((o, i) => (
              <Table.Row intent={o.egg.shiny ? 'success' : 'none'} key={i} isSelectable>
                <Table.TextCell isNumber>{o.frame}</Table.TextCell>
                <Table.TextCell isNumber>{o.frameAdvance}</Table.TextCell>
                <Table.TextCell isNumber>{o.egg.nature}</Table.TextCell>
                {o.egg.ivs.map((o, i) => {
                  return (
                    <Table.TextCell key={i} isNumber>
                      {is31(o)}
                    </Table.TextCell>
                  );
                })}
                <Table.TextCell isNumber>
                  {o.egg.gender === 'Male' ? (
                    <Text fontSize="16px" fontWeight="800">
                      ♂
                    </Text>
                  ) : (
                    <Text fontSize="16px" fontWeight="800">
                      ♀
                    </Text>
                  )}
                </Table.TextCell>
                <Table.TextCell isNumber>{o.egg.ability}</Table.TextCell>
                <Table.TextCell isNumber>{o.egg.psv}</Table.TextCell>
                <Table.TextCell flexBasis={'314px'} isNumber>
                  {join(map(reverse([...o.eggSeeds]), parseHexSeed), ', ')}
                </Table.TextCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Pane>
    </div>
  );
};

export const ResultsScreen = connect(
  ({ rngResults }) => ({ rngResults }),
  {}
)(Results);
