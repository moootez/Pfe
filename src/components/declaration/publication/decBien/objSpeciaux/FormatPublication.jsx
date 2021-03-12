import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { injectIntl } from 'react-intl'
import setListInput from '../../../step_grab/decBien/objSpeciaux/ListInputs'
import DetailPublication from '../../../../ui/detailPublication'
import updateFormatPublication from '../../../../../redux/publication/formatPublication/updateFormatPublication'
import { capitalize } from '../../../../../shared/utility'

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
        const { allFormatsData } = this.props
        if (
            nextProps.allFormatsData !== allFormatsData &&
            nextProps.allFormatsData.data.length !== 0
        ) {
            const objObjSpeciaux = _.omit(
                nextProps.allFormatsData.data.publications[
                    'Inlucc\\PublicationBundle\\Entity\\RefObjectPrecieux'
                ][0],
                ['id']
            )

            Object.assign(this.payload, objObjSpeciaux)

            this.setState({
                data: objObjSpeciaux,
            })
        }
    }

    /* selectCheck */
    /**
     *
     *
     * @memberof FormatPublication
     */
    /**
     * check radio bouton
     *
     * @memberof
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

    /* UpdateFormat */
    /**
     *
     *
     * @memberof FormatPublication
     */
    updateObjSpeciaux = () => {
        const { updateFormatReq } = this.props
        updateFormatReq({ categorie: 'RefObjectPrecieux', obj: this.payload })
    }

    /* cancelFormat */
    /**
     *
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
    /**
     *
     *
     * @returns
     * @memberof FormatPublication
     */
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
        const checkBoxList = setListInput(intl).map(attribute => {
            const formattedAtt = { label: attribute.label, name: '' }
            formattedAtt.name = `publier${capitalize(attribute.name)}`
            return formattedAtt
        })
        return (
            <DetailPublication
                intl={intl}
                data={data}
                listCheck={checkBoxList}
                setCheck={this.setCheck}
                addAction={this.updateObjSpeciaux}
                cancelAction={this.cancelForm}
            />
        )
    }
}
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

/**
 *
 *
 */
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
