import {
  SUBMIT_BATCH,
  GET_BATCHES,
  GET_PROGRAMS_TO_BE_OFFERED,
  SUBMIT_OFFERED_PROGRAMS,
  GET_OFFERED_PROGRAMS,
} from "pages/Admin/Batch/ducks/action-types";
import {
  getBatches,
  submitBatch,
  getProgramsToBeOffered,
  submitOfferedPrograms,
  getOfferedPrograms,
} from "api";

export const submitBatchAction = (values) => async (dispatch) => {
  const { data } = await submitBatch(values);
  dispatch({ type: SUBMIT_BATCH, payload: data });
};

export const getBatchesAction = () => async (dispatch) => {
  const { data } = await getBatches();
  dispatch({ type: GET_BATCHES, payload: data });
};

export const getProgramsToBeOfferedAction = (batchId) => async (dispatch) => {
  const { data } = await getProgramsToBeOffered(batchId);
  dispatch({ type: GET_PROGRAMS_TO_BE_OFFERED, payload: data });
};

export const submitOfferedProgramsAction = (programs, batchId) => async (
  dispatch
) => {
  const { data } = await submitOfferedPrograms(programs, batchId);
  dispatch({ type: SUBMIT_OFFERED_PROGRAMS, payload: data });
};

export const getOfferedProgramsAction = (batchId) => async (dispatch) => {
  const { data } = await getOfferedPrograms(batchId);
  dispatch({ type: GET_OFFERED_PROGRAMS, payload: data });
};
