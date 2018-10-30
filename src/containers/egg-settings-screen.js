import { Card, Col, Input, Row, Select, InputNumber } from 'antd';
import { generateEggs } from 'gen7rng';
import { filter, join, map, parseInt, partial, reverse } from 'lodash-es';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setEggSettingProperty } from '../actions/eggSettings';
import { changeScreen, setEggSetting, setRNGResults } from '../store/dispatchers';
import { parseIVList, parseSeedList } from '../utils/parse-number-list';
import { pokemonFilter } from '../utils/pokemon-filters';

const stats = ['HP', 'Atk', 'Def', 'SpA', 'SpD', 'Spe'];

const Option = Select.Option;

class EggSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      st_femaleIVs: [31, 31, 31, 31, 31, 31]
    };
  }

  modifyFemaleIvs = (index, value) => {
    const { setEggSettingProperty } = this.props;
    let modified_array = [...this.state.st_femaleIVs];
    modified_array[index] = value;
    this.setState(
      {
        st_femaleIVs: modified_array
      },
      () => {
        setEggSettingProperty('femaleIVs', this.state.st_femaleIVs.join('/'));
      }
    );
  };

  handleGenerateEggs = () => {
    const { eggSettings, setSetting, setResults, setScreen, setEggSettingProperty } = this.props;

    const {
      applyFilters,
      eggSeeds,
      femaleAbility,
      femaleItem,
      femaleIVs,
      filterShinies,
      framesToGenerate,
      genderFilter,
      genderRatio,
      isFemaleDitto,
      ivFilterLower,
      ivFilterUpper,
      maleAbility,
      maleItem,
      maleIVs,
      masudaMethod,
      nidoType,
      otherTSVs,
      perfectIVFilter,
      playerTSV,
      sameDexNumber,
      shinyCharm
    } = eggSettings;

    const settings = {
      ...eggSettings,
      femaleIVs: parseIVList(femaleIVs),
      maleIVs: parseIVList(maleIVs),
      otherTSVs: map(otherTSVs, parseInt),
      eggSeeds: map(reverse([...eggSeeds]), seed => parseInt(seed, 16))
    };

    const parsedUpper = parseIVList(ivFilterUpper);
    const parsedLower = parseIVList(ivFilterLower);
    console.log(settings);

    const eggs = generateEggs(settings, framesToGenerate);
    const isPassingFilters = partial(
      pokemonFilter,
      parsedUpper,
      parsedLower,
      filterShinies,
      parseInt(perfectIVFilter),
      genderFilter,
      'egg'
    );
    const results = applyFilters ? filter(eggs, isPassingFilters) : eggs;

    setResults({ type: 'egg', results });
    setScreen({ name: 'rngResults', title: 'Egg Results' });
  };

  // fixEggSeed = value => {
  //   let fixedValue = value;
  //   fixedValue = value.split(', ');
  //   return fixedValue;
  // };

  render() {
    const { eggSettings, setSetting, setResults, setScreen, setEggSettingProperty } = this.props;

    const {
      applyFilters,
      eggSeeds,
      femaleAbility,
      femaleItem,
      femaleIVs,
      filterShinies,
      framesToGenerate,
      genderFilter,
      genderRatio,
      isFemaleDitto,
      ivFilterLower,
      ivFilterUpper,
      maleAbility,
      maleItem,
      maleIVs,
      masudaMethod,
      nidoType,
      otherTSVs,
      perfectIVFilter,
      playerTSV,
      sameDexNumber,
      shinyCharm
    } = eggSettings;

    const saveSetting = name => value => setSetting({ name, value });

    // const array_femaleIVs = femaleIVs.split('/');

    console.log(this.state);

    return (
      <div>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Card title="🌱 Egg seed 🌱">
              <Input
                placeholder="Egg seeds"
                onChange={e => setEggSettingProperty('eggSeeds', parseSeedList(e.target.value))}
                value={join(eggSeeds, ', ').toUpperCase()}
                required
                maxLength="38"
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: '16px' }}>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Card title="Female">
              <p>
                <img src={'https://www.serebii.net/pokedex-sm/icon/241.png'} />
              </p>
              <Select style={{ width: '100%' }} defaultValue={femaleAbility} onChange={saveSetting('femaleAbility')}>
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="H">H</Option>
              </Select>
              <p className="input_lable">Female Item</p>
              <Select style={{ width: '100%' }} defaultValue={femaleItem} onChange={saveSetting('femaleItem')}>
                {[
                  { name: 'None' },
                  { name: 'Everstone' },
                  { name: 'Destiny Knot' },
                  { name: 'Power Weight' },
                  { name: 'Power Bracer' },
                  { name: 'Power Belt' },
                  { name: 'Power Lens' },
                  { name: 'Power Band' },
                  { name: 'Power Anklet' }
                ].map((o, i) => (
                  <Option key={i} value={o.name}>
                    {o.name}
                  </Option>
                ))}
              </Select>
              <p className="input_lable">Female IVs</p>
              {this.state.st_femaleIVs.map((o, i) => {
                return (
                  <Row key={i}>
                    <Col style={{ marginBottom: '8px' }} xs={8} sm={8} md={8} lg={8} xl={8}>
                      <InputNumber
                        min={0}
                        max={31}
                        onChange={value => this.modifyFemaleIvs(i, value)}
                        value={o}
                        required
                      />
                    </Col>
                    <Col style={{ marginBottom: '8px' }} xs={16} sm={16} md={16} lg={16} xl={16}>
                      <p style={{ marginLeft: '16px' }}>{stats[i]}</p>
                    </Col>
                  </Row>
                );
              })}
            </Card>
          </Col>
        </Row>

        {/* 
            <RadioGroup
              label="Female IVs"
              value={femaleIVs}
              options={[
                { label: '31/31/31/31/31/31', value: '31/31/31/31/31/31' },
                { label: '31/00/31/31/31/31', value: '31/00/31/31/31/31' },
                { label: '31/31/31/31/31/00', value: '31/31/31/31/31/00' }
              ]}
              onChange={saveSetting('femaleIVs')}
            />
            <TextInputField
              label="Custom IVs"
              placeholder="Custom IVs"
              onChange={saveSetting('femaleIVs')}
              value={join(parseList(2, '/', femaleIVs), '/')}
            />
          </Pane>
  
          <Pane margin={8}>
            <img src={'https://www.serebii.net/pokedex-sm/icon/128.png'} />
  
            <Combobox
              width={120}
              label="Male Ability"
              value={maleAbility}
              // defaultSelectedItem={'1'}
              placeholder={'♂ Ability'}
              items={['1', '2', 'H']}
              onChange={saveSetting('maleAbility')}
            />
            <Combobox
              width={120}
              label="Male Item"
              value={maleItem}
              // defaultSelectedItem={'1'}
              placeholder={'♂ Item'}
              items={[
                'None',
                'Everstone',
                'Destiny Knot',
                'Power Weight',
                'Power Bracer',
                'Power Belt',
                'Power Lens',
                'Power Band',
                'Power Anklet'
              ]}
              onChange={saveSetting('maleItem')}
            />
            <RadioGroup
              label="Male Item"
              value={maleItem}
              options={[
                { label: 'None', value: 'None' },
                { label: 'Everstone', value: 'Everstone' },
                { label: 'Destiny Knot', value: 'Destiny Knot' },
                { label: 'Power Weight', value: 'Power Weight' },
                { label: 'Power Bracer', value: 'Power Bracer' },
                { label: 'Power Belt', value: 'Power Belt' },
                { label: 'Power Lens', value: 'Power Lens' },
                { label: 'Power Band', value: 'Power Band' },
                { label: 'Power Anklet', value: 'Power Anklet' }
              ]}
              onChange={saveSetting('maleItem')}
            />
            <RadioGroup
              label="Male IVs"
              value={maleIVs}
              options={[
                { label: '31/31/31/31/31/31', value: '31/31/31/31/31/31' },
                { label: '31/00/31/31/31/31', value: '31/00/31/31/31/31' },
                { label: '31/31/31/31/31/00', value: '31/31/31/31/31/00' }
              ]}
              onChange={saveSetting('maleIVs')}
            />
            <TextInputField
              label="Custom IVs"
              placeholder="Custom IVs"
              onChange={saveSetting('maleIVs')}
              value={join(parseList(2, '/', maleIVs), '/')}
            />
  
            <RadioGroup
              label="Gender Ratio (F:M)"
              value={genderRatio}
              options={[
                { label: 'Genderless', value: 'Genderless' },
                { label: '1:1', value: '1:1' },
                { label: '7:1', value: '7:1' },
                { label: '3:1', value: '3:1' },
                { label: '1:3', value: '1:3' },
                { label: '1:7', value: '1:7' },
                { label: 'Male only', value: 'Male only' },
                { label: 'Female only', value: 'Female only' }
              ]}
              onChange={saveSetting('genderRatio')}
            />
          </Pane>
  
          <Pane margin={8}>
            <TextInputField
              label="Your TSV ✨"
              placeholder="Your TSV"
              onChange={e => setEggSettingProperty('playerTSV', parseInt(e.target.value))}
              value={playerTSV}
            />
            <TextInputField
              label="Other TSVs"
              placeholder="Other TSVs"
              onChange={tsvList => saveSetting('otherTSVs')(parseList(4, ', ', tsvList))}
              value={join(otherTSVs, ', ')}
            />
            <Checkbox
              label="Masuda Method"
              checked={masudaMethod}
              onChange={e => setEggSettingProperty('masudaMethod', e.target.checked)}
            />
            <Checkbox
              label="Shiny Charm"
              checked={shinyCharm}
              onChange={e => setEggSettingProperty('shinyCharm', e.target.checked)}
            />
          </Pane>
  
          <Pane margin={8}>
            <TextInputField
              label="Upper limit IVs"
              placeholder="Upper limit IVs"
              onChange={saveSetting('ivFilterUpper')}
              value={join(parseList(2, '/', ivFilterUpper), '/')}
            />
            <TextInputField
              label="Lower limit IVs"
              placeholder="Lower limit IVs"
              onChange={saveSetting('ivFilterLower')}
              value={join(parseList(2, '/', ivFilterLower), '/')}
            />
            <TextInputField
              label="Perfect IVs"
              placeholder="Perfect IVs"
              onChange={e => setEggSettingProperty('perfectIVFilter', e.target.value)}
              value={perfectIVFilter}
            />
          </Pane>
  
          <Pane margin={8}>
            <RadioGroup
              label="Gender filter"
              value={genderFilter}
              options={[
                { label: 'No Gender', value: 'No Gender' },
                { label: 'Genderless', value: 'Genderless' },
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' }
              ]}
              onChange={saveSetting('genderFilter')}
            />
  
            <Checkbox
              label="Filter Shinies"
              checked={filterShinies}
              onChange={e => setEggSettingProperty('filterShinies', e.target.checked)}
            />
  
            <Checkbox
              label="Shiny Charm"
              checked={shinyCharm}
              onChange={e => setEggSettingProperty('shinyCharm', e.target.checked)}
            />
            <Checkbox
              label="Apply Filters"
              checked={applyFilters}
              onChange={e => setEggSettingProperty('applyFilters', e.target.checked)}
            />
          </Pane>
  
          <Pane margin={8}>
            <Text size={500}>Misc Settings</Text>
            <Checkbox
              label="Parents are Nidoran"
              checked={nidoType}
              onChange={e => setEggSettingProperty('nidoType', e.target.checked)}
            />
            <Checkbox
              label="Parents the same species"
              checked={sameDexNumber}
              onChange={e => setEggSettingProperty('sameDexNumber', e.target.checked)}
            />
            <Checkbox
              label="The female is Ditto"
              checked={isFemaleDitto}
              onChange={e => setEggSettingProperty('isFemaleDitto', e.target.checked)}
            />
          </Pane>
  
        
            <TextInputField
              label="Frames upper limit"
              placeholder="400"
              onChange={e => setEggSettingProperty('framesToGenerate', e.target.value)}
              value={framesToGenerate}
              required
            />
        
          
            <Button appearance="primary" iconAfter="double-chevron-right" onClick={this.handleGenerateEggs}>
              RNGenerate!
            </Button>
          </Pane> 
        */}
      </div>
    );
  }
}

// export const EggSettings = ({ eggSettings, setSetting, setResults, setScreen, setEggSettingProperty }) => {};

const mapStateToProps = state => {
  const { eggSettings } = state;
  return {
    eggSettings
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setSetting: setEggSetting,
      setResults: setRNGResults,
      setScreen: changeScreen,
      setEggSettingProperty
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EggSettings);
