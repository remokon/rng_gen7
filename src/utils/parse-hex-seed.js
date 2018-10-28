import { padStart, toUpper } from 'lodash-es';

export const parseHexSeed = seed => padStart(toUpper(seed.toString(16)), 8, '0');