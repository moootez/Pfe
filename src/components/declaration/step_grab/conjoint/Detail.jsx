import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Grid, FormGroup, Divider } from '@material-ui/core'
import { injectIntl } from 'react-intl'
import DetailConjoint from './DetailConjoint'
import getConjointActions from '../../../../redux/declaration_grab/conjoint/getConjoint/index'
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
            data: {},
            // nothingTodDeclare: false,
        }
    }

    /* life cycle */
    /**
     *
     *
     * @memberof Detail
     */
    /* life cycle */

    /**
     *
     *
     * @memberof
     */
    componentDidMount() {
        const { getConjointReq, history } = this.props
        const { dataDeclaration } = history.location.state
        getConjointReq(dataDeclaration.user.id)
    }

    /**
     *
     *
     * @param {*} nextProps
     * @memberof Detail
     */
    /**
     *
     *
     * @param {*} nextProps
     * @memberof
     */
    componentWillReceiveProps(nextProps) {
        const { getConjoint } = nextProps
        if (getConjoint && getConjoint.data.length !== 0) {
            const objConjoint = _.omit(getConjoint.data[0], ['id', 'qrCode'])
            this.setState({
                data: objConjoint,
                // nothingTodDeclare: objConjoint.nothingToDeclare,
            })
        }
    }

    /* render */
    /**
     *
     *
     * @returns
     * @memberof Detail
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
        const isTunisian = data.numCin !== null
        return (
            <div style={{ paddingTop: '1em' }}>
                <FormGroup>
                    <div className="centerDiv">
                        <Grid container>
                            {/* {nothingTodDeclare === false && data ? ( */}
                            <DetailConjoint
                                payload={setListInput(intl, isTunisian)}
                                data={[data]}
                            />
                            {/* ) : (
                                <Grid container>
                                    <div style={{ padding: 40 }}>
                                        <h2>ليس لدي ما أصرح به</h2>
                                    </div>
                                </Grid>
                            )} */}
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
    getConjointReq: id => dispatch(getConjointActions.getConjointRequest(id)),
})

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = state => ({
    getConjoint: state.declarationGrab.conjoint.getConjointDeclaration.response,
})
/**
 *  initialisation
 */
Detail.defaultProps = {
    getConjoint: null,
}
/**
 *  declaration des props
 */
Detail.propTypes = {
    getConjoint: PropTypes.object,
    history: PropTypes.object.isRequired,
    getConjointReq: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Detail))
