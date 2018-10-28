export const settingsReducer = ([SET_PROP, SET_ALL], prevState = {}, { type, payload }) => {
  switch(type) {
    case SET_PROP:
      return {
        ...prevState,
        [payload.name]: payload.value
      };
    case SET_ALL:
      return {
        ...prevState,
        ...payload
      };
  }

  return prevState;
}
