import { partial, get, reduce, isEmpty, isEqual, filter } from 'lodash-es';

const isIVInRange = (upperIVs, lowerIVs, result, iv, index) => {
  return result && get(upperIVs, index) >= iv && get(lowerIVs, index) <= iv;
};

const ivFilter = (upperIVs, lowerIVs, { ivs }) => {
  if (!isEmpty(upperIVs) && !isEmpty(lowerIVs)) {
    const isValidIV = partial(isIVInRange, upperIVs, lowerIVs);
    return reduce(ivs, isValidIV, true);
  }

  return true;
};

const shinyFilter = (isShinyFilter, { shiny }) => {
  if (isShinyFilter && !shiny) {
    return false;
  }

  return true;
};

const perfectIVFilter = (desiredPerfectIVs, { ivs }) => {
  if (desiredPerfectIVs > 0) {
    const perfectIVCount = filter(ivs, iv => isEqual(iv, 31)).length;
    return perfectIVCount >= desiredPerfectIVs;
  }

  return true;
};

const genderFilter = (desiredGender, { gender }) => {
  return isEqual(desiredGender, 'No Gender') || isEqual(desiredGender, gender);
};

export const pokemonFilter = (
  upperIVs,
  lowerIVs,
  isShinyFilter,
  desiredPerfectIVs,
  desiredGender,
  selector,
  rngResult
) => {
  const pokemon = get(rngResult, selector);
  const filters = [
    ivFilter(upperIVs, lowerIVs, pokemon),
    genderFilter(desiredGender, pokemon),
    perfectIVFilter(desiredPerfectIVs, pokemon),
    shinyFilter(isShinyFilter, pokemon)
  ];

  return reduce(filters, (result, value) => result && value, true);
};