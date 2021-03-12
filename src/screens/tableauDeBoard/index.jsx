import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Grid, Divider } from '@material-ui/core'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import CardNbrDecPour from './nbrDecPourcentage'
import NbrDecCompteur from './nbrDecCompteur'
import NbrDecTraitees from './nbrDecTraitees'
import NbrDecParTempsTraitement from './nbrDecParTempsTraitement'
// import { makeStyles } from '@material-ui/core/styles'
import PageTitle from '../../components/ui/pageTitle'
import SelectList from '../../components/ui/select'
import nbrDecParStatusTraiteesActions from '../../redux/tableauDeBord/nbrDecParStatusTraitees'
import nbrDecParYearActions from '../../redux/tableauDeBord/nbrDecParYear'
import nbrDecParActionActions from '../../redux/tableauDeBord/nbrDecParAction'
import nbrDecParStatusNonTraiteesActions from '../../redux/tableauDeBord/nbrDecParStatusNonTraitees'
import nbrDecParTempsTraitementActions from '../../redux/tableauDeBord/nbrDecParTempsTraitement'
import nbrInscEnAttenteActions from '../../redux/tableauDeBord/nbrInscEnAttente'

// // style
// const useStyles = makeStyles(() => ({
//     valueCard: {
//         fontSize: '2.5rem',
//         lineHeight: '3.4rem',
//         height: '3.4rem',
//         //   display: '-ms-flexbox',
//         display: 'flex',
//         //   -ms-flex-align: center,
//         alignItems: 'center',
//         fontWeight: 400,
//     },
// }))
const Index = ({
    nbrDecParStatusTraiteesReq,
    nbrDecParStatusTraitees,
    nbrDecParYearReq,
    nbrDecParYear,
    nbrDecParActionReq,
    nbrDecParAction,
    nbrDecParStatusNonTraiteesReq,
    nbrDecParStatusNonTraitees,
    nbrDecParTempsTraitementReq,
    nbrDecParTempsTraitement,
    nbrInscEnAttenteReq,
    nbrInscEnAttente,
    intl,
}) => {
    /* hook memeber */
    // const [pourcentage, setPourcentage] = useState(0)
    // const classes = useStyles()
    const date = new Date()
    const listYear = [
        {
            label: date.getFullYear() - 4,
            value: 0,
        },
        {
            label: date.getFullYear() - 3,
            value: 1,
        },
        {
            label: date.getFullYear() - 2,
            value: 2,
        },
        {
            label: date.getFullYear() - 1,
            value: 3,
        },
        {
            label: date.getFullYear(),
            value: 4,
        },
    ]
    const [year, setYear] = useState(
        listYear.filter(index => index.label === date.getFullYear())[0].value
    )

    /* life cycle */
    useEffect(() => {
        nbrDecParStatusTraiteesReq()
        nbrDecParYearReq({
            year: listYear.filter(index => index.value === year)[0].label,
        })
        nbrDecParActionReq()
        nbrDecParStatusNonTraiteesReq()
        nbrDecParTempsTraitementReq()
        nbrInscEnAttenteReq()
    }, [])

    /* functions */
    const fieldChangedHandler = e => {
        setYear(e.target.value)
        nbrDecParYearReq({
            year: listYear.filter(index => index.value === e.target.value)[0]
                .label,
        })
    }
    return (
        <Fragment className="gridItem">
            <Grid className="gridItem">
                <PageTitle label="لوحة القيادة" />
            </Grid>
            {nbrDecParStatusTraitees && (
                <Fragment>
                    <Grid className="gridItem">
                        <h2 style={{ textAlign: 'center' }}>
                            <b>العدد الجملي للتصريحات حسب حالة التصريح </b>
                        </h2>
                    </Grid>
                    <Grid container className="gridItem">
                        {Object.keys(nbrDecParStatusTraitees).map(index => (
                            <NbrDecCompteur
                                number={nbrDecParStatusTraitees[index]}
                                status={intl.formatMessage({ id: index })}
                            />
                        ))}
                    </Grid>
                </Fragment>
            )}
            <br />
            <Divider />
            <Grid className="gridItem">
                <h2 style={{ textAlign: 'center' }}>
                    <b>
                        العدد الجملي للتصريحات المعالجة حسب حالة التصريح
                        (بالسنة){' '}
                    </b>
                </h2>
            </Grid>
            <Grid container md={2} className="gridItem">
                <SelectList
                    onchange={e => {
                        fieldChangedHandler(e)
                    }}
                    name="السنة"
                    label="السنة"
                    list={listYear}
                    selectedItem={year}
                    selectAll={false}
                    required={false}
                />
            </Grid>
            <br />
            <Grid className="gridItem">
                {nbrDecParYear && (
                    <NbrDecTraitees data={nbrDecParYear} intl={intl} />
                )}
            </Grid>
            <br />
            <Divider />
            <br />
            <Grid className="gridItem">
                <h2 style={{ textAlign: 'center' }}>
                    <b>
                        العدد الجملي للتصريحات الغير المعالجة حسب حالة التصريح
                    </b>
                </h2>
            </Grid>
            <Grid container className="gridItem">
                {nbrDecParStatusNonTraitees &&
                    Object.keys(nbrDecParStatusNonTraitees).map(index => (
                        <NbrDecCompteur
                            number={nbrDecParStatusNonTraitees[index]}
                            status={intl.formatMessage({ id: index })}
                        />
                    ))}
            </Grid>
            <br />
            <Divider />
            <br />
            <Grid className="gridItem">
                <h2 style={{ textAlign: 'center' }}>
                    <b>العدد الجملي للتصريحات حسب وقت المعالجة</b>
                </h2>
            </Grid>
            <Grid className="gridItem">
                {nbrDecParTempsTraitement && (
                    <NbrDecParTempsTraitement
                        data={nbrDecParTempsTraitement}
                        intl={intl}
                    />
                )}
            </Grid>
            <br />
            <Divider />
            <Grid className="gridItem">
                <h2 style={{ textAlign: 'center' }}>
                    <b>
                        العدد الجملي و النسبة المئوية للتصريحات حسب حالة التصريح{' '}
                    </b>
                </h2>
            </Grid>
            <Grid container className="gridItem">
                {nbrDecParAction &&
                    Object.keys(nbrDecParAction).map(index => (
                        <CardNbrDecPour
                            pourcentageDec={nbrDecParAction[index].pourcentage}
                            number={nbrDecParAction[index].count}
                            status={intl.formatMessage({ id: index })}
                        />
                    ))}
            </Grid>
            <br />
            <Divider />
            <br />
            <Grid className="gridItem">
                <h2 style={{ textAlign: 'center' }}>
                    <b>عدد التسجيلات فانتظار المصادقة</b>
                </h2>
            </Grid>
            <Grid container className="gridItem">
                {nbrInscEnAttente &&
                    Object.keys(nbrInscEnAttente).map(index => (
                        <NbrDecCompteur
                            number={nbrInscEnAttente[index]}
                            status={intl.formatMessage({ id: index })}
                            inscription
                        />
                    ))}
            </Grid>
            <br />
        </Fragment>
    )
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    nbrDecParStatusTraiteesReq: payload =>
        dispatch(
            nbrDecParStatusTraiteesActions.nbrDecParStatusTraiteesRequest(
                payload
            )
        ),
    nbrDecParYearReq: payload =>
        dispatch(nbrDecParYearActions.nbrDecParYearRequest(payload)),
    nbrDecParActionReq: payload =>
        dispatch(nbrDecParActionActions.nbrDecParActionRequest(payload)),
    nbrDecParStatusNonTraiteesReq: payload =>
        dispatch(
            nbrDecParStatusNonTraiteesActions.nbrDecParStatusNonTraiteesRequest(
                payload
            )
        ),
    nbrDecParTempsTraitementReq: payload =>
        dispatch(
            nbrDecParTempsTraitementActions.nbrDecParTempsTraitementRequest(
                payload
            )
        ),
    nbrInscEnAttenteReq: payload =>
        dispatch(nbrInscEnAttenteActions.nbrInscEnAttenteRequest(payload)),
})

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = state => ({
    nbrDecParStatusTraitees: state.nbrDecParStatusTraitees.response,
    nbrDecParYear: state.nbrDecParYear.response,
    nbrDecParAction: state.nbrDecParAction.response,
    nbrDecParStatusNonTraitees: state.nbrDecParStatusNonTraitees.response,
    nbrDecParTempsTraitement: state.nbrDecParTempsTraitement.response,
    nbrInscEnAttente: state.nbrInscEnAttente.response,
})
/**
 *  declaration des props
 */
Index.propTypes = {
    nbrDecParStatusTraiteesReq: PropTypes.func.isRequired,
    nbrDecParStatusTraitees: PropTypes.object.isRequired,
    nbrDecParYearReq: PropTypes.func.isRequired,
    nbrDecParYear: PropTypes.object.isRequired,
    nbrDecParActionReq: PropTypes.func.isRequired,
    nbrDecParAction: PropTypes.object.isRequired,
    nbrDecParStatusNonTraiteesReq: PropTypes.func.isRequired,
    nbrDecParStatusNonTraitees: PropTypes.object.isRequired,
    nbrDecParTempsTraitementReq: PropTypes.func.isRequired,
    nbrDecParTempsTraitement: PropTypes.object.isRequired,
    nbrInscEnAttenteReq: PropTypes.func.isRequired,
    nbrInscEnAttente: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
