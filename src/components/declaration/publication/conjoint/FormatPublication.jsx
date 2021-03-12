import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { injectIntl } from 'react-intl'
import setListCheckBox from './ListCheckBox'
import DetailPublication from '../../../ui/detailPublication'
import updateFormatPublication from '../../../../redux/publication/formatPublication/updateFormatPublication'

/**
 *
 *
 * @class FormatPublication
 * @extends {React.Component}
 */
class FormatPublication extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
        }
        this.payload = {}
    }

    /* life cycle */

    /**
     *
     *
     * @param {*} nextProps
     * @memberof FormatPublication
     */
    /**
     *
     *
     * @param {*} nextProps
     * @memberof
     */
    componentWillReceiveProps(nextProps) {
        const { allFormatsData } = nextProps
        if (allFormatsData && allFormatsData.data.length !== 0) {
            const objConjoint = _.omit(
                allFormatsData.data.publications[
                    'Inlucc\\PublicationBundle\\Entity\\RefConjoint'
                ][0],
                ['id']
            )
            Object.assign(this.payload, objConjoint)
            this.setState({
                data: objConjoint,
            })
        }
    }

    /**
     * set payload radio bouton
     *
     * @memberof FormatPublication
     */
    setCheck = (name, checked) => {
        if (name === 'publishedAll') {
            for (const check of Object.keys(this.payload)) {
                if (check !== 'publierNomRubrique')
                    this.payload[check] = checked
            }
            this.payload.publierNomRubrique = !checked
        } else {
            this.payload.publishedAll = false
        }
        if (name === 'publierNomRubrique') {
            for (const check of Object.keys(this.payload)) {
                if (check !== 'publierNomRubrique')
                    this.payload[check] = !checked
            }
        }
        if (name !== 'publierNomRubrique' && name !== 'publishedAll') {
            this.payload.publishedAll = false
            this.payload.publierNomRubrique = false
        }
        this.payload[name] = checked
        this.setState({ data: this.payload })
    }

    /**
     * add conjoint
     *
     * @memberof FormatPublication
     */
    addConjoint = () => {
        const { updateFormatReq } = this.props
        updateFormatReq({ categorie: 'RefConjoint', obj: this.payload })
    }

    /**
     * redection en arrière
     *
     * @memberof FormatPublication
     */
    /**
     * retourner pour la dernière page
     *
     * @memberof
     */
    cancelForm = () => {
        const { history } = this.props
        history.goBack()
    }

    /* render */
    /* render */
    /**
     *
     *
     * @returns
     * @memberof Actions
     */
    render() {
        const { data } = this.state
        const { intl } = this.props
        return (
            <DetailPublication
                intl={intl}
                data={data}
                listCheck={setListCheckBox(intl)}
                setCheck={this.setCheck}
                addAction={this.addConjoint}
                cancelAction={this.cancelForm}
            />
        )
    }
}
// dispatch action
// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    updateFormatReq: categ =>
        dispatch(updateFormatPublication.updateFormatPublicationRequest(categ)),
})

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = () => ({})
/**
 *  declaration des props
 */
FormatPublication.propTypes = {
    history: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    allFormatsData: PropTypes.object.isRequired,
    updateFormatReq: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(FormatPublication))
