import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import Fab from '@material-ui/core/Fab'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import DeleteIcon from '@material-ui/icons/Delete'
import TableRow from '@material-ui/core/TableRow'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import Immutable from 'seamless-immutable'
import generateKey from '../../../shared/utility'
import './table.css'

/**
 * style cellule table
 */
const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#1d1d1b',
        color: 'white',
    },
    body: {
        fontSize: 10,
    },
    button: {
        margin: theme.spacing(5),
    },
}))(TableCell)

/**
 * style table
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
        minWidth: 700,
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
 *
 *
 * @class index
 * @extends {PureComponent}
 */
class index extends PureComponent {
    /**
     * declaration des state
     * @param {*} props
     */
    constructor(props) {
        super(props)
        this.state = {
            // count: 25,
            page: 0,
            rowsPerPage: 5,
            arrayDec: [],
            rowsS: Immutable.asMutable(props.rows.slice(0, 5)),
        }
    }

    /**
     *
     *
     * @param {*} nextProps
     * @memberof
     */
    componentWillReceiveProps(nextProps) {
        const { rows, searchValue } = this.props
        if (nextProps.rows !== rows) {
            this.setState(previousState => ({
                rowsS: Immutable.asMutable(
                    nextProps.rows.slice(0, previousState.count)
                ),
                page: 0,
            }))
        }
        if (nextProps.searchValue !== searchValue) {
            this.filter(nextProps.searchValue)
        }
    }

    /**
     * filtre table
     *
     * @memberof index
     */
    filter = value => {
        let filtredRef = null
        filtredRef = []
        const { rows } = this.props
        if (value.length === 0) {
            this.setState(previousState => ({
                rowsS: Immutable.asMutable(rows.slice(0, previousState.count)),
            }))
        } else {
            Immutable.asMutable(rows).forEach(ref =>
                Object.keys(ref).forEach(e => {
                    if (
                        ref[e]
                            .toString()
                            .toLowerCase()
                            .indexOf(value.toLowerCase()) > -1 &&
                        filtredRef.indexOf(ref) === -1
                    ) {
                        filtredRef.push(ref)
                    }
                })
            )
            this.setState({ rowsS: filtredRef })
        }
    }

    /**
     * change page
     *
     * @memberof index
     */
    handleChangeRowsPerPage = e => {
        const { rows } = this.props
        let r = []
        if (e.target.value !== 'Afficher Tous') {
            r = Immutable.asMutable(rows.slice(0, e.target.value))
            this.setRowsPerPage(parseInt(e.target.value, 10))
        } else {
            r = Immutable.asMutable(rows)
            this.setRowsPerPage(parseInt(r.length, 10))
        }
        this.setState({ rowsS: r, count: r.length < 5 ? 5 : r.length })
        this.setState({ page: 0 })
    }

    /**
     * set payload page
     *
     * @memberof index
     */
    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage })
    }

    /**
     * set payload limit
     *
     * @memberof index
     */
    setRowsPerPage = nb => {
        this.setState({ rowsPerPage: nb })
    }

    /**
     *
     *
     * @memberof index
     */
    getCurruntState = () => {
        const { arrayDec } = this.state
        return arrayDec
    }

    /**
     * obtenir liste checked
     *
     * @memberof index
     */
    handleChange = ({ target: { checked } }, item) => {
        const { setArrayDecAffecter } = this.props
        const tabTmp1 = this.getCurruntState()
        if (checked) {
            this.setState({ arrayDec: [...tabTmp1, item.id] }, () => {
                const tabTmp2 = this.getCurruntState()
                setArrayDecAffecter(tabTmp2)
            })
        } else
            this.setState(
                { arrayDec: tabTmp1.filter(dec => dec !== item.id) },
                () => {
                    const tabTmp3 = this.getCurruntState()
                    setArrayDecAffecter(tabTmp3)
                }
            )
    }

    /* render */
    /**
     *
     *
     * @returns
     * @memberof Actions
     */
    render() {
        const {
            classes,
            headers,
            rows,
            saisieAction,
            scanAction,
            status,
            lng,
            type,
            fn,
            getReceviedAction,
            editAction,
            deleteRef,
        } = this.props
        const { page, rowsPerPage, rowsS } = this.state

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {headers.map(head => {
                                return (
                                    <CustomTableCell
                                        key={generateKey()}
                                        className={classes.headTable}
                                    >
                                        <b className="headerSize"> {head}</b>
                                    </CustomTableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsS
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map(item => (
                                <TableRow className={classes.row} key={item.id}>
                                    {Object.keys(item).map(key => {
                                        if (
                                            key !== 'id' &&
                                            key !== 'index' &&
                                            key !== 'isDisabled' &&
                                            key !== 'user'
                                        ) {
                                            return (
                                                <CustomTableCell
                                                    className={
                                                        classes.headTable
                                                    }
                                                    component="th"
                                                    scope="row"
                                                    key={generateKey()}
                                                >
                                                    {key !==
                                                    'codeDeclaration' ? (
                                                        key !==
                                                        'rapport_De_Contrôle' ? (
                                                            item[key] && (
                                                                <div>
                                                                    {item[
                                                                        key
                                                                    ] &&
                                                                        item[
                                                                            key
                                                                        ].toString()}
                                                                </div>
                                                            )
                                                        ) : (
                                                            <div>
                                                                <Typography>
                                                                    <Link
                                                                        href=""
                                                                        onClick={() => {
                                                                            fn(
                                                                                item
                                                                            )
                                                                        }}
                                                                    >
                                                                        {item[
                                                                            key
                                                                        ] &&
                                                                            item[
                                                                                key
                                                                            ].toString()}
                                                                    </Link>
                                                                </Typography>
                                                            </div>
                                                        )
                                                    ) : (
                                                        <div>
                                                            <Typography>
                                                                <Link
                                                                    href={
                                                                        type ===
                                                                            'saisieAssujetti' ||
                                                                        type ===
                                                                            'validationAssujetti'
                                                                            ? ' '
                                                                            : null
                                                                    }
                                                                    onClick={() => {
                                                                        fn(item)
                                                                    }}
                                                                    className="focus"
                                                                >
                                                                    {item[
                                                                        key
                                                                    ] &&
                                                                        item[
                                                                            key
                                                                        ].toString()}
                                                                </Link>
                                                            </Typography>
                                                        </div>
                                                    )}
                                                </CustomTableCell>
                                            )
                                        }

                                        return null
                                    })}
                                    {status === 'en attente de saisie' && (
                                        <Button
                                            aria-label="add"
                                            className={classes.button}
                                            size="small"
                                            type="submit"
                                            style={{
                                                marginTop: '13px',
                                                backgroundColor: '#cd121a',
                                                color: '#fff',
                                            }}
                                            onClick={() =>
                                                getReceviedAction(item)
                                            }
                                        >
                                            إستخراج وصل
                                        </Button>
                                    )}
                                    {/* {type === 'validateur' && (
                                        <Button
                                            aria-label="add"
                                            className={classes.button}
                                            size="small"
                                            type="submit"
                                            style={{
                                                visibility: item.isDisabled
                                                    ? 'hidden'
                                                    : 'visible',
                                                marginTop: '13px',
                                                backgroundColor: '#cd121a',
                                                color: '#fff',
                                            }}
                                            onClick={() =>
                                                getReceviedAction(item)
                                            }
                                        >
                                            إستخراج التصريح
                                        </Button>
                                    )} */}
                                    {type === 'saisie_declaration' && (
                                        <Button
                                            aria-label="add"
                                            className={classes.button}
                                            size="small"
                                            type="submit"
                                            style={{
                                                marginTop: '13px',
                                                backgroundColor: '#cd121a',
                                                color: '#fff',
                                            }}
                                            onClick={() => saisieAction(item)}
                                        >
                                            إدخال البيانات
                                        </Button>
                                    )}
                                    {type === 'declarantInterneAvis' && (
                                        <Button
                                            aria-label="add"
                                            className={classes.button}
                                            size="small"
                                            type="submit"
                                            style={{
                                                marginTop: '13px',
                                                backgroundColor: '#cd121a',
                                                color: '#fff',
                                            }}
                                            onClick={() => saisieAction(item)}
                                        >
                                            تحيين
                                        </Button>
                                    )}
                                    {type === 'declarantInterneSanction' && (
                                        <Button
                                            aria-label="add"
                                            className={classes.button}
                                            size="small"
                                            type="submit"
                                            style={{
                                                marginTop: '13px',
                                                backgroundColor: '#cd121a',
                                                color: '#fff',
                                            }}
                                            onClick={() => saisieAction(item)}
                                        >
                                            تحيين
                                        </Button>
                                    )}
                                    {status === 'saisie' && (
                                        <Button
                                            variant="contained"
                                            color="default"
                                            className={classes.button}
                                            onClick={() => scanAction(item)}
                                        >
                                            Importer une commande
                                        </Button>
                                    )}
                                    {(type === 'affectation' ||
                                        type === 'validation' ||
                                        type === 'verification' ||
                                        type === 'publication' ||
                                        type === 'publicationEtablissement' ||
                                        type === 'publierDeclarant') && (
                                        <Checkbox
                                            variant="contained"
                                            color="primary"
                                            style={{
                                                margin: 'auto',
                                                marginTop: '0.6em',
                                            }}
                                            onChange={e =>
                                                this.handleChange(e, item)
                                            }
                                            disabled={
                                                (type === 'validation' &&
                                                    item.status ===
                                                        'مصادق عليها') ||
                                                (type === 'affectation' &&
                                                    item.status ===
                                                        'تمت مقاربتها')
                                            }
                                        />
                                    )}
                                    {(type === 'user' ||
                                        type === 'listQuide' ||
                                        type === 'listTextJuridique' ||
                                        type === 'listLien' ||
                                        type === 'listRapport' ||
                                        type === 'listActualite' ||
                                        type === 'listFaq') && (
                                        <Fab
                                            color="secondary"
                                            aria-label="edit"
                                            className={classes.fab}
                                            size="small"
                                        >
                                            <EditIcon
                                                onClick={() => editAction(item)}
                                            />
                                        </Fab>
                                    )}

                                    {(type === 'listTextJuridique' ||
                                        type === 'listLien' ||
                                        type === 'listRapport' ||
                                        type === 'user' ||
                                        type === 'listActualite' ||
                                        type === 'listFaq') && (
                                        <Fab
                                            aria-label="delete"
                                            className={classes.fab}
                                            size="small"
                                        >
                                            <DeleteIcon
                                                onClick={() => deleteRef(item)}
                                                color="primary"
                                            />
                                        </Fab>
                                    )}
                                </TableRow>
                            ))}
                    </TableBody>
                    <TableFooter style={{ backgroundColor: '#f4f4f4' }}>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[
                                    5,
                                    10,
                                    25,
                                    {
                                        value: rows.length,
                                        label: 'Afficher Tous',
                                    },
                                ]}
                                labelRowsPerPage={
                                    lng === 'ar'
                                        ? 'خطوط لكل صفحة'
                                        : 'Lignes par page'
                                }
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                backIconButtonProps={{
                                    'aria-label': 'next page',
                                }}
                                nextIconButtonProps={{
                                    'aria-label': 'previous page',
                                }}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={
                                    this.handleChangeRowsPerPage
                                }
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </Paper>
        )
    }
}
/**
 *  declaration des props
 */
index.propTypes = {
    classes: PropTypes.object.isRequired,
    headers: PropTypes.array.isRequired,
    rows: PropTypes.array,
    row: PropTypes.object,
    saisieAction: PropTypes.func,
    getReceviedAction: PropTypes.func,
    setArrayDecAffecter: PropTypes.func,
    fn: PropTypes.func,
    scanAction: PropTypes.func,
    lng: PropTypes.string.isRequired,
    type: PropTypes.string,
    status: PropTypes.string,
    searchValue: PropTypes.string,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    editAction: PropTypes.func,
    deleteRef: PropTypes.func,
}
/**
 *  Inialisation
 */
index.defaultProps = {
    saisieAction: null,
    getReceviedAction: () => {},
    scanAction: null,
    status: '',
    type: '',
    searchValue: '',
    row: {},
    rows: [],
    setArrayDecAffecter: () => {},
    fn: () => {},
    editAction: () => {},
    deleteRef: () => {},
}
export default withStyles(styles)(index)
