/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable object-shorthand */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unused-state */

import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { Divider, FormGroup, Grid, Card, CardContent } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import ButtonComponent from '../../components/ui/button'
// import Button from '../../components/ui/buttonDanger'
import PageTitle from '../../components/ui/pageTitle'
import editCommandeActions from '../../redux/commande/editCommande'
import alertActions from '../../redux/alert'
import baseUrl from '../../serveur/baseUrl'

class editCommande extends React.Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
        response: PropTypes.object,
        editCommandeRequest: PropTypes.func.isRequired,
        alertShow: PropTypes.func.isRequired,
    }

    static defaultProps = {
        response: null,
    }

    constructor(props) {
        super(props)
        this.state = {
            newState: {},
            id: 0,
            postCMD: [],
        }
        this.payload = {}
        this.newCmd = []
    }

    componentDidMount() {
        const { history } = this.props
        this.setState({
            newState: history.location.state.index.data.produits,
            id: history.location.state.index.id,
        })
        this.payload = this.state
    }

    handleChange(event, code) {
        this.newCmd[code] = event.target.value
        this.setState({
            postCMD: this.newCmd,
        })
        console.log('x', this.newCmd)
    }

    safeRequire = (url, path, ext = null) => {
        try {
            return `${baseUrl}${path}${url}${ext}`
        } catch {
            return 'unknown'
        }
    }

    editCommande = () => {
        const { postCMD, id } = this.state
        console.log('paylo', postCMD, id)
        const { editCommandeRequest } = this.props
        editCommandeRequest({ ...postCMD, id: id })
    }

    cancelCommande = () => {
        const { history } = this.props
        history.goBack()
    }

    render() {
        const s = this.state
        const { newState } = this.state
        const tab = Array(newState.length)
        const tabb = Array(newState.length)
        for (let pas = 0; pas < newState.length; pas += 1) {
            tab[newState[pas].Code_article] = newState[pas].QTY
            // tab.length = tab.length + 1
        }
        for (let pas = 0; pas < newState.length; pas += 1) {
            tabb[pas] = newState[pas].Code_article
            // tab.length = tab.length + 1
        }

        return (
            <div className="column col-md-12 text-center">
                <Grid className="gridItem">
                    <PageTitle label="Modifier la commande" />
                </Grid>
                <Divider />
                <Card>
                    <CardContent>
                        <div>
                            <FormGroup>
                                <div className="centerDiv">
                                    {tabb.map(q => {
                                        if (tab[q] !== undefined) {
                                            return (
                                                <div>
                                                    <div className="d-flex col-12">
                                                        <div className="col-4 mt-3">
                                                            <img
                                                                src={this.safeRequire(
                                                                    q,
                                                                    '../produits/',
                                                                    '.png'
                                                                )}
                                                                style={{
                                                                    width: 80,
                                                                    borderRadius:
                                                                        '2%',
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="col-4 mt-3">
                                                            <TextField
                                                                disabled
                                                                id="outlined-disabled"
                                                                variant="outlined"
                                                                value={q}
                                                                label="code"
                                                            />
                                                        </div>
                                                        <div className="col-4 mt-3">
                                                            <TextField
                                                                id={q}
                                                                variant="outlined"
                                                                defaultValue={
                                                                    tab[q]
                                                                }
                                                                label="quantite"
                                                                onChange={e =>
                                                                    this.handleChange(
                                                                        e,
                                                                        q
                                                                    )
                                                                }
                                                                type="number"
                                                            />
                                                        </div>
                                                    </div>
                                                    <Divider />
                                                </div>
                                            )
                                        }
                                        return null
                                    })}
                                </div>
                            </FormGroup>
                        </div>
                    </CardContent>
                </Card>
                <div style={{ textAlign: 'center', padding: 20 }}>
                    <div>
                        <ButtonComponent
                            color="secondary"
                            type="contained"
                            size="medium"
                            label="Confirmer"
                            clicked={this.editCommande}
                        />
                        <ButtonComponent
                            color="secondary"
                            type="contained"
                            label="Annuler"
                            size="medium"
                            clicked={this.cancelCommande}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        response: state.commande.editCommande.response,
        lng: state.info.language,
    }
}

const mapDispatchToProps = dispatch => ({
    editCommandeRequest: payload =>
        dispatch(editCommandeActions.editCommandeRequest(payload)),
    alertShow: (show, info) =>
        dispatch(
            alertActions.alertShow(show, {
                onConfirm: info.onConfirm,
                warning: info.warning,
                info: info.info,
                error: info.error,
                success: info.success,
                message: info.message,
                title: info.title,
            })
        ),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(editCommande))
