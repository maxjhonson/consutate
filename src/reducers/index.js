import { combineReducers } from "redux";
import loadingReducer from "./loadingReducer";
import questionnaireReducer from "./questionnaireReducer";
import recomendationReducer from "./recomendationReducer";
import rulesReducer from "./rulesReducer";
import gradeRecomendationReducer from "./gradeRecomendationReducer";

export default combineReducers({
  questionnaires: questionnaireReducer,
  rules: rulesReducer,
  loading: loadingReducer,
  recomendations: recomendationReducer,
  gradeRecomendation: gradeRecomendationReducer,
});
