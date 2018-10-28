import React from "react";
import { connect } from "react-redux";
import { isEqual, filter, parseInt, partial, join } from "lodash-es";
import { generateStationaries } from "gen7rng";
import { StyledButton } from "../components/styled-button";
import { TextInput } from "../components/text-input";
import { Checkbox } from "../components/checkbox";
import { RadioButton } from "../components/radio-button";
import { Divider } from "../components/divider";
import { TitleText } from "../components/title-text";
import {
  changeScreen,
  setRNGResults,
  setStationarySetting
} from "../store/dispatchers";
import { parseList, parseIVList } from "../utils/parse-number-list";
import { pokemonFilter } from "../utils/pokemon-filters";

export const StationarySettings = ({
  stationarySettings,
  setSetting,
  setResults,
  setScreen
}) => {
  const {
    ability,
    alwaysSync,
    applyFilters,
    delay,
    filterShinies,
    genderFilter,
    genderRatio,
    isForcedShiny,
    isShinyLocked,
    ivFilterLower,
    ivFilterUpper,
    npcCount,
    perfectIVCount,
    perfectIVFilter,
    pidRollCount,
    seconds,
    seed,
    startFrame,
    syncNature,
    tsv
  } = stationarySettings;
  const saveSetting = name => value => setSetting({ name, value });
  const handleGenerateEggs = () => {
    const rngStartFrame = parseInt(startFrame);
    const rngTime = parseInt(seconds);
    const settings = {
      ...stationarySettings,
      delay: parseInt(delay),
      npcCount: parseInt(npcCount),
      seed: parseInt(seed, 16),
      tsv: parseInt(tsv)
    };
    const parsedUpper = parseIVList(ivFilterUpper);
    const parsedLower = parseIVList(ivFilterLower);
    const stationaries = generateStationaries(settings, rngStartFrame, rngTime);
    const isPassingFilters = partial(
      pokemonFilter,
      parsedUpper,
      parsedLower,
      filterShinies,
      parseInt(perfectIVFilter),
      genderFilter,
      "stationary"
    );
    const results = applyFilters
      ? filter(stationaries, isPassingFilters)
      : stationaries;

    setResults({ type: "stationary", results });
    setScreen({ name: "rngResults", title: "Stationary Results" });
  };

  return (
    <div>
      <TitleText style={{ color: "#FFFFFF" }}>Initial seed</TitleText>
      <Divider style={{ backgroundColor: "rgba(255,255,255,0.4)" }} />
      <TextInput
        placeholder="Initial Seed"
        onChange={saveSetting("seed")}
        value={seed}
      />

      <TitleText style={{ color: "#FFFFFF" }}>Misc Settings</TitleText>
      <Divider style={{ backgroundColor: "rgba(255,255,255,0.4)" }} />
      <Checkbox
        color="#0277BD"
        label="Always Sync"
        checked={alwaysSync}
        onCheckHandler={saveSetting("alwaysSync")}
      />
      <Checkbox
        color="#0277BD"
        label="3 IVs"
        checked={isEqual(perfectIVCount, 3)}
        onCheckHandler={checked => {
          const perfectIVs = checked ? 3 : 0;
          saveSetting("perfectIVCount")(perfectIVs);
        }}
      />

      <TitleText style={{ color: "#FFFFFF" }}>Sync Ability</TitleText>
      <Divider style={{ backgroundColor: "rgba(255,255,255,0.4)" }} />
      <RadioButton
        color="#0277BD"
        onChange={saveSetting("syncNature")}
        selected={syncNature}
        buttonSettings={[
          { label: "None" },
          { label: "Hardy" },
          { label: "Lonely" },
          { label: "Brave" },
          { label: "Adamant" },
          { label: "Naughty" },
          { label: "Bold" },
          { label: "Docile" },
          { label: "Relaxed" },
          { label: "Impish" },
          { label: "Lax" },
          { label: "Timid" },
          { label: "Hasty" },
          { label: "Serious" },
          { label: "Jolly" },
          { label: "Naive" },
          { label: "Modest" },
          { label: "Mild" },
          { label: "Quiet" },
          { label: "Bashful" },
          { label: "Rash" },
          { label: "Calm" },
          { label: "Gentle" },
          { label: "Sassy" },
          { label: "Careful" },
          { label: "Quirky" }
        ]}
      />

      <TitleText style={{ color: "#FFFFFF" }}>Ability</TitleText>
      <Divider style={{ backgroundColor: "rgba(255,255,255,0.4)" }} />
      <RadioButton
        color="#0277BD"
        onChange={saveSetting("ability")}
        selected={ability}
        buttonSettings={[
          { label: "None", value: "0" },
          { label: "Ability 1", value: "1" },
          { label: "Ability 2", value: "2" },
          { label: "Ability H", value: "H" }
        ]}
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
        onChange={saveSetting("tsv")}
        value={tsv}
      />
      <Checkbox
        color="#0277BD"
        label="Shiny Charm"
        checked={isEqual(pidRollCount, 3)}
        onCheckHandler={checked => {
          const rollCount = checked ? 3 : 1;
          saveSetting("pidRollCount")(rollCount);
        }}
      />
      <Checkbox
        color="#0277BD"
        label="Forced Shiny"
        checked={isForcedShiny}
        onCheckHandler={saveSetting("isForcedShiny")}
      />
      <Checkbox
        color="#0277BD"
        label="Shiny Locked"
        checked={isShinyLocked}
        onCheckHandler={saveSetting("isShinyLocked")}
      />

      <TitleText style={{ color: "#FFFFFF" }}>Filter Settings</TitleText>
      <Divider style={{ backgroundColor: "rgba(255,255,255,0.4)" }} />
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

      <TitleText style={{ color: "#FFFFFF" }}>Timeline Settings</TitleText>
      <Divider style={{ backgroundColor: "rgba(255,255,255,0.4)" }} />
      <TextInput
        placeholder="Start frame"
        onChange={saveSetting("startFrame")}
        value={startFrame}
      />
      <TextInput
        placeholder="NPC Count"
        onChange={saveSetting("npcCount")}
        value={npcCount}
      />
      <TextInput
        placeholder="Seconds"
        onChange={saveSetting("seconds")}
        value={seconds}
      />
      <TextInput
        placeholder="Delay"
        onChange={saveSetting("delay")}
        value={delay}
      />

      <StyledButton onClick={handleGenerateEggs}>
        Generate Stationaries!
      </StyledButton>
    </div>
  );
};

export const StationarySettingsScreen = connect(
  ({ stationarySettings }) => ({ stationarySettings }),
  {
    setSetting: setStationarySetting,
    setResults: setRNGResults,
    setScreen: changeScreen
  }
)(StationarySettings);
