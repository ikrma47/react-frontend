import {
  GET_BATCHES,
  GET_PROGRAMS_TO_BE_OFFERED,
  SUBMIT_OFFERED_PROGRAMS,
  SUBMIT_BATCH,
  GET_OFFERED_PROGRAMS,
} from "pages/Admin/Batch/ducks/action-types";

function BatchReducer(state = {}, action) {
  switch (action.type) {
    case SUBMIT_BATCH:
      state = { ...state, batches: action.payload };
      break;
    case GET_BATCHES:
      state = { ...state, batches: action.payload };
      break;
    case GET_PROGRAMS_TO_BE_OFFERED:
      state = { ...state, programsToBeOffered: action.payload };
      break;
    case SUBMIT_OFFERED_PROGRAMS:
      state = { ...state, programsToBeOffered: action.payload };
      break;
    case GET_OFFERED_PROGRAMS:
      state = { ...state, offeredPrograms: action.payload };
      break;
    default:
  }
  return state;
}

export default BatchReducer;
