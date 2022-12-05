import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { Card, CardMedia } from '@material-ui/core'
// import Swiper core and required modules
import SwiperCore, { Pagination, EffectCoverflow } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import getActualiteActions from '../../../redux/pageCms/actualite/getActualite'
// Import Swiper styles
import 'swiper/swiper.scss'
import 'swiper/swiper.min.css'
import 'swiper/modules/effect-coverflow/effect-coverflow.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import './styleActuSlider.css'
// install Swiper modules
SwiperCore.use([Pagination, EffectCoverflow])

const page = window.location.pathname
const useStyles = makeStyles(theme => ({
    // root: {
    //     maxWidth: 345,
    // },
    media: {
        height: '300px',
        // width: '500px',
        backgroundSize: 'contain',
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
const Index = ({ filtredTable, getActualite }) => {
    const history = useHistory()
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

    const goToActualite = () => {
        history.push({
            pathname: 'actualite',
        })
    }
    return (
        <div style={{ padding: '1%', backgroundColor: '#eeeeee' }}>
            {/* <Grid className="gridItem">
                    <PageTitle />
                </Grid> */}
            {(page === '/actualite' || page === '/commande' || page === '/create_commande') && (
                <Swiper
                    // install Swiper modules
                    effect="coverflow"
                    grabCursor
                    // centeredSlides
                    slidesPerView={3}
                    // slidesPerView={4}
                    // spaceBetween={30}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        // depth: 100,
                        // modifier: 1,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    centerInsufficientSlides="true"
                    autoplay={{
                        delay: 1000,
                    }}
                    modules={[EffectCoverflow, Pagination]}
                >
                    {rows.map(el => (
                        <SwiperSlide>
                            <Card
                                style={{ borderRadius: '0px' }}
                                onClick={goToActualite}
                            >
                                <CardMedia
                                    className={classes.media}
                                    image={el.image}
                                    title={el.image}
                                />
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
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
