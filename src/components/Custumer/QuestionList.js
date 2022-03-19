import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchDependentForm, fetchRootForm } from "../../actions";
import Question from "./Question";
import QuestionLoading from "./QuestionLoading";

const QuestionList = ({
  rootForm,
  dependent,
  fetchDependentForm,
  fetchRootForm,
  loading,
}) => {
  const [questionnaireTree, setQuestionnaireTree] = useState(null);
  const [principalForm, setPrincipalForm] = useState();
  const [currentIndex, setCurrentIndex] = useState({
    form: 0,
    question: 0,
  });
  const history = useHistory();

  useEffect(() => {
    fetchRootForm();
  }, []);

  useEffect(() => {
    let newQuestionnaire = null;
    if (rootForm)
      newQuestionnaire = [
        { formName: "Por definir", questions: [...rootForm?.questions] },
      ];
    setQuestionnaireTree(newQuestionnaire);
  }, [rootForm]);

  const loadPrincipalForm = async (dependentForm) => {
    const result = await fetchDependentForm(dependentForm);
    const newQuestionnaireTree = [...questionnaireTree];
    newQuestionnaireTree[1] = {
      formName: "Por definir",
      questions: [...result?.questions],
    };
    setQuestionnaireTree([...newQuestionnaireTree]);
    setPrincipalForm(new Date());
    //
  };

  const selectAnswer = (answerId) => {
    const { form, question } = currentIndex;
    let newQuestionaireTre = [...questionnaireTree];
    newQuestionaireTre[form].questions[question].selectedAnswerId = answerId;
    setQuestionnaireTree(newQuestionaireTre);
  };

  const nextQuestion = async (dependantForm) => {
    const { form, question } = currentIndex;

    const isLastQuestion = () =>
      currentIndex.question >= questionnaireTree[form].questions.length - 1;

    if (currentIndex.form === 0) {
      loadPrincipalForm(dependantForm);
    } else if (isLastQuestion()) {
      if (currentIndex.form > questionnaireTree.length - 1) {
      } else {
        history.push("/mailForm");
      }
    } else {
      setCurrentIndex({ form, question: question + 1 });
    }
  };

  //principal form loaded
  useEffect(() => {
    if (principalForm) setCurrentIndex({ form: 1, question: 0 });
  }, [principalForm]);

  const previousQuestion = () => {};
  if (!questionnaireTree || !questionnaireTree[currentIndex.form]?.questions)
    return <div></div>;
  if (loading) return <QuestionLoading />;
  return (
    <Question
      question={questionnaireTree[currentIndex.form].questions[currentIndex.question]}
      selectAnswer={selectAnswer}
      index={currentIndex}
      nextQuestion={nextQuestion}
      previousQuestion={previousQuestion}
    />
  );
};

const mapStateToProp = (state) => {
  return {
    rootForm: state.questionnaires.rootForm,
    dependent: state.questionnaires.dependent,
    loading: state.questionnaires.loading,
  };
};

export default connect(mapStateToProp, { fetchRootForm, fetchDependentForm })(
  QuestionList
);
