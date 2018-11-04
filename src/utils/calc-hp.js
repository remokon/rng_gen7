const hiddenPowerTypes = {
    0: "Fighting",
    1: "Flying",
    2: "Poison",
    3: "Ground",
    4: "Rock",
    5: "Bug",
    6: "Ghost",
    7: "Steel",
    8: "Fire",
    9: "Water",
    10: "Grass",
    11: "Electric",
    12: "Psychic",
    13: "Ice",
    14: "Dragon",
    15: "Dark"
  }
  
  // TODO: (2^i)*IVs[i]
  export const calcHP = IVs => {
    const lsbIVs = IVs.map(function(e) { 
      e = e % 2; 
      return e;
    });
    const typeNumber = Math.floor((
        lsbIVs[0] + 2*lsbIVs[1] + 4*lsbIVs[2] + 
        8*lsbIVs[3] +  16*lsbIVs[4] +  32*lsbIVs[5])
        *15/63)
    return hiddenPowerTypes[typeNumber]
  }
  