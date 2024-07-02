/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-unescaped-entities */

import React from 'react'
import { Grid } from '@material-ui/core'
import './footer.css'
import Public from '@material-ui/icons/Public'
import Fb from '../../assets/images/fb.png'
import Linkedin from '../../assets/images/linkedin.png'
import Youtube from '../../assets/images/youtube.png'
import Logo from '../../assets/images/logoinetum.png'

/**
 *
 * Index
 * @returns
 */
const Index = () => {
    return (
        <footer className="footerApp">
            <div className="blc-footer-top">
                <Grid container justify="space-around">
                    <Grid item xs={12} sm={12} md={2} className="footleft">
                    <div>
                        <a>
                            <img
                                src={Logo}
                                alt="Logo-OPALIA"
                                
                                // style={{ height: 60 }}
                            />
                        </a>
                   
                    </div>
                        
                        {/* <span className="slogan">
                        Construisons aujourd&apos;hui la sant&eacute; de demain
                    </span> */}
                    </Grid>
                    
                    
                   


                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={2}
                        style={{ verticalAlign: 'top' }}
                        className="footmid"
                    >
                        <div className="activHello helloWidget">
                            <h3>Contact</h3>
                            <div className="adressContact">
                                <p>
                                    <label>
                                    ADRESSE
Immeuble Harbour, Avenue de la Bourse, 1053, Tunis
                                    </label>
                                    
                                    <a href="mailto:contact@inetum.tn">
                                        Email : contact@inetum.tn
                                    </a>
                                </p>
                            </div>
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
                        <div>
                            <p>
                            Inetum est une entreprise de services et de solutions digitales. Présent dans plus de 19 pays, le Groupe compte près de 28 000 collaborateurs et a réalisé en 2022 un chiffre d’affaires de 2,5 milliards d’euros. Dans un contexte où les besoins et les usages se réinventent sans cesse, le groupe Inetum accompagne des entreprises et des gouvernements dans leur transformation digitale en mettant à leur service une combinaison unique de proximité, d’organisation sectorielle et de solutions innovantes. Présentant un profil de multi-spécialiste, Inetum aligne son organisation autour de 4 Global Business Lines : Inetum Consulting, Inetum Technologies, Inetum Solutions, Inetum Software.

                            </p>
                            {/* <p>OPALIA emploie plus de 300 salariés sélectionnés et qualifiés pour mettre à la disposition des patients et des professionnels de santé des médicaments génériques et innovants dans différents domaines thérapeutiques, sous différentes formes galéniques (les formes liquides à usage externe et interne, les formes pâteuses, les formes sèches ainsi que des produits injectables).</p> */}
                            {/* <p>OPALIA Pharma, Laboratoire pharmaceutique de renom, adopte un système de management de la qualité et de l'environnement certifié. Une réelle politique d’amélioration continue est déployée afin de satisfaire les attentes de ses clients et les exigences réglementaires nationales et internationales en vigueur, à savoir les Bonnes Pratiques de Fabrication ainsi que les normes ISO.</p> */}
                        </div>
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
                                href="https://www.facebook.com/InetumTunisie/"
                                target="_blank"
                            >
                                {/* <img
                                height="60px"
                                src="https://www.opaliarecordati.com/img/icon_fb.png"
                                alt="FB"
                            /> */}
                                <img src={Fb} alt="facebook" />
                            </a>
                            <a
                                href="https://www.inetum.com/fr/tunisie/"
                                target="_blank"
                            >
                                <img src={Linkedin} alt="linkedin" />
                            </a>
                            <a
                                href="https://www.youtube.com/@Inetum"
                                target="_blank"
                            >
                                <img src={Youtube} alt="youtube" />
                            </a>
                        </div>
                    </Grid>
                </Grid>
                
            </div>
            <div className="blc-bottom-footer">
                <Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        className="blc_bottom_logo"
                    >
                        <a href="/dashboard">
                            <img
                                src={Logo}
                                alt="Logo-OPALIA"
                                // style={{ height: 60 }}
                            />
                        </a>
                    </Grid>
                </Grid>
            </div>
        </footer>
    )
}
export default Index
