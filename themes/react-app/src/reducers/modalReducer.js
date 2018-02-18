const initialState = {
  currentMuppet: {},
  fetching: false,
  fetched: false,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_MUPPET": {
      return {...state, fetching: true}
    }
    case "FETCH_MUPPET_REJECTED": {
      return {...state, fetching: false, error: action.payload, currentMuppet: {}}
    }
    case "FETCH_MUPPET_FULFILLED": {
      return {
        ...state, fetching: false, fetched: true, currentMuppet: action.payload, error: null,
      }
    }
  }
  return state;

}