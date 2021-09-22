import { createTheme  } from '@material-ui/core/styles'

/**
 * Initialisation des code couleur
 */
const theme = createTheme ({
    palette: {
        primary: {
            light: '#000000',
            main: '#081939',
            dark: '#0e1c39',
            contrastText: '#fff',
        },
        secondary: {
            light: '#cdcdcd',
            main: '#000000',
            dark: '#1b769e',
            contrastText: '#fff',
        },
    },
    typography: {
        fontFamily: '"calibri", regular',
    },
    overrides: {
        MuiButton: {
            sizeLarge: {
                height: 40,
                padding: '0 120px',
            },
            root: {
                '&:hover:not($disabled):not($focused):not($error)': {
                    color: '#000000',
                    backgroundColor: 'white',
                    borderColor: '#000000',
                    // borderWidth: 1,
                    // borderStyle: 'solid',
                },
            },
            disabled: {},
            error: {},
            focused: {},
        },
        MuiOutlinedInput: {
            root: {
                '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
                    borderColor: '#000000',
                },
                '&$focused $notchedOutline': {
                    borderColor: '#000000',
                },
                $notchedOutline: {
                    borderColor: 'red',
                },
            },
        },
        MuiFormHelperText: {
            root: {
                textAlign: 'inherit',
            },
        },
        MuiTableCell: {
            root: {
                textAlign: 'inherit',
            },
        },
    },
})
export default theme
