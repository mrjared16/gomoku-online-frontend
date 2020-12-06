import { ThemeProvider } from "@material-ui/core";
import "./App.scss";
import theme from "custom-theme";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "features/Auth/pages/Login";
import Register from "features/Auth/pages/Register";
import Home from "features/Home/pages/Home";
import Header from "components/Header";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
				<Header />
        <Switch>
					<Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
