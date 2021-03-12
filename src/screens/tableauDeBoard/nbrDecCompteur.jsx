import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
// import { makeStyles } from '@material-ui/core/styles'

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
const NbrDecCompteur = ({ status, number, inscription }) => {
    /* hook memeber */
    const [numbrDec, setNumberDec] = useState(0)

    // const classes = useStyles()
    /* life cycle */
    useEffect(() => {
        let start = 0
        // first three numbers from props
        // eslint-disable-next-line radix
        const end = parseInt(number)
        // if zero, return
        if (start === end) return
        // find duration per increment
        // eslint-disable-next-line radix
        const totalMilSecDur = 1
        const incrementTime = totalMilSecDur / end
        // timer increments start counter
        // then updates count
        // ends if start reaches end
        const timer = setInterval(() => {
            start += 1
            setNumberDec(String(start))
            if (start === end) clearInterval(timer)
        }, incrementTime)
        // dependency array
    }, [status, number])

    /* functions */

    return (
        <Grid lg={3} style={{ padding: '10px' }}>
            <Card>
                <CardContent>
                    <div className="card-value float-left"></div>
                    <h5>
                        <b>
                            {status} {inscription && 'ساعة'}
                        </b>
                    </h5>
                    <h2 className="text-success">{numbrDec}</h2>
                </CardContent>
            </Card>
        </Grid>
    )
}

// const mapDispatchToProps = dispatch => ({
// })

// const mapStateToProps = state => ({
// })
/**
 *  Inialisation
 */
NbrDecCompteur.defaultProps = {
    number: 0,
    status: '',
    inscription: false,
}
/**
 *  declaration des props
 */
NbrDecCompteur.propTypes = {
    number: PropTypes.number,
    status: PropTypes.string,
    inscription: PropTypes.bool,
}

export default connect()(NbrDecCompteur)
// mapStateToProps,
// mapDispatchToProps
