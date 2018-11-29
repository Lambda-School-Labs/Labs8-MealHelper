/* ALARM ACTIONS */
import axios from "axios";

//Action Types
export const FETCHING_ALARMS = "FETCHING_ALARMS";
export const FETCHED_ALARMS = "FETCHED_ALARMS";
export const FETCHING_ALARMS_ERROR = "FETCHING_ALARMS_ERROR";
export const ADDING_ALARMS = "ADDING_ALARMS";
export const ADDED_ALARMS = "ADDED_ALARMS";
export const ADDING_ALARMS_ERROR = "ADDING_ALARMS_ERROR";
export const DELETING_ALARMS = "ADDING_ALARMS";
export const DELETED_ALARMS = "ADDED_ALARMS";
export const DELETING_ALARMS_ERROR = "ADDING_ALARMS_ERROR";
export const UPDATING_ALARMS = "UPDATING_ALARMS";
export const UPDATED_ALARMS = "UPDATED_ALARMS";
export const UPDATING_ALARMS_ERROR = "UPDATING_ALARMS_ERROR";

//Action Creators
export const fetchAlarms = () => dispatch => {
  dispatch({ type: FETCHING_ALARMS });
  const promise = axios.get(
    "URL"
  );
  promise
    .then(response => {
      dispatch({ type: FETCHED_ALARMS, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: FETCHING_ALARMS_ERROR, payload: err })
    })
}

export const addAlarms = alarms => dispatch => {
  dispatch({ type: ADDING_ALARMS });
  console.log("ALARMS", alarms);
  const user_id = alarms.user_id;
  axios
    .post(`https://labs8-meal-helper.herokuapp.com/alarms/${user_id}`, alarms)
    .then(response => {
      dispatch({ type: ADDED_ALARMS, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: ADDING_ALARMS_ERROR, payload: err });
    });
}

export const deleteAlarm = id => dispatch => {
  dispatch({ type: DELETING_ALARM });
  axios
    .delete(`URL`)
    .then(response => {
      dispatch({ type: DELETED_NOTE, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: DELETED_NOTE_ERROR, payload: err });
    });
}

export const updateAlarm = alarm => dispatch => {
  const id = alarm.id;
  const label = alarm.label;
  const alarm = alarm.alarm;
  const updatedAlarm = { label, alarm };
  dispatch({ type: UPDATING_ALARM });
  axios
    .put( `URL`, updatedAlarm)
    .then(response => {
      dispatch({ type: UPDATED_NOTE, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: UPDATING_NOTE_ERROR, payload: err })
    })
};