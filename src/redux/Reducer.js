import {SET_DATA} from './Action';

const initialState = {
  data: [],
};

function dataReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DATA:
      return {...state, data: action.payload};
    default:
      return state;
  }
}

export default dataReducer;
