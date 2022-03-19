import React, { useState } from "react";
import "./custumer.css";

const Question = ({ question, nextQuestion, selectAnswer, previousQuestion }) => {
  const [dependant, setDependant] = useState(null);

  const onSelectAnswer = (_id, dependantForm) => {
    setDependant(dependantForm);
    selectAnswer(_id);
  };

  const renderAnswer = (answers) => {
    return answers?.map(({ _id, text, dependantForm }, i) => {
      return (
        <div
          key={_id}
          onClick={() => onSelectAnswer(_id, dependantForm?.formId)}
          class="ui grid  ui segment  answer-segment "
        >
          <div className="fourteen wide column ">
            <div key={_id} className="">
              <h3 className="ui header">{text}</h3>
            </div>
          </div>
          <div className="two wide column">
            {question.selectedAnswerId === _id && (
              <i className="check icon" style={{ color: "#5BBFBA" }} />
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="question-container">
      <div className="ui grid mb-5">
        <div class="two wide column">
          <button
            onClick={previousQuestion}
            type="button"
            style={{ background: "none", border: "none" }}
          >
            <h3>
              <i className="arrow left icon"></i>
            </h3>
          </button>
        </div>
        <div className="fourteen wide column">
          <h2 className="ui header">{question.text}</h2>
        </div>
      </div>
      {renderAnswer(question.answers)}
      <div style={{ marginBottom: "120px" }}></div>
      <div className="continue-footer-bar">
        <button
          disabled={!question.selectedAnswerId}
          onClick={() => nextQuestion(dependant)}
          className="landing-content-button"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default Question;
