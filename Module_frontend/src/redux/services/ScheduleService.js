import axios from 'axios';
import {getAllScheduleSuccess, getAllScheduleStart, getAllScheduleError, getScheduleByIDStart, getScheduleByIDError, getScheduleByIDSuccess} from "../slices/ScheduleSlice"
import {updateScheduleError, updateScheduleStart, updateScheduleSusscess} from "../slices/ScheduleSlice"

const API_URL = 'http://localhost:8081/api/v1/schedule';

export const fetchSchedule = async (dispatch) => {
  dispatch(getAllScheduleStart())
  try {
    const response = await axios.get(API_URL);
    console.log(response.data);
    dispatch(getAllScheduleSuccess(response.data));
    // return response.data
  } catch (error) {
    console.error('Error fetching users:', error);
    dispatch(getAllScheduleError());
  }
};

export const fetchScheduleById = async (ScheduleId, dispatch) => {
  dispatch(getScheduleByIDStart())
  try {
    const response = await axios.get(`${API_URL}/${ScheduleId}`)
    console.log(response.data);
    dispatch(getScheduleByIDSuccess(response.data));
  } catch (error) {
    console.error(`Error fetching user with ID ${ScheduleId}:`, error);
    dispatch(getScheduleByIDError());
  }
};

export const addSchedule = async (ScheduleData) => {
  try {
    const response = await axios.post(API_URL, ScheduleData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

export const updateSchedule = async (updatedSchedule, dispatch) => {
  dispatch(updateScheduleStart())
  try {
    const response = await axios.put(`${API_URL}/update/${updatedSchedule.id}`, updatedSchedule, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("-------------", response.data)
    // return response.data;
    dispatch(updateScheduleSusscess(response.data));
  } catch (error) {
    console.error(`Error updating user with ID ${updatedSchedule.id} :`, updatedSchedule ,error);
    dispatch(updateScheduleError())
  }
};

export const removeSchedule = async (ScheduleId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${ScheduleId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error removing user with ID ${ScheduleId}:`, error);
    throw error;
  }
};
