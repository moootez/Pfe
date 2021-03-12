import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Grid, Divider, FormGroup } from '@material-ui/core'
import { injectIntl } from 'react-intl'
import ItemTitle from '../../../../ui/itemCmp'
import getMontantsActions from '../../../../../redux/declaration_grab/bien/montants/getMontants/index'
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

    /* life cycle */

    /**
     *
     *
     * @memberof
     */
    componentDidMount() {
        const { getMontantsReq, history } = this.props
        const { dataDeclaration } = history.location.state
        getMontantsReq(dataDeclaration.id)
    }

    /**
     *
     *
     * @param {*} nextProps
     * @memberof
     */
    componentWillReceiveProps(nextProps) {
        const { getMontants } = nextProps
        if (getMontants && getMontants.data.length !== 0) {
            this.setState({
                data: getMontants.data,
                nothingTodDeclare: getMontants.data[0].nothingToDeclare,
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
                                                            id: 'montantNum',
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
    getMontantsReq: id => dispatch(getMontantsActions.getMontantsRequest(id)),
})

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = state => ({
    getMontants: state.declarationGrab.decBien.montants.getMontants.response,
})
/**
 *  Inialisation
 */
Detail.defaultProps = {
    getMontants: null,
}
/**
 *  declaration des props
 */
Detail.propTypes = {
    getMontantsReq: PropTypes.func.isRequired,
    getMontants: PropTypes.object,
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Detail))
