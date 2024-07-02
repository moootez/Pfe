// App.js

import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'react-router-redux';
import ThemeProvider from './config/themeProvider';
import Routes from './routes';
import store, { history } from './store';
import LanguageProvider from './config/languageProvider';
import languageMessages from './config/languageMessages';
import ErrorBoundary from './ErrorBoundary';
import './assets/sass/style.scss';
import 'react-toastify/dist/ReactToastify.css';

// import Products from './Graphql/test';

/**
 * App
 *
 * @returns
 */
const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
          <ConnectedRouter history={history} store={store}>
            <ThemeProvider>
              <BrowserRouter>
                <Switch>
                  
                  <LanguageProvider messages={languageMessages}>
                    <Routes history={history} />
                  </LanguageProvider>
                </Switch>
              </BrowserRouter>
            </ThemeProvider>
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
