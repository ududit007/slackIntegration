import { createMuiTheme } from '@material-ui/core/styles';

const arcBlue = "#081123";

export default createMuiTheme({
    palette: {
        common: {
            blue: "#204B33",
            orange: "#FFBA60"
        },
        primary: {
            main: "#087223"
        },
        secondary: {
            main: "#FFBA60"
        }
    },
    typography: {
        tab: {
            fontFamily: "Raleway",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "1rem",
        },
        estimate: {
            fontFamily: "pacifico",
            fontSize: "1rem",
            textTransform: "none",
            color: "white",
            
        },
        h2:{
            fontFamily:"pacifico",
            fontWeight: 100,
            fontSize: "2.5rem",
            color: "FF0000",
            lineHeight: "1.5"
        },
        h3: {
            fontFamily: "Pacifico",
            fontSize: "2.5rem",
            color: arcBlue
        },
        h4: {
            fontFamily: "Raleway",
            fontSize: "1rem",
            color: "#00ff00",
            fontWeight: 100,
            textDecoration: "none",
            marginBottom: 15
        },
        subtitle1: {
            fontSize: "1.5rem",
            fontWeight: 300,
            color: '#868686'
        },
        subtitle2: {
            color: "white",
            fontSize: "1.25rem",
            fontWeight: 300
        },
        learnButton: {
            borderColor: arcBlue,
            color: arcBlue,
            borderWidth: 2,
            textTransform: "none",
            borderRadius: 50,
            fontFamily: "Roboto",
            fontWeight: "bold",
        }
    } 
});