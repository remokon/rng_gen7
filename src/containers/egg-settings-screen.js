import { Card, Col, Input, Row, Select, InputNumber, Radio, Divider, Checkbox, Button } from 'antd';
import { generateEggs } from 'gen7rng';
import { filter, join, map, parseInt, partial, reverse } from 'lodash-es';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setEggSettingProperty } from '../actions/eggSettings';
import { changeScreen, setEggSetting, setRNGResults } from '../store/dispatchers';
import { parseList, parseIVList, parseSeedList } from '../utils/parse-number-list';
import { pokemonFilter } from '../utils/pokemon-filters';

// const stats = ['HP', 'Atk', 'Def', 'SpA', 'SpD', 'Spe'];
const seedImg = <img alt="" src={"https://www.serebii.net/itemdex/sprites/grassyseed.png"} />

const Option = Select.Option;
const RadioGroup = Radio.Group;

class EggSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      st_femaleIVs: [31, 31, 31, 31, 31, 31],
      st_maleIVs: [31, 31, 31, 31, 31, 31]
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

  modifyMaleIvs = (index, value) => {
    const { setEggSettingProperty } = this.props;
    let modified_array = [...this.state.st_maleIVs];
    modified_array[index] = value;
    this.setState(
      {
        st_maleIVs: modified_array
      },
      () => {
        setEggSettingProperty('maleIVs', this.state.st_maleIVs.join('/'));
      }
    );
  };

  handleGenerateEggs = () => {
    const { eggSettings, setSetting, setResults, setScreen, setEggSettingProperty } = this.props;

    const {
      abilityFilter,
      applyFilters,
      ball,
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
      genderFilter,
      parseInt(perfectIVFilter),
      filterShinies,
      abilityFilter,
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
      abilityFilter,
      applyFilters,
      ball,
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

    return (
      <div>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            {/* <Card> */}
            <Card
              title={
                <span>
                  {' '}
                  Seed {' '} {seedImg}
                </span>
              }
            >
              <Input
                style={{ fontFamily: 'monospace' }}
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
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>

            <Card
              title={
                <span>
                  {' '}
                  Parents info
                  <img alt="" src={"https://www.serebii.net/itemdex/sprites/sweetheart.png"} />
                  {' '}
                </span>
              }
            >
              <RadioGroup
                value={genderRatio}
                onChange={e => setEggSettingProperty('genderRatio', e.target.value)}
              >
                <Radio value={'Genderless'}> Genderless </Radio>
                <Radio value={'Female only'}> F only</Radio>
                <Radio value={'7:1'}> 7:1 </Radio>
                <Radio value={'3:1'}> 3:1 </Radio>
                <Radio value={'1:1'}> 1:1 </Radio>
                <Radio value={'1:3'}> 1:3 </Radio>
                <Radio value={'1:7'}> 1:7 </Radio>
                <Radio value={'Male only'}> M only </Radio>
              </RadioGroup>
              <Divider />
              <Col xs={10} sm={10} md={10} lg={5} xl={5}>
                <p>
                  <img alt="" src={'https://www.serebii.net/pokedex-sm/icon/031.png'} /> — &nbsp; ♀
              </p>
                <Select style={{ width: '50%' }} defaultValue={femaleAbility} onChange={saveSetting('femaleAbility')}>
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="H">H</Option>
                </Select>
                {/* <p className="input_lable">Female Item</p> */}
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
                <p />
                {this.state.st_femaleIVs.map((o, i) => {
                  return (
                    <Row key={i}>
                      <Col style={{ marginBottom: '2px' }} xs={8} sm={8} md={8} lg={8} xl={8}>
                        <InputNumber
                          style={{ fontFamily: 'monospace' }}
                          min={0}
                          max={31}
                          onChange={value => this.modifyFemaleIvs(i, value)}
                          value={o}
                          required
                        />
                      </Col>
                      {/* <Col style={{ marginBottom: '8px' }} xs={16} sm={16} md={16} lg={16} xl={16}>
                      <p style={{ marginLeft: '16px' }}>{stats[i]}</p>
                    </Col> */}
                    </Row>
                  );
                })}
              </Col>
              <Col xs={2} sm={2} md={2} lg={1} xl={1}>
                <Row gutter={16} style={{ marginTop: '16px' }}> &nbsp; </Row>
                <Row justify={"center"} gutter={16} style={{ marginTop: '12px' }}><img alt="" src={'https://serebii.net/itemdex/sprites/abilitycapsule.png'} /></Row>
                <Row justify={"center"} gutter={16} style={{ marginTop: '8px' }}><img alt="" src={'https://www.serebii.net/itemdex/gsitem.png'} /></Row>
                {/* <Row gutter={16} style={{ marginTop: '24px' }}>HP</Row>        
                <Row gutter={16} style={{ marginTop: '14px' }}>Atk</Row>        
                <Row gutter={16} style={{ marginTop: '14px' }}>Def</Row>        
                <Row gutter={16} style={{ marginTop: '14px' }}>SpA</Row>        
                <Row gutter={16} style={{ marginTop: '14px' }}>SpD</Row>        
                <Row gutter={16} style={{ marginTop: '14px' }}>Spe</Row>         */}
              </Col>
              <Col xs={10} sm={10} md={10} lg={5} xl={5}>
                <p>
                  <img alt="" src={'https://www.serebii.net/pokedex-sm/icon/034.png'} /> — &nbsp; ♂
                </p>
                <Select style={{ width: '40%' }} defaultValue={maleAbility} onChange={saveSetting('maleAbility')}>
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="H">H</Option>
                </Select>
                {/* <p className="input_lable">Male Item</p> */}
                <Select style={{ width: '85%' }} defaultValue={maleItem} onChange={saveSetting('maleItem')}>
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
                <p />
                {this.state.st_maleIVs.map((o, i) => {
                  return (
                    <Row key={i}>
                      <Col style={{ marginBottom: '2px' }} xs={8} sm={8} md={8} lg={8} xl={8}>
                        <InputNumber
                          style={{ fontFamily: 'monospace' }}
                          min={0}
                          max={31}
                          onChange={value => this.modifyMaleIvs(i, value)}
                          value={o}
                          required
                        />
                      </Col>
                      {/* <Col style={{ marginBottom: '8px' }} xs={16} sm={16} md={16} lg={16} xl={16}>
                      <p style={{ marginLeft: '24px' }}>{stats[i]}</p>
                    </Col> */}
                    </Row>
                  );
                })}
              </Col>
              <Col>
                <Checkbox
                  checked={isFemaleDitto}
                  onChange={e => setEggSettingProperty('isFemaleDitto', e.target.checked)}
                >
                  Breeding with Ditto
                </Checkbox>
              </Col>
              <Col>
                <Checkbox
                  checked={nidoType}
                  onChange={e => setEggSettingProperty('nidoType', e.target.checked)}
                >
                  Parents are Nidoran
                </Checkbox>
              </Col>
              <Col>
                <Checkbox
                  checked={sameDexNumber}
                  onChange={e => setEggSettingProperty('sameDexNumber', e.target.checked)}
                >
                  Parents are the same species
                </Checkbox>
              </Col>

            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: '16px' }}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Card
              title={
                <span>
                  {' '}
                  Shinies
                  {' '}
                  <img alt="" src={"https://cdn.bulbagarden.net/upload/a/a5/ShinyVIIStar.png"} />
                </span>
              }
            >

              <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                <p> Your TSV: &nbsp;
                  <InputNumber
                    style={{ fontFamily: "monospace" }}
                    min={0}
                    max={4096}
                    placeholder={1000}
                    onChange={saveSetting('playerTSV')}
                    value={playerTSV}
                  />
                </p>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                <p> Other TSVs: {' '}
                  <Input
                    style={{ fontFamily: "monospace", width: "50%" }}
                    onChange={tsvList => saveSetting('otherTSVs')(parseList(4, ',', tsvList.target.value))}
                    value={otherTSVs}
                  />
                </p>
              </Col>
              {/* <Row > */}
              <Col>
                <Checkbox
                  checked={masudaMethod}
                  onChange={e => setEggSettingProperty('masudaMethod', e.target.checked)}
                >
                  Masuda Method
                  </Checkbox>
              </Col>
              <Col>
                <Checkbox checked={shinyCharm} onChange={e => setEggSettingProperty('shinyCharm', e.target.checked)}>
                  Shiny Charm
                  </Checkbox>
              </Col>
              {/* </Row> */}



            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: '16px' }}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Card
              title={
                <span>
                  {' '}
                  Filter results
                    {' '}
                  <img alt="" src={"https://www.serebii.net/pokedex-sm/icon/306-m.png"} />
                </span>
              }
            >
              <Col>
                <p>
                  Frames upper limit: &nbsp;
                      <Input
                    style={{ fontFamily: 'monospace', width: '20%' }}
                    placeholder={400}
                    onChange={e => setEggSettingProperty('framesToGenerate', e.target.value)}
                    value={framesToGenerate}
                    required
                  />
                </p>
              </Col>
              <Col>
                <p>
                  {' '}
                  # perfect IVs: &nbsp;
                      <InputNumber
                    min={0}
                    max={6}
                    style={{ fontFamily: 'monospace' }}
                    onChange={e => setEggSettingProperty('perfectIVFilter', e)}
                    value={perfectIVFilter}
                  />
                </p>
              </Col>
              <Col>
                <p>
                  Upper IV limits: {' '}
                  <Input
                    style={{ fontFamily: 'monospace' }}
                    onChange={e => setEggSettingProperty('ivFilterUpper', e.target.value)}
                    value={join(parseList(2, '/', ivFilterUpper), '/')}
                  />
                </p>
              </Col>
              <Col>
                <p>
                  Lower limit IVs: {' '}
                  <Input
                    style={{ fontFamily: 'monospace' }}
                    placeholder="Lower limit IVs"
                    onChange={e => setEggSettingProperty('ivFilterLower', e.target.value)}
                    value={join(parseList(2, '/', ivFilterLower), '/')}
                  />
                </p>
              </Col>
              <Col>
                {/* <p> */}
                Gender: &nbsp;
                      <RadioGroup
                  value={genderFilter}
                  onChange={e => setEggSettingProperty('genderFilter', e.target.value)}
                >
                  <Radio value={'Any'}>Any</Radio>
                  <Radio value={'Male'}> Male </Radio>
                  <Radio value={'Female'}> Female </Radio>
                  <Radio value={'Genderless'}> Genderless </Radio>
                </RadioGroup >
                {/* </p> */}
              </Col>
              <Col>
                Ability: &nbsp;
                      <RadioGroup
                  value={abilityFilter}
                  onChange={e => setEggSettingProperty('abilityFilter', e.target.value)}
                >
                  <Radio value={'Any'}>Any</Radio>
                  <Radio value={'1'}>1</Radio>
                  <Radio value={'2'}>2</Radio>
                  <Radio value={'H'}>H</Radio>
                </RadioGroup >
              </Col>
              <Col>
                <Checkbox
                  checked={filterShinies}
                  onChange={e => setEggSettingProperty('filterShinies', e.target.checked)}
                >
                  Filter shinies
                    </Checkbox>
              </Col>
              <Col>
                <Checkbox
                  checked={applyFilters}
                  onChange={e => setEggSettingProperty('applyFilters', e.target.checked)}
                >
                  Apply all filters
                    </Checkbox>
              </Col>


            </Card>
          </Col>
        </Row>

        <br />
        <Row type='flex' justify='center'>
          <Button type='primary' onClick={this.handleGenerateEggs}>
            RNGenerate!
          </Button>
        </Row>

        {/* 
            
  
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
          </Pane>
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
