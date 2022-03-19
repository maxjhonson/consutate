import React from "react";
import Landing from "./Landing";
import "./custumer.css";
import { MemoryRouter, Route } from "react-router";
import QuestionList from "./QuestionList";
import { Link, Switch } from "react-router-dom";
import MailForm from "./MailForm";

function Custumer() {
  return (
    <MemoryRouter>
      <div className="box">
        <div className="row header" style={{ zIndex: 1 }}>
          <Link to="/">
            <img src="./consultate-logo.png"></img>
          </Link>
        </div>
        <div className="row content">
          <Switch>
            <Route path="/" exact>
              <Landing />
            </Route>
            <Route path="/questionnaire">
              <QuestionList />
            </Route>
            <Route path="/mailForm">
              <MailForm />
            </Route>
          </Switch>
        </div>
      </div>
    </MemoryRouter>
  );
}

export default Custumer;
