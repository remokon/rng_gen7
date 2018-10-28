export const setEggSettingProperty = (name, value) => {
  return {
    type: 'SET_EGG_SETTING',
    payload: { name, value }
  };
};
