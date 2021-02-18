import { useEffect } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import MainFooter from './components/Footer/MainFooter';
import Header from './components/Header/Header';
import AuthContextProvider from './context/AuthContext';
import PublicSockContextProvider from './context/PublicSockContext';
import LoginRegister from './domain/account/LoginRegister';
import TickerMainPage from './domain/ticker/TickerMainPage';
import WWWHome from './domain/www/WWWHome';
import FinanceService from './services/FinanceService';

function App() {
  useEffect(() => {
    FinanceService.build();
  }, []);
  return (
    <BrowserRouter>
      <PublicSockContextProvider>
        <AuthContextProvider>
          <Header />
          <Route path={'/'} exact component={WWWHome} />
          <Route path={'/tickers/:ticker'} component={TickerMainPage} />
          <Route path={'/auth'} component={LoginRegister} />
          <MainFooter />
        </AuthContextProvider>
      </PublicSockContextProvider>
    </BrowserRouter>
  );
}

export default App;
