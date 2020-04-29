import React from "react";
import { ThemeProvider } from "@material-ui/styles";

import theme from "./components/ui/Theme";
import BodyComponent from "./components/ui/BodyComponent";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BodyComponent />
    </ThemeProvider>
  );
}

export default App;
