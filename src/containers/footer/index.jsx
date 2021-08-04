/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
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
        <footer className="footerApp container">
            <Grid container alignItems="center" justify="space-around">
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    className="footleft"
                >
                    <a href="https://www.opaliarecordati.com/">
                        <img src="https://www.opaliarecordati.com/img/opalia-icon/opalia-logo.png"
                            width="320px" alt="Opalia Recordati" />
                    </a>
                    <span className="slogan">Construisons aujourd&apos;hui la sant&eacute; de demain</span>
                    <div className="activHello helloWidget">
                        <h3>Siège commercial</h3>
                        <div className="adressContact">
                            <p>27, Avenue de la Livre Sterling, les Berges du Lac 2 - 1053 Tunis<br />
                                <label className="black-label">Tel : (+216) 71 19 63 57</label><br />
                                <label className="black-label">Fax : (+216) 71 19 63 59</label><br />
                                <a href="mailto:contact@opaliarecordati.tn">Email : contact@opaliarecordati.tn</a><br />
                            </p>
                        </div>
                        <h3>Site de production</h3>
                        <div className="adressContact">
                            <p>Z.I. Kalaat Al Andalouss – 2022 Ariana<br />
                                <label className="black-label">Tel : (+216) 70 55 90 70 / (+216) 70 55 90 64</label><br />
                                <label className="black-label">Fax : (+216) 70 55 91 84</label>
                            </p>
                        </div>
                    </div>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    style={{ paddingLeft: '10px' }}
                    className="footmid"
                >
                    <h3>Qui sommes-nous ?</h3>
                    <p>
                        &nbsp;

                        Changement au capital d’Opalia Pharma, huitième sur le marché pharmaceutique tunisien et troisième plus grande entreprise pharmaceutique locale et, sans doute, un nouvel élan de développement et de croissance. Le Groupe Abraaj («Abraaj»), principal investisseur opérant sur des marchés mondiaux en croissance, a en effet annoncé sa pleine sortie du capital, cédant la totalité de sa participation à Recordati, une société pharmaceutique internationale cotée à la bourse italienne.

                        Au cours des quatre dernières années, la participation d’Abraaj avec Opalia a permis à l’entreprise de multiplier ses ventes par...				</p>
                    <div className="aright">
                        <a href="https://www.opaliarecordati.com/cms/notre_histoire.php" target="_blank" className="btn history-link" title="Notre histoire">Notre histoire</a>
                    </div>

                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    style={{ verticalAlign: 'top' }}
                    className="footright"
                >
                    <h3>Nous suivre</h3>
                    <div>
                        <a href="https://www.facebook.com/OpaliaRecordati/" target="_blank"><img height="120px" src="https://www.opaliarecordati.com/img/icon_fb.png" alt="FB" /></a>
                        <a href="https://www.linkedin.com/company/opalia-pharma-recordati-group/" target="_blank"><img height="120px" src="https://www.opaliarecordati.com/img/icon_linkedin.png" alt="Linkedin" /></a>
                        <a href="https://www.youtube.com/channel/UC-jqFV78HBKGuPoQiKo0B_A" target="_blank"><img height="120px" src="https://www.opaliarecordati.com/img/icon_youtube.png" alt="Youtube" /></a>
                    </div>
                </Grid>
            </Grid>

        </footer>
    )
}
export default Index
