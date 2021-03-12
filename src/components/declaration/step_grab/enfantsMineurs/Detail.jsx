import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Grid, Divider, FormGroup } from '@material-ui/core'
import { injectIntl } from 'react-intl'
import ItemTitle from '../../../ui/itemCmp'
import getEnfantMineurActions from '../../../../redux/declaration_grab/enfantsMineurs/getEnfantMineur/index'
import DetailEnfants from './DetailEnfants'
import generateKey from '../../../../shared/utility'
import setListInput from './ListInput'

/**
 *
 *
 * @class Detail
 * @extends {React.Component}
 */
class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            nothingTodDeclare: false,
        }
    }

    /* life cycle */

    /**
     *
     *
     * @memberof
     */
    componentDidMount() {
        const { getEnfantMineurReq, history } = this.props
        const { dataDeclaration } = history.location.state
        getEnfantMineurReq(dataDeclaration.user.id)
    }

    /**
     *
     *
     * @param {*} nextProps
     * @memberof
     */
    componentWillReceiveProps(nextProps) {
        const { getEnfant } = nextProps
        if (getEnfant && getEnfant.data.length !== 0) {
            this.setState({
                data: getEnfant.data,
                nothingTodDeclare: getEnfant.data[0].nothingToDeclare,
            })
        }
    }

    /* functions */

    /* render */
    /* render */
    /**
     *
     *
     * @returns
     * @memberof Actions
     */
    render() {
        const { intl } = this.props
        const { data, nothingTodDeclare } = this.state
        return (
            <div>
                <FormGroup>
                    <div className="centerDiv">
                        <Grid container>
                            {nothingTodDeclare === false && data ? (
                                data.map((child, index) => {
                                    return (
                                        <Grid container key={generateKey()}>
                                            <Grid container>
                                                <ItemTitle
                                                    label={`
                                                        ${intl.formatMessage({
                                                            id: 'enfantNum',
                                                        })} ${index + 1}`}
                                                />
                                            </Grid>
                                            <DetailEnfants
                                                payload={setListInput(intl)}
                                                data={[child]}
                                            />
                                        </Grid>
                                    )
                                })
                            ) : (
                                <Grid container key={generateKey()}>
                                    <Grid container>
                                        <div style={{ padding: 40 }}>
                                            <h2>ليس لدي ما أصرح به</h2>
                                        </div>
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                    </div>
                </FormGroup>
                <Divider />
            </div>
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
    getEnfantMineurReq: id =>
        dispatch(getEnfantMineurActions.getEnfantRequest(id)),
})

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = state => ({
    getEnfant:
        state.declarationGrab.enfantsMineur.getEnfantMineurDeclaration.response,
})
/**
 *  Inialisation
 */
Detail.defaultProps = {
    getEnfant: null,
}
/**
 *  declaration des props
 */
Detail.propTypes = {
    getEnfantMineurReq: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    getEnfant: PropTypes.object,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Detail))
