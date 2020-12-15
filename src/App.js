import { ThemeProvider } from "@material-ui/core";
import "./App.scss";
import theme from "custom-theme";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "features/Auth/pages/Login";
import Register from "features/Auth/pages/Register";
import Home from "features/Home";
import Header from "components/Header";
import { useSelector } from "react-redux";
import Notification from "components/Notification";
import PublishRoute from "components/PublishRoute";

function App() {
	const { type, message } = useSelector(state => state.notification);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
				{ message && <Notification type={type} message={message} />}
				<Header />
        <Switch>
          <PublishRoute exact path="/login" component={Login} />
          <PublishRoute exact path="/register" component={Register} />
					<Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
