import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import Header from "./components/ui/Header";
import theme from "./components/ui/Theme";
import BodyComponent from "./components/ui/BodyComponent";
import UserManual from "./components/ui/UserManual";
import CodeAuth from "./components/ui/CodeAuth";
import { BrowserRouter, Route } from "react-router-dom";


function App() {
  const [showSignIn, setShowSignIn] = React.useState(true);

  return (
    <ThemeProvider theme={theme}>
      <Header showSignIn={showSignIn} />
      <BrowserRouter>
        <Route exact path="/" component={UserManual} />
        <Route exact path="/slack" component={CodeAuth} />
        <Route
          exact
          path="/channels"
          render={(props) => {
            return (
              <BodyComponent
                {...props}
                showSignIn={(showSignIn) => setShowSignIn(showSignIn)}
              />
            );
          }}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
