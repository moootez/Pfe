import React from 'react'
import { Divider } from '@material-ui/core'
/* import PropTypes from 'prop-types'
import ButtonComponent from '../../button' */

/**
 *
 *
 * @returns
 */
const renderDetailsDeclaration = () => {
    /*  <ButtonComponent
                 color="secondary"
                 type="contained"
                 label="رجوع"
                 size="large"
                 clicked={() => history.goBack()}
             /> */
    return (
        <div style={{ margin: 'auto' }}>
            <center>
                <h1> لقد تمت المعالجة بنجاح </h1>
            </center>
            <Divider />
        </div>
    )
}

/* renderDetailsDeclaration.propTypes = {
    history: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
    }).isRequired,
} */

export default renderDetailsDeclaration
