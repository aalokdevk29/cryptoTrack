import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.scss';

const CryptoTrackView = React.lazy(() => import('./components/View'));

const CryptoTrack = React.lazy(() => import('./components/List'));

function App() {
  return (
    <BrowserRouter>
      <React.Suspense fallback={'Loading...'}>
        <Switch>
          <Route
            exact
            path='/'
            name='CryptoTrack App'
            render={(props) => <CryptoTrack {...props} />}
          />
          <Route
            exact
            path='/view/:id'
            name='CryptoTrack App'
            render={(props) => <CryptoTrackView {...props} />}
          />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
