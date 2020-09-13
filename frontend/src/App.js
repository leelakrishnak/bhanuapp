import ListFiles from './ListFiles';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path='/:directory?' component={ListFiles} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

App.propTypes = {};

export default App;
