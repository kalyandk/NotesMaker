import './App.css';
import { createMuiTheme, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core'
import Header from '../components/Header';
import Notes from '../pages/Notes/Notes';

// Overriding the material-ui's theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#333996',
      light: '#3c44b126'
    },
    secondary: {
      main: '#f83245',
      light: '#f8324526'
    },
    background: {
      default: '#f4f5fd'
    }
  },
  // using overrides it is possible to change any material-ui component's rules
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)'
      }
    }
  },
})

const useStyles = makeStyles({
  appMain: {
    width: '100%',
  }
})

function App() {
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.appMain}>
          <Header />        
          <Notes /> 
      </div>
      <CssBaseline /> {/* includes some  common css rules that set a common ground for development that helps build good design */}
    </ThemeProvider>
  );
}

export default App;
