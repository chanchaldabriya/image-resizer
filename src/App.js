import React from 'react';
import './App.css';
import ImageUploader from './components/ImageUploader/ImageUploader';
import { Switch, Route, Redirect } from "react-router-dom";
import ResizedImages from './components/ResizedImages/ResizedImages';

function App() {
  return (
    <div className="App">
      <Switch>
        {/* root route("/") - ImageUploader */}
        <Route exact path="/" component={ImageUploader} />

        {/* resize route("/resize/image") - ResizedImages */}
        <Route exact path="/resize/:image" component={ResizedImages} />

        {/* default case */}
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
