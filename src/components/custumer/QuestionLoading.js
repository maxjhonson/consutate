import React from "react";
import Question from "./Question";

function QuestionLoading() {
  return (
    <div
      className="ui segment"
      style={{
        background: "#EEF6F6",
        borderWidth: "0px",
        marginTop: "-20px",
      }}
    >
      <Question
        question={{
          text: "Cargando proxima pregunta",
          answers: [
            { text: "", _id: "" },
            { text: "", _id: "" },
            { text: "", _id: "" },
          ],
        }}
      />
      <div class="ui active inverted dimmer">
        <div class="ui text loader">Loading</div>
      </div>
      <p></p>
    </div>
  );
}

export default QuestionLoading;
