import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Login  from './index';

// import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
// import {characterReducer} from '.././state/reducers/characterReducer'
import characterReducer from '.././state/reducers/characterReducer';
import allReducers from '.././state/reducers/allReducers';

import {applyMiddleware} from 'redux';

const store = configureStore({ reducer: allReducers },applyMiddleware(thunk))

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);


  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          Material Kit Pro
        </title>  
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {getLayout(<Provider store={store}><Component {...pageProps} /></Provider>)}
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
