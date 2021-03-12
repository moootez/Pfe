import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { injectIntl } from 'react-intl'
import { Checkbox } from '@material-ui/core'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import HighchartsComponent from './highchartsComponent'

/* style */
const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'auto',
        direction: 'ltr',
    },
    gridList: {
        width: '91%',
        height: 588,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}))

/**
 *
 *
 * @param {*} { data, onchange, handelCheck, type }
 * @returns
 */
function FormatStat({ data, onchange, handelCheck, type }) {
    const classes = useStyles()
    /* functions */

    /**
     * set payload
     *
     * @param {*} event
     */
    const handleChange = event => {
        onchange(event.target.name, event.target.checked, event.target.id)
        handelCheck(event.target.name, event.target.checked, event.target.id)
    }

    return (
        <div className={classes.root}>
            <GridList cellHeight={472} className={classes.gridList}>
                {(data || []).map((index, key) => (
                    <GridListTile
                        style={{ textAlign: 'center' }}
                        key={index.id}
                    >
                        {type !== 'consultation' && (
                            <Fragment>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={index.publiableExterne}
                                            name="publiableExterne"
                                            onChange={handleChange}
                                            value={index.publiableExterne}
                                            id={key}
                                        />
                                    }
                                    label="نشر خارجي"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={index.publiableInterne}
                                            onChange={handleChange}
                                            name="publiableInterne"
                                            value={index.publiableInterne}
                                            id={key}
                                        />
                                    }
                                    label="نشر داخلي"
                                />
                            </Fragment>
                        )}
                        <HighchartsComponent
                            filter={index.filter}
                            graphe={index.graphe}
                            data={index.data}
                            categories={index.categorie}
                        />
                        <GridListTileBar title={index.intituleAr} />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    )
}
/**
 *  declaration des props
 */
FormatStat.propTypes = {
    data: PropTypes.object.isRequired,
    onchange: PropTypes.func.isRequired,
    handelCheck: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
}

export default connect()(injectIntl(FormatStat))
