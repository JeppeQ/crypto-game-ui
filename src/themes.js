import { createMuiTheme } from '@material-ui/core/styles'

export const mainTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#058665',
    },
    secondary: {
      main: '#c50606',
    }
  },
  typography: {
    fontSize: 15,
    h3: {
      letterSpacing: '1px',
      fontFamily: 'astrospace',
      fontSize: 33
    },
    h4: {
      fontSize: 35,
    },
    h6: {
      fontSize: 14,
      color: 'rgba(255, 255, 255, 0.7)',
      fontFamily: 'astrospace',
      letterSpacing: '1px'
    },
    subtitle2: {
      fontStyle: 'italic'
    }
  },
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: '#1E2530'
      }
    },
    MuiButton: {
      label: {
        fontFamily: 'system-ui',
        color: 'white'
      }
    },
    MuiSlider: {
      valueLabel: {
        fontSize: '11px'
      }
    },
    MuiDataGrid: {
      root: {
        borderRadius: '0',
        border: ''
      }
    }
  },
})
