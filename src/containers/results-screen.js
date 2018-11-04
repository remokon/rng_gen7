import { join, map, reverse } from 'lodash-es';
import React from 'react';
import { connect } from 'react-redux';
// import { EggResult } from '../components/egg-result';
// import { StationaryResult } from '../components/stationary-result';
import { parseHexSeed } from '../utils/parse-hex-seed';
import { calcHP } from '../utils/calc-hp';
import { Table } from 'antd';

// const handleResultType = resultType => {
//   switch (resultType) {
//     case 'egg':
//       return EggResult;
//     case 'stationary':
//       return StationaryResult;
//   }

//   return EggResult;
// };

export const Results = ({ rngResults }) => {
  const { results } = rngResults;
  // const resultType = handleResultType(type);
  console.log(rngResults);

  // const is31 = ivNumber => {
  //   if (ivNumber === 31) {
  //     return (
  //       <Text color="#65C85D" fontFamily="mono" fontWeight="600">
  //         {ivNumber}
  //       </Text>
  //     );
  //   }
  //   if (ivNumber === 0) {
  //     return (
  //       <Text color="#DD7373" fontFamily="mono" fontWeight="600">
  //         {ivNumber}
  //       </Text>
  //     );
  //   }
  //   return ivNumber;
  // };

  const columns = [
    {
      title: 'Frame',
      dataIndex: 'frame',
    },
    {
      title: 'Adv',
      dataIndex: 'frameAdvance',
      render: frameAdvance => `+${frameAdvance}`
    },
    {
      title: 'Nature',
      dataIndex: 'egg.nature',
    },
    {
      title: 'HP',
      dataIndex: 'egg.ivs.0',
    },
    {
      title: 'Atk',
      dataIndex: 'egg.ivs.1',
    },
    {
      title: 'Def',
      dataIndex: 'egg.ivs.2',
    },
    {
      title: 'SpA',
      dataIndex: 'egg.ivs.3',
    },
    {
      title: 'SpD',
      dataIndex: 'egg.ivs.4',
    },
    {
      title: 'Spe',
      dataIndex: 'egg.ivs.5',
    },
    {
      title: 'Gender',
      dataIndex: 'egg.gender',
    },
    {
      title: 'Ability',
      dataIndex: 'egg.ability',
    },
    {
      title: 'Hidden Power',
      dataIndex: 'egg.ivs',
      render: eggIvs => calcHP(eggIvs)
    },
    {
      title: 'Ball',
      dataIndex: 'egg.ball',
    },
    {
      title: 'PSV',
      dataIndex: 'egg.psv',
    },
    {
      title: 'Egg seeds',
      dataIndex: 'eggSeeds',
      render: eggSeeds => join(map(reverse([...eggSeeds]), parseHexSeed), ', ')
    }
  ];

  return (
    <div>
      <Table
       columns={columns} 
       dataSource={results} 
       size='small'
       rowKey={'frame'}
       pagination={{ pageSize: 20 }}
      //  rowClassName={ (record, index) => 
      //   {
      //     return record.egg.shiny ? 'shinyCell' : ''
      //   }
      // }
      />
      {/* 
        <Table width="100vw">
          <Table.Head>
            <Table.TextHeaderCell flexBasis={'314px'}>Seed</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body>
            {results.map((o, i) => (
              <Table.Row height="30" intent={o.egg.shiny ? 'success' : 'none'} key={i} isSelectable>
                <Table.TextCell isNumber>{o.frame}</Table.TextCell>
                <Table.TextCell isNumber>+{o.frameAdvance}</Table.TextCell>
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
      </Pane> */}
    </div>
  );
};

export const ResultsScreen = connect(
  ({ rngResults }) => ({ rngResults }),
  {}
)(Results);
