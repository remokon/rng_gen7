import React from "react";
import { connect } from "react-redux";
import { isEqual, filter, parseInt, partial, join } from "lodash-es";
import { generateEvents } from "gen7rng";
import { StyledButton } from "../components/styled-button";
import { TextInput } from "../components/text-input";
import { Checkbox } from "../components/checkbox";
import { RadioButton } from "../components/radio-button";
import { Divider } from "../components/divider";
import { TitleText } from "../components/title-text";
import {
  changeScreen,
  setRNGResults,
  setEventSetting
} from "../store/dispatchers";
import { parseList, parseIVList } from "../utils/parse-number-list";
import { pokemonFilter } from "../utils/pokemon-filters";

export const EventSettings = ({
  eventSettings,
  setSetting,
  setResults,
  setScreen
}) => {
  const {
    ability,
    applyFilters,
    delay,
    filterShinies,
    genderFilter,
    genderRatio,
    ivFilterLower,
    ivFilterUpper,
    npcCount,
    perfectIVCount,
    perfectIVFilter,
    pidType,
    seconds,
    seed,
    startFrame,
    tsv
  } = eventSettings;
  const saveSetting = name => value => setSetting({ name, value });
  const handleGenerateEvents = () => {
    const rngStartFrame = parseInt(startFrame);
    const rngTime = parseInt(seconds);
    const settings = {
      ...eventSettings,
      delay: parseInt(delay),
      npcCount: parseInt(npcCount),
      seed: parseInt(seed, 16),
      tsv: parseInt(tsv)
    };
    const parsedUpper = parseIVList(ivFilterUpper);
    const parsedLower = parseIVList(ivFilterLower);
    const events = generateEvents(settings, rngStartFrame, rngTime);
    const isPassingFilters = partial(
      pokemonFilter,
      parsedUpper,
      parsedLower,
      filterShinies,
      parseInt(perfectIVFilter),
      genderFilter,
      "stationary"
    );
    const results = applyFilters ? filter(events, isPassingFilters) : events;

    setResults({ type: "stationary", results });
    setScreen({ name: "rngResults", title: "Event Results" });
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
        label="3 IVs"
        checked={isEqual(perfectIVCount, 3)}
        onCheckHandler={checked => {
          const perfectIVs = checked ? 3 : 0;
          saveSetting("perfectIVCount")(perfectIVs);
        }}
      />

      <TitleText style={{ color: "#FFFFFF" }}>PID Type</TitleText>
      <Divider style={{ backgroundColor: "rgba(255,255,255,0.4)" }} />
      <RadioButton
        color="#0277BD"
        onChange={saveSetting("pidType")}
        selected={pidType}
        buttonSettings={[
          { label: "Random", value: 0 },
          { label: "Non-Shiny", value: 1 },
          { label: "Shiny", value: 2 },
          { label: "Specified", value: 3 }
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

      <StyledButton onClick={handleGenerateEvents}>
        Generate Stationaries!
      </StyledButton>
    </div>
  );
};

export const EventSettingsScreen = connect(
  ({ eventSettings }) => ({ eventSettings }),
  {
    setSetting: setEventSetting,
    setResults: setRNGResults,
    setScreen: changeScreen
  }
)(EventSettings);
