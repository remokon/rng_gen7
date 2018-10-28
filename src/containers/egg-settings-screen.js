import React from 'react';
import { connect } from 'react-redux';
import { partial, filter, join, map, parseInt, reverse } from 'lodash-es';
import { generateEggs } from 'gen7rng';
import { RadioButton } from '../components/radio-button';
import { Divider } from '../components/divider';
import { TitleText } from '../components/title-text';
import { changeScreen, setRNGResults, setEggSetting } from '../store/dispatchers';
import { parseList, parseIVList, parseSeedList } from '../utils/parse-number-list';
import { pokemonFilter } from '../utils/pokemon-filters';
import { Button, Pane, Text, TextInputField, TextInput, Checkbox, RadioGroup } from 'evergreen-ui';
import { setEggSettingProperty } from '../actions/eggSettings';

export const EggSettings = ({ eggSettings, setSetting, setResults, setScreen, setEggSettingProperty }) => {
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

  const handleGenerateEggs = () => {
    const settings = {
      ...eggSettings,
      femaleIVs: parseIVList(femaleIVs),
      maleIVs: parseIVList(maleIVs),
      otherTSVs: map(otherTSVs, parseInt),
      eggSeeds: map(reverse([...eggSeeds]), seed => parseInt(seed, 16))
    };

    const parsedUpper = parseIVList(ivFilterUpper);
    const parsedLower = parseIVList(ivFilterLower);
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
  console.log(this.state);

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
        <Pane margin={8} className="fullOnMobile33">
          <TextInputField
            label="Egg seeds"
            placeholder="Egg seeds"
            onChange={seedList => saveSetting('eggSeeds')(parseSeedList(seedList))}
            value={join(eggSeeds, ', ')}
            required
          />
        </Pane>
        <Pane margin={8}>
          <RadioGroup
            label="Female Ability"
            value={femaleAbility}
            options={[
              { label: 'Female Ability 1', value: '1' },
              { label: 'Female Ability 2', value: '2' },
              { label: 'Female Ability H', value: 'H' }
            ]}
            onChange={saveSetting('femaleAbility')}
          />
        </Pane>
        <Pane margin={8}>
          <RadioGroup
            label="Male Ability"
            value={maleAbility}
            options={[
              { label: 'Male Ability 1', value: '1' },
              { label: 'Male Ability 2', value: '2' },
              { label: 'Male Ability H', value: 'H' }
            ]}
            onChange={saveSetting('maleAbility')}
          />
        </Pane>
        <Pane margin={8}>
          <RadioGroup
            label="Female Item"
            value={femaleItem}
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
            onChange={saveSetting('femaleItem')}
          />
        </Pane>

        <Pane margin={8}>
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
        </Pane>

        <Pane margin={8}>
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
        </Pane>

        <Pane margin={8}>
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
            label="Your TSV"
            placeholder="Your TSV"
            onChange={tsv => saveSetting('playerTSV')(parseInt(tsv))}
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
            onChange={saveSetting('perfectIVFilter')}
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
            onCheckHandler={e => setEggSettingProperty('nidoType', e.target.checked)}
          />
          <Checkbox
            label="Parents the same species"
            checked={sameDexNumber}
            onCheckHandler={e => setEggSettingProperty('sameDexNumber', e.target.checked)}
          />
          <Checkbox
            label="The female is Ditto"
            checked={isFemaleDitto}
            onCheckHandler={e => setEggSettingProperty('isFemaleDitto', e.target.checked)}
          />
        </Pane>

        <Pane margin={8} className="fullOnMobile33">
          <TextInputField
            label="Frames upper limit"
            placeholder="400"
            onChange={saveSetting('framesToGenerate')}
            value={framesToGenerate}
            required
          />
        </Pane>

        <Pane margin={8} className="fullOnMobile33">
          <Button appearance="primary" onClick={handleGenerateEggs}>
            Generate Eggs!
          </Button>
        </Pane>
      </Pane>
    </div>
  );
};

export const EggSettingsScreen = connect(
  ({ eggSettings }) => ({ eggSettings }),
  {
    setSetting: setEggSetting,
    setResults: setRNGResults,
    setScreen: changeScreen,
    setEggSettingProperty
  }
)(EggSettings);
