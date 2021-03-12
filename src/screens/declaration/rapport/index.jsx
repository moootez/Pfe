import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SaisieRapport from '../../../components/declaration/rapport/saisie/index'
import PageTitle from '../../../components/ui/pageTitle'

/**
 *
 *
 * @param {*} props
 * @returns
 */
const Index = props => {
    const { history } = props
    return (
        <div style={{ background: 'white', paddingTop: '1em' }}>
            <div>
                <PageTitle label="إضافة تعليق" />
            </div>
            <SaisieRapport history={history} />
        </div>
    )
}

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
function mapStateToProps() {
    return {}
}
/**
 *  declaration des props
 */
Index.propTypes = {
    history: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(Index)
