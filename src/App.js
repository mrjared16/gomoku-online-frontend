import { ThemeProvider } from "@material-ui/core";
import "./App.scss";
import theme from "custom-theme";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "features/Auth/pages/Login";
import Register from "features/Auth/pages/Register";
import Home from "features/Home/Home";
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
					<Route path="/" component={Home} />
          <PublishRoute exact path="/login" component={Login} />
          <PublishRoute exact path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
