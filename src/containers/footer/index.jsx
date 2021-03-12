/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { Grid } from '@material-ui/core'
import './footer.css'
import Public from '@material-ui/icons/Public'

/**
 *
 * Index
 * @returns
 */
const Index = () => {
    return (
        <footer className="footerApp">
            <Grid container alignItems="center" justify="space-around">
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    style={{ textAlign: 'center' }}
                >
                    <div className="phoneNumber">
                        <a
                            href="http://opaliarecordati.com/"
                            target="blank"
                            className="public"
                        >
                            opaliarecordati.com
                        </a>
                        <Public className="iconFooter" />
                    </div>
                </Grid>
                <Grid
                    className="public"
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    style={{ textAlign: 'center', paddingLeft: '10px' }}
                >
                    <a
                        href="https://gfi.world/tn-fr/"
                        target="blank"
                        className="public"
                    >
                        Powered By Inetum 2020
                    </a>
                </Grid>
            </Grid>
        </footer>
    )
}
export default Index
