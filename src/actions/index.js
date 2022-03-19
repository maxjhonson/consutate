import coreApi from "../api/coreApi";

import {
  ADD_RECOMENDATION,
  ADD_RULE,
  DELETE_RULE,
  FETCH_ALL_QUESTIONNAIRE,
  FETCH_ALL_QUESTIONNAIRE_SUCCESS,
  FETCH_ALL_QUESTIONNAIRE_ERROR,
  FETCH_QUESTIONNAIRE,

  //FETCH_QUESTIONNAIRE_SUCCESS,
  //FETCH_QUESTIONNAIRE_ERROR,
  FETCH_RECOMENDATIONS,
  FETCH_RULES,
  RESET_QUESTIONNAIRE,
  UPDATE_LOADING,
  UPDATE_QUESTIONNAIRE,
  UPDATE_QUESTIONNAIRE_SUCCESS,
  UPDATE_QUESTIONNAIRE_ERROR,
  UPDATE_RECOMENDATION,
  DELETE_RECOMENDATION,
  UPDATE_RULE,
  ADD_QUESTIONNAIRE,
  ADD_QUESTIONNAIRE_SUCCESS,
  ADD_QUESTIONNAIRE_ERROR,
  ADD_GRADE_RECOMENDATION,
  ADD_GRADE_RECOMENDATION_SUCCESS,
  ADD_GRADE_RECOMENDATION_ERROR,
  FETCH_ALL_GRADE_RECOMENDATION,
  FETCH_ALL_GRADE_RECOMENDATION_SUCCESS,
  FETCH_ALL_GRADE_RECOMENDATION_ERROR,
  UPDATE_GRADE_RECOMENDATION,
  UPDATE_GRADE_RECOMENDATION_SUCCESS,
  UPDATE_GRADE_RECOMENDATION_ERROR,
  DELETE_GRADE_RECOMENDATION,
  DELETE_GRADE_RECOMENDATION_SUCCESS,
  DELETE_GRADE_RECOMENDATION_ERROR,
  FETCH_ROOT_FORM,
  FETCH_ROOT_FORM_SUCCESS,
  FETCH_ROOT_FORM_ERROR,
  FETCH_DEPENDENT_FORM,
  FETCH_DEPENDENT_FORM_SUCCESS,
  FETCH_DEPENDENT_FORM_ERROR,
} from "./types";
import { ObjectId } from "bson";

export const fetchQuestionnaire = (id) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_LOADING, payload: true });
    const response = await coreApi.get(`/questionnaire/${id}`);
    dispatch({ type: FETCH_QUESTIONNAIRE, payload: response.data });
    dispatch({ type: UPDATE_LOADING, payload: false });
  };
};

export const saveOrUpdate = (formValues) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_LOADING, payload: true });
    if (formValues._id) {
      const response = await coreApi.put(`/questionnaire/`, {
        data: JSON.stringify(formValues),
      });
      dispatch({ type: UPDATE_QUESTIONNAIRE, payload: response.data });
    } else {
      const response = await coreApi.post(`/questionnaire`, {
        data: JSON.stringify(formValues),
      });
      dispatch({ type: UPDATE_QUESTIONNAIRE, payload: response.data });
    }
    dispatch({ type: UPDATE_LOADING, payload: false });
  };
};

export const resetQuestionnaire = () => {
  return (dispatch) => {
    dispatch({ type: RESET_QUESTIONNAIRE, payload: undefined });
  };
};

export const fetchAllQuestionnaires = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ALL_QUESTIONNAIRE });
    try {
      const response = await coreApi.get(`/questionnaire/`);
      dispatch({
        type: FETCH_ALL_QUESTIONNAIRE_SUCCESS,
        payload: response.data,
      });
      dispatch({ type: UPDATE_LOADING, payload: false });
    } catch (e) {
      // console.log(e);
    }
  };
};

export const fetchRules = (formId) => {
  return async (dispatch) => {
    const response = await coreApi.get(`/rule?formId=${formId}`);
    dispatch({ type: FETCH_RULES, payload: response.data });
  };
};

export const addRule = (rule) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_QUESTIONNAIRE });
    dispatch({ type: ADD_RULE, payload: rule });
    await coreApi.post("/rule", rule);
    //dispatch({ type: UPDATE_LOADING, payload: false });
  };
};

export const updateRule = (rule) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_RULE, payload: rule });
    await coreApi.put("/rule", rule);
  };
};

export const deleteRule = (id, formId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_RULE, payload: id });
    await coreApi.delete(`/rule/${id}`);
  };
};

export const updateQuestionnaire = (formValues) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_QUESTIONNAIRE });
    try {
      const response = await coreApi.put(`/questionnaire/`, formValues);
      dispatch({ type: UPDATE_QUESTIONNAIRE_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({
        type: UPDATE_QUESTIONNAIRE_ERROR,
        payload: err.response.data.data.message,
      });
    }
  };
};

export const addQuestionnaire = (formValues) => {
  return async (dispatch) => {
    dispatch({ type: ADD_QUESTIONNAIRE });
    try {
      const response = await coreApi.post(`/questionnaire/`, formValues);
      dispatch({ type: ADD_QUESTIONNAIRE_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({
        type: ADD_QUESTIONNAIRE_ERROR,
        payload: err.response.data.infoMessage,
      });
    }
  };
};

export const addRecomendation = (
  recomendation,
  secondRecomendation,
  magnitude,
  asociatedRecomendations
) => {
  return async (dispatch) => {
    const _id = new ObjectId().toString();
    dispatch({
      type: ADD_RECOMENDATION,
      payload: {
        _id,
        recomendation,
        secondRecomendation,
        magnitude,
        asociatedRecomendations,
      },
    });
    await coreApi.post(`/recomendation/`, {
      _id,
      recomendation,
      secondRecomendation,
      magnitude,
      asociatedRecomendations,
    });
  };
};

export const updateRecomendation = (
  _id,
  recomendation,
  secondRecomendation,
  magnitude,
  asociatedRecomendations
) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_RECOMENDATION,
      payload: {
        _id,
        recomendation,
        secondRecomendation,
        magnitude,
        asociatedRecomendations,
      },
    });
    await coreApi.put(`/recomendation/`, {
      _id,
      recomendation,
      secondRecomendation,
      magnitude,
      asociatedRecomendations,
    });
  };
};

export const deleteRecomendation = (id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_RECOMENDATION, payload: id });
    await coreApi.delete(`/recomendation/${id}`);
  };
};

export const fetchRecomendation = () => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_LOADING, payload: true });
    const result = await coreApi.get(`/recomendation/`);
    dispatch({ type: FETCH_RECOMENDATIONS, payload: result.data ?? [] });
    dispatch({ type: UPDATE_LOADING, payload: false });
  };
};

export const fethAllGradeRecomendation = (questionnaireId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ALL_GRADE_RECOMENDATION });
    try {
      const result = await coreApi.get(
        `/gradeRecomendation?questionnaireId=${questionnaireId}`
      );
      dispatch({
        type: FETCH_ALL_GRADE_RECOMENDATION_SUCCESS,
        payload: result.data,
      });
    } catch {
      dispatch({ type: FETCH_ALL_GRADE_RECOMENDATION_ERROR });
    }
  };
};

export const addGradeRecomendation = (gradeRecomendation) => {
  return async (dispatch) => {
    dispatch({ type: ADD_GRADE_RECOMENDATION });
    try {
      const result = await coreApi.post("/gradeRecomendation", gradeRecomendation);
      dispatch({ type: ADD_GRADE_RECOMENDATION_SUCCESS, payload: result.data });
    } catch {
      dispatch({ type: ADD_GRADE_RECOMENDATION_ERROR });
    }
  };
};

export const updateGradeRecomendation = (gradeRecomendation) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_GRADE_RECOMENDATION });
    try {
      await coreApi.put("/gradeRecomendation", gradeRecomendation);
      dispatch({
        type: UPDATE_GRADE_RECOMENDATION_SUCCESS,
        payload: gradeRecomendation,
      });
    } catch {
      dispatch({ type: UPDATE_GRADE_RECOMENDATION_ERROR });
    }
  };
};

export const deleteGradeRecomendation = (id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_GRADE_RECOMENDATION });
    try {
      await coreApi.delete(`/gradeRecomendation/${id}`);
      dispatch({ type: DELETE_GRADE_RECOMENDATION_SUCCESS, payload: id });
    } catch {
      dispatch({ type: DELETE_GRADE_RECOMENDATION_ERROR });
    }
  };
};

//ROOT FORM
export const fetchRootForm = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ROOT_FORM });
    try {
      const result = await coreApi.get(`/questionnaireRoot`);
      dispatch({ type: FETCH_ROOT_FORM_SUCCESS, payload: result.data });
    } catch {
      dispatch({ type: FETCH_ROOT_FORM_ERROR });
    }
  };
};

export const fetchDependentForm = (id) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_DEPENDENT_FORM });
    try {
      const result = await coreApi.get(`/questionnaireDependent/${id}`);
      dispatch({ type: FETCH_DEPENDENT_FORM_SUCCESS, payload: result.data });
      return result.data;
    } catch {
      dispatch({ type: FETCH_DEPENDENT_FORM_ERROR });
    }
  };
};
