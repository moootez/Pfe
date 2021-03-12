import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl'

/**
 *
 *
 * @param {*} { language, messages, children }
 * @returns
 */
function LanguageProvider({ language, messages, children }) {
    return (
        <IntlProvider
            locale={language}
            key={language}
            messages={messages[language]}
        >
            {React.Children.only(children)}
        </IntlProvider>
    )
}
/**
 *  declaration des props
 */
LanguageProvider.propTypes = {
    language: PropTypes.string.isRequired,
    messages: PropTypes.shape({
        ar: PropTypes.object,
        fr: PropTypes.object,
    }).isRequired,
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
)(LanguageProvider)
