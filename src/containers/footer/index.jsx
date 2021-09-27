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
import Fb from '../../assets/images/fb.png'
import Linkedin from '../../assets/images/linkedin.png'
import Youtube from '../../assets/images/youtube.png'
import Logo from '../../assets/images/logo.png'
import Logopalia from '../../assets/images/logo_opalia.PNG'


/**
 *
 * Index
 * @returns
 */
const Index = () => {
    return (
        <footer className="footerApp">
            <Grid container justify="space-around">
                <Grid item xs={12} sm={12} md={2} className="footleft">
                    <a href="https://www.opaliarecordati.com/">
                        <img
                            src={Logopalia}
                            alt="Logo-INLUCC"
                            // style={{ height: 60 }}
                        />
                    </a>
                    {/* <span className="slogan">
                        Construisons aujourd&apos;hui la sant&eacute; de demain
                    </span> */}

                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={2}
                    style={{ paddingLeft: '10px' }}
                    className="footmid"
                >
                    <div className="activHello helloWidget">
                        <p>Siège commercial</p>
                        <div className="adressContact">
                            <p>
                                <label>27, Avenue de la Livre Sterling, les Berges du
                                Lac 2 - 1053 Tunis</label>
                                <label className="black-label">
                                    Tel : (+216) 71 19 63 57
                                </label>
                                <label className="black-label">
                                    Fax : (+216) 71 19 63 59
                                </label>
                                <a href="mailto:contact@opaliarecordati.tn">
                                    Email : contact@opaliarecordati.tn
                                </a>
                            </p>
                        </div>

                    </div>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={3}
                    style={{ paddingLeft: '10px' }}
                    className="footmid"
                >
                    <p>Site de production</p>
                        <div className="adressContact">
                            <p>
                                <label>Z.I. Kalaat Al Andalouss – 2022 Ariana</label>
                                <label className="black-label">
                                    Tel : (+216) 70 55 90 70 / (+216) 70 55 90
                                    64
                                </label>
                                <label className="black-label">
                                    Fax : (+216) 70 55 91 84
                                </label>
                            </p>
                        </div>

                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={5}
                    style={{ verticalAlign: 'top' }}
                    className="footright"
                >
                     <h3>Qui sommes-nous ?</h3>
                    <p>
                        Changement au capital d’Opalia Pharma, huitième
                        sur le marché pharmaceutique tunisien et troisième plus
                        grande entreprise pharmaceutique locale et, sans doute,
                        un nouvel élan de développement et de croissance. Le
                        Groupe Abraaj («Abraaj»), principal investisseur opérant
                        sur des marchés mondiaux en croissance, a en effet
                        annoncé sa pleine sortie du capital, cédant la totalité
                        de sa participation à Recordati, une société
                        pharmaceutique internationale cotée à la bourse
                        italienne. Au cours des quatre dernières années, la
                        participation d’Abraaj avec Opalia a permis à
                        l’entreprise de multiplier ses ventes par...{' '}
                    </p>
                    {/* <div className="aright">
                        <a
                            href="https://www.opaliarecordati.com/cms/notre_histoire.php"
                            target="_blank"
                            className="btn history-link"
                            title="Notre histoire"
                        >
                            Notre histoire
                        </a>
                    </div> */}

                    {/* <h3>Nous suivre</h3> */}
                    <div className="blc_rs">
                        <a
                            href="https://www.facebook.com/OpaliaRecordati/"
                            target="_blank"
                        >
                            {/* <img
                                height="60px"
                                src="https://www.opaliarecordati.com/img/icon_fb.png"
                                alt="FB"
                            /> */}
                            <img
                                src={Fb}
                                alt="facebook"
                            />
                        </a>
                        <a
                            href="https://www.linkedin.com/company/opalia-pharma-recordati-group/"
                            target="_blank"
                        >
                            <img
                                src={Linkedin}
                                alt="linkedin"
                            />
                        </a>
                        <a
                            href="https://www.youtube.com/channel/UC-jqFV78HBKGuPoQiKo0B_A"
                            target="_blank"
                        >
                            <img
                                src={Youtube}
                                alt="youtube"
                            />
                        </a>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} className="blc_bottom_logo">
                    <a href="/dashboard">
                        <img
                            src={Logo}
                            alt="Logo-INLUCC"
                            // style={{ height: 60 }}
                        />
                    </a>
                </Grid>
            </Grid>
        </footer>
    )
}
export default Index
