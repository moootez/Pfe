import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
} from '@material-ui/core'
import generateKey from '../../../shared/utility'

/**
 * style
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

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow)

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

/**
 * details declaration dans la consultation
 *
 * @param {*} { data, payload, classes }
 * @returns
 */
const DetailBienIntr = ({ data, payload, classes }) => {
    return (
        <div className="column col-md-12">
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {payload.map(item => (
                                <StyledTableCell
                                    className={classes.headTable}
                                    align="center"
                                    key={generateKey()}
                                >
                                    {item.label}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(item => (
                            <StyledTableRow key={generateKey()}>
                                {payload.map(key => {
                                    if (key !== 'id' && key !== 'index') {
                                        return (
                                            <StyledTableCell
                                                key={generateKey()}
                                                className={classes.headTable}
                                                align="center"
                                            >
                                                <div>
                                                    {typeof item[key.name] ===
                                                        'object' &&
                                                    item[key.name]
                                                        ? item[key.name]
                                                              .intituleAr
                                                        : item[key.name]}
                                                </div>
                                            </StyledTableCell>
                                        )
                                    }
                                    return null
                                })}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    )
}
/**
 *  Inialisation
 */
DetailBienIntr.defaultProps = {
    data: [],
    payload: [],
}
/**
 *  declaration des props
 */
DetailBienIntr.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array,
    payload: PropTypes.array,
}

export default withStyles(styles)(DetailBienIntr)
