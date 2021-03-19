/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/order */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { injectIntl } from 'react-intl'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
} from '@material-ui/core'
import generateKey, { removeBottomDash } from '../../shared/utility'

/**
 * style cellule du table
 */
const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#c7c7c7',
        fontWeight: 'bold',
        color: theme.palette.common.black,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell)
/**
 * style row table
 */
const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow)

/**
 * style css
 *
 * @param {*} theme
 */
const styles = theme => ({
    root: {
        boxShadow: 'none',
        width: '100%',
        margin: 'auto',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        backgroundColor: '#e6e6e6',
        marginBottom: '20px',
        overflowY: 'auto',
    },
    headTable: {
        fontSize: '15px',
        textAlign: 'center',
    },
    fab: {
        textAlign: 'center',
        margin: theme.spacing(1),
    },
    row: {
        textAlign: 'center',
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    button: {
        margin: theme.spacing(1),
    },
})

const Index = props => {
    const { classes, apiCall, dataApi, dataReturned } = props

    useEffect(() => {
        apiCall(dataApi)
    }, [])

    return (
        <div className="column col-md-12">
            {!(dataReturned || []).length && (
                <p className="text-center m-3">Pas de données disponible!!</p>
            )}
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {Boolean((dataReturned || []).length) &&
                                Object.keys(dataReturned[0] || {}).map(item => (
                                    <StyledTableCell
                                        className={classes.headTable}
                                        align="center"
                                        key={generateKey()}
                                    >
                                        {removeBottomDash(item)}
                                    </StyledTableCell>
                                ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(dataReturned || []).map(item => (
                            <StyledTableRow key={generateKey()}>
                                {Object.values(item).map(value => {
                                    return (
                                        <StyledTableCell
                                            className={classes.headTable}
                                            align="center"
                                            key={generateKey()}
                                        >
                                            <div key={generateKey()}>
                                                {value}
                                            </div>
                                        </StyledTableCell>
                                    )
                                })}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    )
}

/* Proptypes */
/**
 *  declaration des props
 */
Index.propTypes = {
    dataApi: PropTypes.object.isRequired,
    classes: PropTypes.func.isRequired,
    dataReturned: PropTypes.array.isRequired,
    apiCall: PropTypes.func.isRequired,
}

export default injectIntl(withStyles(styles)(Index))
