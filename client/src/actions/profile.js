import axios from 'axios';

import {setAlert} from './alert';

import { PROFILE_ERROR, GET_PROFILE, UPDATE_PROFILE, GET_PROFILES, CLEAR_PROFILE } from "./types";

//get users profile

export const getCurrentProfile = () => async dispatch =>{
    try {
    
    const res = await axios.get('/api/profile/me');
    
    dispatch({
        type: GET_PROFILE,
        payload: res.data
    });
    
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg:err.response.statusText, status: err.response.status}
        });
    }
    
}


//create or update profile

export const createProfile = (formData, history, edit=false) => async dispatch =>{
    try {
    
    const config = {
        headers:{
            'Content-Type' : 'application/json'
        }
    } 
    const res = await axios.post('/api/profile', formData, config);
    
    dispatch({
        type: GET_PROFILE,
        payload: res.data
    });
    
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
    
    if(!edit){
        history.push('/dashboard');
    }

    } catch (err) {
        
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
        }
        
        dispatch({  
            type: PROFILE_ERROR,
            payload: {msg:err.response.statusText, status: err.response.status}
        });
    
    }
    
} 

// Get all profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get('/api/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    // 
  }
};

// Get profile by ID
export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
//Add Experience

// export const addExperience = (formData, history) => async dispatch =>{
    
//     try {
//         const config = {
//             headers:{
//                 'Content-Type' : 'application/json'
//             }
//         } 
//         const res = await axios.post('/api/profile', formData, config);
//         dispatch({
//             type: GET_PROFILE,
//             payload: res.data
//         });
//         dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
//         if(!edit){
//             history.push('/dashboard');
//         }
//         } catch (err) {
//             const errors = err.response.data.errors;
//             if(errors) {
//                 errors.forEach( error => dispatch(setAlert(error.msg, 'danger')));
//             }
            
//             dispatch({  
//                 type: PROFILE_ERROR,
//                 payload: {msg:err.response.statusText, status: err.response.status}
//             });
//         }
    
// }

// Add Education
export const addEducation = (formData, history) => async dispatch => {
    try {
      const res = await axios.put('/api/profile/education', formData);
  
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
  
      dispatch(setAlert('Education Added', 'success'));
  
      history.push('/dashboard');
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };


// Delete education
export const deleteEducation = id => async dispatch => {
    try {
      const res = await axios.delete(`/profile/education/${id}`);
  
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
  
      dispatch(setAlert('Education Removed', 'success'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  
  