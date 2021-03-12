import React from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import generateKey from '../../../../shared/utility'

/**
 *
 *
 * @param {*} { comment }
 * @returns
 */
const FormDetail = ({ comment }) => {
    // declaration des numbers
    const title = 'العنوان'
    const sousTitle = 'العنوان الفرعي'
    const commentaire = 'التعليق'
    // render
    return (
        <div
            style={{
                padding: '0.5em',
                margin: '0.2em',
                width: '100%',
                borderRadius: '10px',
            }}
        >
            <Grid container key={generateKey()}>
                <Grid
                    key={generateKey()}
                    item
                    xs={12}
                    md={6}
                    sm={6}
                    className="gridItem"
                >
                    <h3>
                        <b> {`${title} : ${comment.rubrique}`} </b>{' '}
                    </h3>
                </Grid>
                {comment.sousRubrique && (
                    <Grid
                        key={generateKey()}
                        item
                        xs={12}
                        md={6}
                        sm={6}
                        className="gridItem"
                    >
                        <h4>
                            {' '}
                            <b>
                                {`${sousTitle} : ${comment.sousRubrique}`}{' '}
                            </b>{' '}
                        </h4>
                    </Grid>
                )}
                <Grid
                    key={generateKey()}
                    item
                    xs={12}
                    md={12}
                    sm={12}
                    className="gridItem"
                >
                    <h5>
                        {' '}
                        <b> {`${commentaire} :`}</b>
                    </h5>
                    {comment.commentaire}
                </Grid>
            </Grid>
        </div>
    )
}
/**
 *  declaration des props
 */
FormDetail.propTypes = {
    comment: PropTypes.object.isRequired,
}

export default FormDetail
