import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
} from '@material-ui/core'
// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ButtonComponent from '../../../components/ui/button'
import getActualiteActions from '../../../redux/pageCms/actualite/getActualite'
import deleteActualiteActions from '../../../redux/pageCms/actualite/deleteActualite'
import Table from '../../../components/ui/table/index'
import PageTitle from '../../../components/ui/pageTitle'
import alertActions from '../../../redux/alert'

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import './styleActuSlider.css'
// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);



const page = window.location.pathname
const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: '130px',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}))

/**
 *
 *
 * @param {*} { lng, intl, history, filtredTable, getActualite, alertHide, alertShow }
 * @returns
 */
const Index = ({
    lng,
    intl,
    history,
    filtredTable,
    getActualite,
    deleteActualite,
    alertHide,
    alertShow,
    role,
}) => {
    const classes = useStyles()
    const type = 'listActualite'
    /* hooks member */
    const [rows, setRows] = useState([])

    const headers = [
        'Titre',
        'Texte',
        'Priorite',
        intl.formatMessage({ id: 'dateCreaction' }),
        'Actions',
    ]
    /* set table */
    const setTable = arrayFiltred => {
        let rowsTmp = []
        if (arrayFiltred && arrayFiltred.length > 0) {
            if (role === 'ROLE_CLIENT') {
                rowsTmp = arrayFiltred.map((item, index) => ({
                    id: item.id,
                    index,
                    titre: item.titre,
                    theme: item.texte,
                    sujet: item.priorite,
                    image: item.image,
                    createdAt: item.createdAt && item.createdAt.substr(0, 11),
                }))
            } else {
                rowsTmp = arrayFiltred.map((item, index) => ({
                    id: item.id,
                    index,
                    theme: item.texte,
                    sujet: item.priorite,
                    createdAt: item.createdAt && item.createdAt.substr(0, 11),
                }))
            }
        }
        setRows(rowsTmp)
    }

    /* life cycle */
    useEffect(() => {
        getActualite()
    }, [])

    /* life cycle */
    useEffect(() => {
        if (filtredTable) {
            setTable(filtredTable)
        }
    }, [filtredTable])
    /* functions */
    /**
     * screen d'edit
     *
     * @param {*} row
     */
    const editAction = row => {
        history.push({
            pathname: `/actualite/edit`,
            state: {
                index: filtredTable[row.index],
            },
        })
    }

    /**
     * delete
     *
     * @param {*} row
     */
    const deleteRef = item => {
        console.log(item)
        alertShow(true, {
            warning: true,
            info: false,
            error: false,
            success: false,
            title: `Voulez-vous vraiment supprimer ${item.texte}`,
            onConfirm: () => {
                deleteActualite(item.id)
                setTimeout(() => {
                    alertHide()
                    getActualite()
                }, 2000)
            },
        })
    }

    /**
     * add
     *
     * @param {*} row
     */
    const addActualite = () => {
        history.push({
            pathname: `/actualite/new`,
        })
    }

    if (role === 'ROLE_CLIENT') {
        return (
            <div style={{ padding: '1%' }} className="container-fluid">
                {/* <Grid className="gridItem">
                    <PageTitle />
                </Grid> */}

                {page === "/actualite" &&
                <Swiper
                    // install Swiper modules
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={20}
                    slidesPerView={4}
                    navigation
                    breakpoints={{
                        "0": {
                            "slidesPerView": 1,
                          },
                        "480": {
                          "slidesPerView": 2,
                        },
                        "1024": {
                          "slidesPerView": 3,
                        },
                        "1200": {
                          "slidesPerView": 4,
                        }
                      }}
                >
                
                    {rows.map(el => (
                        <SwiperSlide>
                            <Card style={{ borderRadius: '0px' }}>
                                <CardMedia
                                    className={classes.media}
                                    image={el.image}
                                    title="New"
                                />
                                <CardContent>
                                    <Typography
                                        className="title-act"
                                        variant="body2"
                                        style={{
                                            color: 'red',
                                            fontSize: '1.1rem',
                                        }}
                                        component="h3"
                                    >
                                        {el.title}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                    >
                                        {el.theme}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                    ))}
            </Swiper>
            }

                {/* <div className="row">
                    {rows.map(el => (
                        <div className="col-4 p-3">
                            <Card style={{ borderRadius: '0px' }}>
                                <CardMedia
                                    className={classes.media}
                                    image={el.image}
                                    title="New"
                                />
                                <CardContent>
                                    <Typography
                                        variant="body2"
                                        style={{
                                            color: 'red',
                                            fontSize: '1.1rem',
                                        }}
                                        component="h3"
                                    >
                                        {el.title}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                    >
                                        {el.titre}
                                        {el.theme}
                                    </Typography>
                                    <p
                                        style={{
                                            fontSize: 10,
                                            color: 'black',
                                            float: 'right',
                                        }}
                                    >
                                        {el.createdAt}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div> */}
            </div>
        )
    }

    return (
        <div style={{ padding: '1%' }}>
            <Grid className="gridItem">
                <PageTitle label="Actualités" />
            </Grid>
            <div style={{ marginTop: '3%' }} />
            <div style={{ marginTop: '42px' }}>
                <ButtonComponent
                    color="white"
                    type="contained"
                    size="medium"
                    label="Ajouter"
                    clicked={() => addActualite()}
                />
            </div>
            <Table
                lng={lng}
                headers={headers}
                rows={rows}
                history={history}
                intl={intl}
                type={type}
                editAction={editAction}
                deleteRef={deleteRef}
                pagination={false}
            />
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
const mapStateToProps = state => {
    return {
        allReferenciels: state.referencial.allReferencials.response,
        lng: state.info.language,
        filtredTable: state.pageCms.Actualite.response,
        role: state.login.response.User.details.userRoles[0].role,
    }
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getActualite: payload =>
        dispatch(getActualiteActions.getActualiteRequest(payload)),
    deleteActualite: payload =>
        dispatch(deleteActualiteActions.deleteActualiteRequest(payload)),
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
    alertHide: () => dispatch(alertActions.alertHide()),
})
/**
 *  Inialisation
 */
Index.defaultProps = {
    filtredTable: [],
}
/**
 *  declaration des props
 */
Index.propTypes = {
    role: PropTypes.string.isRequired,
    intl: PropTypes.object.isRequired,
    filtredTable: PropTypes.array,
    history: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
    getActualite: PropTypes.func.isRequired,
    deleteActualite: PropTypes.func.isRequired,
    alertShow: PropTypes.func.isRequired,
    alertHide: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Index))
