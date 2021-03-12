import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Divider } from '@material-ui/core'
import { injectIntl } from 'react-intl'
import Check from '../checkBox'
import generateKey from '../../../shared/utility'
import ButtonComponent from '../button'

/**
 * consultation conjoint
 *
 * @param {*} {
 *     intl,
 *     data,
 *     listCheck,
 *     setCheck,
 *     addAction,
 *     cancelAction,
 * }
 * @returns
 */
const index = ({
    intl,
    data,
    listCheck,
    setCheck,
    addAction,
    cancelAction,
}) => {
    return (
        <div style={{ marginTop: '15px' }}>
            <Grid container style={{ width: '90%', padding: '10px 40px' }}>
                <Grid
                    item
                    xs={6}
                    sm={6}
                    className="gridItem"
                    style={{ marginTop: '15px' }}
                >
                    <Check
                        label={
                            <span
                                style={{ fontWeight: '600', padding: '10px' }}
                            >
                                اختر الكل
                            </span>
                        }
                        name="publishedAll"
                        selectedValue={data.publishedAll}
                        key={generateKey()}
                        onchange={(name, checked) => setCheck(name, checked)}
                    />
                </Grid>
                <Grid
                    item
                    xs={6}
                    sm={6}
                    className="gridItem"
                    style={{ marginTop: '15px' }}
                >
                    <Check
                        label={
                            <span
                                style={{ fontWeight: '600', padding: '10px' }}
                            >
                                عرض اسم العنوان فقط
                            </span>
                        }
                        name="publierNomRubrique"
                        selectedValue={data.publierNomRubrique}
                        key={generateKey()}
                        onchange={(name, checked) => setCheck(name, checked)}
                    />
                </Grid>
            </Grid>
            <div className="centerDiv">
                <Grid container>
                    {listCheck.map(check => (
                        <Grid
                            item
                            xs={6}
                            sm={6}
                            className="gridItem"
                            style={{ marginTop: '15px' }}
                        >
                            <Check
                                label={
                                    <span style={{ padding: '10px' }}>
                                        {check.label}
                                    </span>
                                }
                                name={check.name}
                                selectedValue={data[check.name]}
                                key={generateKey()}
                                onchange={(name, checked) =>
                                    setCheck(name, checked)
                                }
                            />
                        </Grid>
                    ))}
                </Grid>

                <div style={{ textAlign: 'center', padding: 20 }}>
                    <Divider />
                    <div>
                        <ButtonComponent
                            color="secondary"
                            type="contained"
                            size="medium"
                            label={intl.formatMessage({
                                id: 'BtnValider',
                            })}
                            clicked={addAction}
                        />
                        <ButtonComponent
                            color="secondary"
                            type="contained"
                            size="medium"
                            label={intl.formatMessage({
                                id: 'btnAnnuer',
                            })}
                            clicked={cancelAction}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
/**
 *  Inialisation
 */
index.defaultProps = {
    data: [],
    listCheck: [],
}
/**
 *  declaration des props
 */
index.propTypes = {
    intl: PropTypes.object.isRequired,
    data: PropTypes.array,
    listCheck: PropTypes.array,
    setCheck: PropTypes.func.isRequired,
    addAction: PropTypes.func.isRequired,
    cancelAction: PropTypes.func.isRequired,
}

export default injectIntl(index)
