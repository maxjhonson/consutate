import React from "react";

function Loading(props) {
  return (
    <div class="ui segment">
      <p></p>
      <div class="ui active dimmer">
        <div class="ui loader"></div>
      </div>
    </div>
  );
}

export default Loading;
