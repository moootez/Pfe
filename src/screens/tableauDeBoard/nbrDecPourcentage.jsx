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
const NbrDecPourcentage = ({ pourcentageDec, status, number }) => {
    /* hook memeber */
    const [pourcentage, setPourcentage] = useState(pourcentageDec)
    // const classes = useStyles()
    /* life cycle */
    useEffect(() => {
        let start = -1
        // first three numbers from props
        // eslint-disable-next-line radix
        const end = parseInt(pourcentage)
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
            setPourcentage(String(start))
            if (start === end) clearInterval(timer)
        }, incrementTime)
        // dependency array
    }, [])

    /* functions */

    return (
        <Grid lg={3} style={{ padding: '10px' }}>
            <Card>
                <CardContent>
                    <div id="pourcentage" className="card-value float-left">
                        {pourcentageDec}%
                    </div>
                    <h3 id={`number${number}${status}`}>{number}</h3>
                    <h3 style={{ color: 'rgb(153 154 156)' }}>{status}</h3>
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
NbrDecPourcentage.defaultProps = {
    pourcentageDec: 0,
    number: 0,
    status: '',
}
/**
 *  declaration des props
 */
NbrDecPourcentage.propTypes = {
    pourcentageDec: PropTypes.number,
    number: PropTypes.number,
    status: PropTypes.string,
}

export default connect()(NbrDecPourcentage)
// mapStateToProps,
// mapDispatchToProps
