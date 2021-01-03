import { ThemeProvider } from '@material-ui/core';
import './App.scss';
import theme from 'custom-theme';
import { BrowserRouter, Switch } from 'react-router-dom';
import Login from 'features/Auth/pages/Login';
import Register from 'features/Auth/pages/Register';
import Home from 'features/Home';
import PublishRoute from 'components/PublishRoute';
import PrivateRoute from 'components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ToastContainer />
        <Switch>
          <PublishRoute exact path="/login" component={Login} />
          <PublishRoute exact path="/register" component={Register} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
