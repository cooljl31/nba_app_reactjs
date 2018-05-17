import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import Routes from './routes';

const App = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
