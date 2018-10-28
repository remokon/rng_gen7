import React from "react";
import { connect } from "react-redux";
import { partial, filter, join, map, parseInt, reverse } from "lodash-es";
import { generateEggs } from "gen7rng";
import { StyledButton } from "../components/styled-button";
import { TextInput } from "../components/text-input";
import { Checkbox } from "../components/checkbox";
import { RadioButton } from "../components/radio-button";
import { Divider } from "../components/divider";
import { TitleText } from "../components/title-text";
import {
  changeScreen,
  setRNGResults,
  setEggSetting
} from "../store/dispatchers";
import {
  parseList,
  parseIVList,
  parseSeedList
} from "../utils/parse-number-list";
import { pokemonFilter } from "../utils/pokemon-filters";

export const EggSettings = ({
  eggSettings,
  setSetting,
  setResults,
  setScreen
}) => {
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
      "egg"
    );
    const results = applyFilters ? filter(eggs, isPassingFilters) : eggs;

    setResults({ type: "egg", results });
    setScreen({ name: "rngResults", title: "Egg Results" });
  };

  return (
    <div >
      <TitleText style={{ color: "#FFFFFF" }}>Egg seeds</TitleText>
      <Divider style={{ backgroundColor: "rgba(255,255,255,0.4)" }} />
      <TextInput
        placeholder="Egg seeds"
        onChange={seedList => saveSetting("eggSeeds")(parseSeedList(seedList))}
        value={join(eggSeeds, ", ")}
      />

      <TitleText style={{ color: "#FFFFFF" }}>Female Ability</TitleText>
      <Divider style={{ backgroundColor: "rgba(255,255,255,0.4)" }} />
      <RadioButton
        color="#0277BD"
        onChange={saveSetting("femaleAbility")}
        selected={femaleAbility}
        buttonSettings={[
          { label: "Female Ability 1", value: "1" },
          { label: "Female Ability 2", value: "2" },
          { label: "Female Ability H", value: "H" }
        ]}
      />

      <TitleText style={{ color: "#FFFFFF" }}>Male Ability</TitleText>
      <Divider style={{ backgroundColor: "rgba(255,255,255,0.4)" }} />
      <RadioButton
        color="#0277BD"
        onChange={saveSetting("maleAbility")}
        selected={maleAbility}
        buttonSettings={[
          { label: "Male Ability 1", value: "1" },
          { label: "Male Ability 2", value: "2" },
          { label: "Male Ability H", value: "H" }
        ]}
      />

      <TitleText style={{ color: "#FFFFFF" }}>Female Item</TitleText>
      <Divider style={{ backgroundColor: "rgba(255,255,255,0.4)" }} />
      <RadioButton
        color="#0277BD"
        onChange={saveSetting("femaleItem")}
        selected={femaleItem}
        buttonSettings={[
          { label: "None" },
          { label: "Everstone" },
          { label: "Destiny Knot" },
          { label: "Power Weight" },
          { label: "Power Bracer" },
          { label: "Power Belt" },
          { label: "Power Lens" },
          { label: "Power Band" },
          { label: "Power Anklet" }
        ]}
      />

      <TitleText style={{ color: "#FFFFFF" }}>Male Item</TitleText>
      <Divider style={{ backgroundColor: "rgba(255,255,255,0.4)" }} />
      <RadioButton
        color="#0277BD"
        onChange={saveSetting("maleItem")}
        selected={maleItem}
        buttonSettings={[
          { label: "None" },
          { label: "Everstone" },
          { label: "Destiny Knot" },
          { label: "Power Weight" },
          { label: "Power Bracer" },
          { label: "Power Belt" },
          { label: "Power Lens" },
          { label: "Power Band" },
          { label: "Power Anklet" }
        ]}
      />

      <TitleText style={{ color: "#FFFFFF" }}>Female IVs</TitleText>
      <Divider style={{ backgroundColor: "rgba(255,255,255,0.4)" }} />
      <RadioButton
        color="#0277BD"
        onChange={saveSetting("femaleIVs")}
        selected={femaleIVs}
        buttonSettings={[
          { label: "31/31/31/31/31/31" },
          { label: "31/00/31/31/31/31" },
          { label: "31/31/31/31/31/00" }
        ]}
      />
      <TextInput
        placeholder="Custom IVs"
        onChange={saveSetting("femaleIVs")}
        value={join(parseList(2, "/", femaleIVs), "/")}
      />

      <TitleText style={{ color: "#FFFFFF" }}>Male IVs</TitleText>
      <Divider style={{ backgroundColor: "rgba(255,255,255,0.4)" }} />
      <RadioButton
        color="#0277BD"
        onChange={saveSetting("maleIVs")}
        selected={maleIVs}
        buttonSettings={[
          { label: "31/31/31/31/31/31" },
          { label: "31/00/31/31/31/31" },
          { label: "31/31/31/31/31/00" }
        ]}
      />
      <TextInput
        placeholder="Custom IVs"
        onChange={saveSetting("maleIVs")}
        value={join(parseList(2, "/", maleIVs), "/")}
      />

      <TitleText style={{ color: "#FFFFFF" }}>Gender Ratio (F:M)</TitleText>
      <Divider style={{ backgroundColor: "rgba(255,255,255,0.4)" }} />
      <RadioButton
        color="#0277BD"
        onChange={saveSetting("genderRatio")}
        selected={genderRatio}
        buttonSettings={[
          { label: "Genderless" },
          { label: "1:1" },
          { label: "7:1" },
          { label: "3:1" },
          { label: "1:3" },
          { label: "1:7" },
          { label: "Male only" },
          { label: "Female only" }
        ]}
      />

      <TitleText style={{ color: "#FFFFFF" }}>Shiny Settings</TitleText>
      <Divider style={{ backgroundColor: "rgba(255,255,255,0.4)" }} />
      <TextInput
        placeholder="Your TSV"
        onChange={tsv => saveSetting("playerTSV")(parseInt(tsv))}
        value={playerTSV}
      />
      <TextInput
        placeholder="Other TSVs"
        onChange={tsvList =>
          saveSetting("otherTSVs")(parseList(4, ", ", tsvList))
        }
        value={join(otherTSVs, ", ")}
      />
      <Checkbox
        color="#0277BD"
        label="Masuda Method"
        checked={masudaMethod}
        onCheckHandler={saveSetting("masudaMethod")}
      />
      <Checkbox
        color="#0277BD"
        label="Shiny Charm"
        checked={shinyCharm}
        onCheckHandler={saveSetting("shinyCharm")}
      />

      <TitleText style={{ color: "#FFFFFF" }}>Filter Settings</TitleText>
      <TextInput
        placeholder="Upper limit IVs"
        onChange={saveSetting("ivFilterUpper")}
        value={join(parseList(2, "/", ivFilterUpper), "/")}
      />
      <TextInput
        placeholder="Lower limit IVs"
        onChange={saveSetting("ivFilterLower")}
        value={join(parseList(2, "/", ivFilterLower), "/")}
      />
      <TextInput
        placeholder="Perfect IVs"
        onChange={saveSetting("perfectIVFilter")}
        value={perfectIVFilter}
      />
      <RadioButton
        color="#0277BD"
        onChange={saveSetting("genderFilter")}
        selected={genderFilter}
        buttonSettings={[
          { label: "No Gender" },
          { label: "Genderless" },
          { label: "Male" },
          { label: "Female" }
        ]}
      />
      <Checkbox
        color="#0277BD"
        label="Filter Shinies"
        checked={filterShinies}
        onCheckHandler={saveSetting("filterShinies")}
      />
      <Checkbox
        color="#0277BD"
        label="Apply Filters"
        checked={applyFilters}
        onCheckHandler={saveSetting("applyFilters")}
      />

      <TitleText style={{ color: "#FFFFFF" }}>Misc Settings</TitleText>
      <Divider style={{ backgroundColor: "rgba(255,255,255,0.4)" }} />
      <Checkbox
        color="#0277BD"
        label="Parents are Nidoran"
        checked={nidoType}
        onCheckHandler={saveSetting("nidoType")}
      />
      <Checkbox
        color="#0277BD"
        label="Parents the same species"
        checked={sameDexNumber}
        onCheckHandler={saveSetting("sameDexNumber")}
      />
      <Checkbox
        color="#0277BD"
        label="The female is Ditto"
        checked={isFemaleDitto}
        onCheckHandler={saveSetting("isFemaleDitto")}
      />
      <TextInput
        placeholder="Number of frames to generate"
        onChange={saveSetting("framesToGenerate")}
        value={framesToGenerate}
      />

      <StyledButton onClick={handleGenerateEggs}>Generate Eggs!</StyledButton>
    </div>
  );
};

export const EggSettingsScreen = connect(
  ({ eggSettings }) => ({ eggSettings }),
  {
    setSetting: setEggSetting,
    setResults: setRNGResults,
    setScreen: changeScreen
  }
)(EggSettings);
