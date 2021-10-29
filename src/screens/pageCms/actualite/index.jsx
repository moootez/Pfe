import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
} from '@material-ui/core'
// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import getActualiteActions from '../../../redux/pageCms/actualite/getActualite'
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
        height: '300px',
        backgroundSize:'contain'
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
    filtredTable,
    getActualite,
}) => {
    const classes = useStyles()
    /* hooks member */
    const [rows, setRows] = useState([])
    /* set table */
    const setTable = arrayFiltred => {
        let rowsTmp = []
        if (arrayFiltred && arrayFiltred.length > 0) {
                rowsTmp = arrayFiltred.map((item, index) => ({
                    id: item.id,
                    index,
                    titre: item.titre,
                    theme: item.texte,
                    sujet: item.priorite,
                    image: item.image,
                    createdAt: item.createdAt && item.createdAt.substr(0, 11),
                }))
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
                                        {el.titre}
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
        filtredTable: state.pageCms.Actualite.response,
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
})
Index.defaultProps = {
    filtredTable: [],
}
Index.propTypes = {
    getActualite: PropTypes.func.isRequired,
    filtredTable: PropTypes.array,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Index))
