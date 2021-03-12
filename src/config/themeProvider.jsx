import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { create } from 'jss'
import rtl from 'jss-rtl'
import { JssProvider } from 'react-jss'
import { createGenerateClassName, jssPreset } from '@material-ui/styles'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import themeObject from '../theme'

const jss = create({ plugins: [...jssPreset().plugins, rtl()] })
const generateClassName = createGenerateClassName()

/**
 * direction d'interface selon la langue
 *
 * @class ThemeProvider
 * @extends {PureComponent}
 */
class ThemeProvider extends PureComponent {
    /**
     *
     * @type {{children: *, language: *}}
     */
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
            PropTypes.node,
        ]),
        language: PropTypes.object,
    }

    /* render */
    /**
     *
     *
     * @returns
     * @memberof Actions
     */
    render() {
        const { children, language } = this.props
        let isRtl
        if (language === 'fr') {
            document.body.setAttribute('dir', 'ltr')
            isRtl = false
        } else {
            document.body.setAttribute('dir', 'rtl')
            isRtl = true
        }

        const theme = createMuiTheme({
            ...themeObject,
            direction: isRtl ? 'rtl' : 'ltr',
        })

        return (
            <JssProvider jss={jss} generateClassName={generateClassName}>
                <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
            </JssProvider>
        )
    }
}
/**
 *  declaration des props
 */
ThemeProvider.propTypes = {
    language: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
}
// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = state => ({
    language: state.info.language,
})

export default connect(
    mapStateToProps,
    null
)(ThemeProvider)
