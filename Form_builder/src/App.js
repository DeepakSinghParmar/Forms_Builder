import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./component/files/home";
import Dashboard from "./component/files/dashboard";
import EditForm from "./component/files/editForm";
import ViewForm from "./component/files/viewForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route
            exact
            path="/dashboard/form/edit/:formId"
            component={EditForm}
          />
          <Route exact path="/form/view/:formId" component={ViewForm} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
