import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Grid, Divider, FormGroup } from '@material-ui/core'
import { injectIntl } from 'react-intl'
import ItemTitle from '../../../../ui/itemCmp'
import getActionsActions from '../../../../../redux/declaration_grab/bien/actions/getActions/index'
import DetailBien from '../../../../ui/DetailDeclaration/DetailBienIntr'
import generateKey from '../../../../../shared/utility'
import setListInput from './ListInputs'

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
     * @memberof Detail
     */
    /* life cycle */

    /**
     *
     *
     * @memberof
     */
    componentDidMount() {
        const { getActionsReq, history } = this.props
        const { dataDeclaration } = history.location.state
        getActionsReq(dataDeclaration.id)
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
        const { getActions } = nextProps
        if (getActions && getActions.data.length !== 0) {
            this.setState({
                data: getActions.data,
                nothingTodDeclare: getActions.data[0].nothingToDeclare,
            })
        }
    }

    /* functions */
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
     * @memberof Detail
     */
    render() {
        const { intl } = this.props
        const { data, nothingTodDeclare } = this.state
        console.log(data)

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
                                                            id: 'action',
                                                        })} ${index + 1}`}
                                                />
                                            </Grid>
                                            <DetailBien
                                                data={[child]}
                                                payload={setListInput(intl)}
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
    getActionsReq: id => dispatch(getActionsActions.getActionsRequest(id)),
})

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = state => ({
    getActions: state.declarationGrab.decBien.actions.getActions.response,
})
/**
 *  Inialisation
 */
Detail.defaultProps = {
    getActions: null,
}
/**
 *  declaration des props
 */
Detail.propTypes = {
    getActionsReq: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    getActions: PropTypes.object,
    history: PropTypes.object.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Detail))
