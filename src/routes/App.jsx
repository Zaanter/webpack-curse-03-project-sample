import React, {Suspense} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@containers/Home';
import Layout from '@components/Layout';
import NotFound from '@containers/NotFound';
import useInitialState from '@hooks/useInitialState';
import AppContext from '@context/AppContext';
import { hot } from 'react-hot-loader/root'

const AsyncLazyCheckout = React.lazy(() => import('@containers/Checkout'))

const App = () => {
  const initialState = useInitialState();
  const isEmpty = Object.keys(initialState.products).length;

  return(
    <>
      {isEmpty > 0 ? (
        <Suspense fallback={<div style={{display:'flex', justifyContent:'center', alignItems:'center',minHeight:'100vh'}}><h1>Loading...</h1></div>}>
          <AppContext.Provider value={initialState}>
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route exact path="/" element={ <Home />} />
                  <Route exact path="/checkout" element={<AsyncLazyCheckout />} />
                  <Route component={NotFound} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </AppContext.Provider>
        </Suspense>
      ) : (<div style={{display:'flex', justifyContent:'center', alignItems:'center',minHeight:'100vh'}}>
            <h1>Loading...</h1>
          </div>) }
    </>
  )
}

export default hot(App);
