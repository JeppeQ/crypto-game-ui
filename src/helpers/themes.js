import { createTheme } from '@mui/material/styles';

export const mainTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#058665',
      contrastText: '#fff'
    },
    secondary: {
      main: '#c50606',
      contrastText: '#fff'
    }
  },
  typography: {
    fontSize: 15,
    body1: {
      fontSize: '15px',
    },
    h3: {
      letterSpacing: '1px',
      fontFamily: 'astrospace',
      fontSize: 33
    },
    h4: {
      fontSize: 35,
    },
    h6: {
      fontSize: 15,
      color: 'rgba(255, 255, 255, 0.7)',
      fontFamily: 'astrospace',
      letterSpacing: '1px'
    },
    subtitle1: {
      fontSize: 14,
      color: 'rgba(255, 255, 255, 1)',
      fontFamily: 'astrospace',
    },
    subtitle2: {
      fontStyle: 'italic'
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E2530',
          backgroundImage: 'none'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'system-ui',
          color: 'white'
        }
      }
    },
    MuiSlider: {
      styleOverrides: {
        valueLabel: {
          fontSize: '11px'
        }
      }
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderRadius: '0',
          border: ''
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          margin: '10px',
          backgroundImage: 'none'
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          paddingTop: '12px',
          paddingBottom: '12px'
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#464545'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            '-webkit-box-shadow': '0 0 0 100px #1E2530 inset',
            '-webkit-text-fill-color': '#fff'
          }
        }
      }
    }
  },
})
