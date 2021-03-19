import React from 'react'
import Loadable from 'react-loadable'
import { SpinnerHourGlass } from '../components/spinner'

/**
 * Inialisation des routes
 */
const loadableComponents = [
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/referencial/index'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/referencial',
        props: {
            exact: true,
        },
        name: 'referencial',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/referencial/operationReferencial'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/referencial/edit',
        props: {
            exact: true,
        },
        name: 'referencialEdition',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/referencial/operationReferencial'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/referencial/add',
        props: {
            exact: true,
        },
        name: 'referencialAjout',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/declaration/step_reception'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/declaration_reception',
        props: {
            exact: true,
        },
        name: 'declaration_reception',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/declaration/step_grab/index'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/declaration_saisie',
        props: {
            exact: true,
        },
        name: 'declaration_saisie',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import('../screens/declaration/step_grab/saisieDeclaration'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/saisie_declaration',
        props: {
            exact: true,
        },
        name: 'saisie_declaration',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import(
                    '../screens/declaration/step_grab/FormDetailDeclaration'
                ),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/declaration_saisie/saisie_details_declaration/:id',
        props: {
            exact: true,
        },
        name: 'declaration_saisie_detail',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/declaration/scan_papier/index'),
            loading: () => <SpinnerHourGlass />,
        }),
        path:
            '/declaration_rattacher_saisie/rattacher_le_scan_de_la_declaration',
        props: {
            exact: true,
        },
        name: 'declaration_saisie_scan_papier',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import(
                    '../screens/declaration/scan_papier/FormScanDeclaration'
                ),
            loading: () => <SpinnerHourGlass />,
        }),
        path:
            '/declaration_rattacher_saisie/rattacher_le_scan_de_la_declaration/:id',
        props: {
            exact: true,
        },
        name: 'declaration_saisie_scan_papier_detail',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../components/consultation/index'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/rattachement_scan/:id',
        props: {
            exact: true,
        },
        name: 'rattachement_scan_detail',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import(
                    '../screens/declaration/step_grab/FormDetailDeclaration'
                ),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/rattachement_scan/modification/:id',
        props: {
            exact: true,
        },
        name: 'rattachement_scan_modification',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import(
                    '../components/declaration/step_reception/renderDetailsDeclaration'
                ),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/declaration_saisie/succée',
        props: {
            exact: true,
        },
        name: 'declaration_saisie_success',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import(
                    '../screens/rapprochementDeclaration/agentAffectationRapprochement/index'
                ),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/affectation_pour_rapprochement',
        props: {
            exact: true,
        },
        name: 'rapprochement_Declaration',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../components/consultation/index'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/affectation_pour_rapprochement/:id',
        props: {
            exact: true,
        },
        name: 'affectation_rapprochement_detail',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import(
                    '../screens/declaration/step_grab/FormDetailDeclaration'
                ),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/affectation_pour_rapprochement/modification/:id',
        props: {
            exact: true,
        },
        name: 'affectation_rapprochement_modification',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import('../screens/rapprochementDeclaration/agentRapprocheur'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/rapprochement_de_declaration',
        props: {
            exact: true,
        },
        name: 'rapprocheur_Declaration',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../components/consultation/index'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/rapprochement_de_declaration/:id',
        props: {
            exact: true,
        },
        name: 'rapprochement_declaration_detail',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import(
                    '../screens/declaration/step_grab/FormDetailDeclaration'
                ),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/rapprochement_de_declaration/modification/:id',
        props: {
            exact: true,
        },
        name: 'rapprochement_declaration_modification',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import(
                    '../screens/validationDeclaration/agentAffectationValidation/index'
                ),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/affectation_pour_validation',
        props: {
            exact: true,
        },
        name: 'validation_Declaration',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../components/consultation/index'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/affectation_pour_validation/:id',
        props: {
            exact: true,
        },
        name: 'affectation_pour_validation_detail',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import(
                    '../screens/declaration/step_grab/FormDetailDeclaration'
                ),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/affectation_pour_validation/modification/:id',
        props: {
            exact: true,
        },
        name: 'affectation_pour_validation_modification',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import(
                    '../screens/validationDeclaration/agentValidateur/index'
                ),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/validation_de_declaration',
        props: {
            exact: true,
        },
        name: 'validateur_Declaration',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../components/consultation/index'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/validation_de_declaration/:id',
        props: {
            exact: true,
        },
        name: 'validateur_Declaration_Detail',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import(
                    '../screens/verificationDeclaration/agentVerificationDeclaration/index'
                ),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/affectation_pour_verification',
        props: {
            exact: true,
        },
        name: 'verification_Declaration',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../components/consultation/index'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/affectation_pour_verification/:id',
        props: {
            exact: true,
        },
        name: 'verification_Declaration_detail',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import(
                    '../screens/verificationDeclaration/agentVerificateur/index'
                ),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/verification_de_declaration',
        props: {
            exact: true,
        },
        name: 'Verificateur_Declaration',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../components/consultation/index'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/verification_de_declaration/:id',
        props: {
            exact: true,
        },
        name: 'Verificateur_Declaration_Detail',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/declaration/rapport/index'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/rapprochement_de_declaration/edit_rapport/:id',
        props: {
            exact: true,
        },
        name: 'edit_rapport_declaration',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import(
                    '../screens/validationRapport/agentValidateurRapport/index'
                ),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/list_rapport',
        props: {
            exact: true,
        },
        name: 'consultaion_rapport',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../components/consultation/index'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/list_rapport/consultation',
        props: {
            exact: true,
        },
        name: 'consultaion_rapport_pour_validation',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import('../screens/declaration/step_reception/consultation'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/declaration_saisie/declaration_consultation/:id',
        props: {
            exact: true,
        },
        name: 'declaration_consultation',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/commande'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/commande',
        props: {
            exact: true,
        },
        name: 'publication_du_declaration',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/facture'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/facture',
        props: {
            exact: true,
        },
        name: 'facture',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../components/consultation/index'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/publication_du_declaration/:id',
        props: {
            exact: true,
        },
        name: 'publication_du_declaration_detail',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/publicationEtablissement'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/publication_etablissement',
        props: {
            exact: true,
        },
        name: 'publication_etablissement',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/publicationDeclarant'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/publication_declarant',
        props: {
            exact: true,
        },
        name: 'publication_declarant',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import(
                    '../screens/declarationAssujetti/step_grab/listEtablissement'
                ),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/declaration_assujetti_saisie',
        props: {
            exact: true,
        },
        name: 'declaration_assujetti_saisie',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/declarationAssujetti/step_grab'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/declaration_assujetti_saisie_declarant',
        props: {
            exact: true,
        },
        name: 'declaration_assujetti_saisie_declarant',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import(
                    '../screens/declaration/step_reception/addDeclarationAssujetti'
                ),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/declaration_reception_assujetti',
        props: {
            exact: true,
        },
        name: 'declaration_reception_assujetti',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import('../screens/declaration/step_reception/consultation'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/declaration_assujetti_saisie/:id',
        props: {
            exact: true,
        },
        name: 'declaration_assujetti_consultation',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import('../screens/declarationAssujetti/validation/index'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/validation_declaration_assujetti',
        props: {
            exact: true,
        },
        name: 'validation_declaration_assujetti',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import('../screens/publicationDeclaration/publicationFormat'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/format_du_publication',
        props: {
            exact: true,
        },
        name: 'format_du_publiation',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import(
                    '../screens/declarant/addDeclarantInterne/addDeclarantInterne'
                ),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/add_declarant',
        props: {
            exact: true,
        },
        name: 'add_declarant',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/declarant/getDeclarantsInterne'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/get_declarants',
        props: {
            exact: true,
        },
        name: 'get_declarants',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/inscription/demande'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/liste_des_inscriptions',
        props: {
            exact: true,
        },
        name: 'liste_des_inscriptions',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/inscription/validation'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/validation_inscription/:id',
        props: {
            exact: true,
        },
        name: 'validation_inscription',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import('../screens/declarant/detailsSanction/consultation'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/declarant_interne_details/:id',
        props: {
            exact: true,
        },
        name: 'declarant_interne_details',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/declarant/editDeclarantInterne'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/declarant_interne_edit/:id',
        props: {
            exact: true,
        },
        name: 'declarant_interne_edit',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/stat'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/publier_stat',
        props: {
            exact: true,
        },
        name: 'publier_stat',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/stat/consulterStat'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/statistique',
        props: {
            exact: true,
        },
        name: 'statistique',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/user/getUser'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/user',
        props: {
            exact: true,
        },
        name: 'user',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/user/addUser'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/ajout_user',
        props: {
            exact: true,
        },
        name: 'ajout_user',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/reglement'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/reglement',
        props: {
            exact: true,
        },
        name: 'reglement',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/user/addUser'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/edit_user',
        props: {
            exact: true,
        },
        name: 'edit_user',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/user/changePassword'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/change_password',
        props: {
            exact: true,
        },
        name: 'change_password',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/parametres'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/parametres',
        props: {
            exact: true,
        },
        name: 'parametres',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/history'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/history',
        props: {
            exact: true,
        },
        name: 'history',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/login/sendEmail'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/sendEmail',
        props: {
            exact: true,
        },
        name: 'sendEmail',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/pageCms/guide/index'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/guide',
        props: {
            exact: true,
        },
        name: 'guide',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/pageCms/guide/editGuide'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/guide/edit',
        props: {
            exact: true,
        },
        name: 'guide_edit',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/pageCms/textJuridique/index'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/textJuridique',
        props: {
            exact: true,
        },
        name: 'textJuridique',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import('../screens/pageCms/textJuridique/editTextJuridique'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/textJuridique/edit',
        props: {
            exact: true,
        },
        name: 'textJuridique_edit',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import('../screens/pageCms/textJuridique/addTextJuridique'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/textJuridique/new',
        props: {
            exact: true,
        },
        name: 'textJuridique_new',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/pageCms/lien/index'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/lien',
        props: {
            exact: true,
        },
        name: 'lien',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/pageCms/lien/editLien'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/lien/edit',
        props: {
            exact: true,
        },
        name: 'lien_edit',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/pageCms/lien/addLien'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/lien/new',
        props: {
            exact: true,
        },
        name: 'lien_new',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/pageCms/rapport/index'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/rapport',
        props: {
            exact: true,
        },
        name: 'rapport',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/pageCms/rapport/editRapport'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/rapport/edit',
        props: {
            exact: true,
        },
        name: 'rapport_edit',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/pageCms/rapport/addRapport'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/rapport/new',
        props: {
            exact: true,
        },
        name: 'rapport_new',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/pageCms/actualite/index'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/actualite',
        props: {
            exact: true,
        },
        name: 'actualite',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/pageCms/actualite/editActualite'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/actualite/edit',
        props: {
            exact: true,
        },
        name: 'actualite_edit',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/pageCms/actualite/addActualite'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/actualite/new',
        props: {
            exact: true,
        },
        name: 'actualite_new',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/pageCms/faq/index'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/faq',
        props: {
            exact: true,
        },
        name: 'faq',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/pageCms/faq/editFaq'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/faq/edit',
        props: {
            exact: true,
        },
        name: 'faq_edit',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/pageCms/faq/addFaq'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/faq/new',
        props: {
            exact: true,
        },
        name: 'faq_new',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import(
                    '../screens/declaration/step_grab_cours_des_comptes/index'
                ),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/cour_des_comptes/declaration_saisie',
        props: {
            exact: true,
        },
        name: 'cour_des_comptes_declaration_saisie',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import(
                    '../screens/declaration/step_reception/addDeclarationCoursDesComptes'
                ),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/cour_des_comptes/declaration_reception',
        props: {
            exact: true,
        },
        name: 'cour_des_comptes_declaration_reception',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import(
                    '../screens/declaration/step_grab_cours_des_comptes/saisieDeclarationCoursDesComptes'
                ),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/cour_des_comptes/saisie_declaration',
        props: {
            exact: true,
        },
        name: 'cour_des_comptes_saisie_declaration',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import(
                    '../screens/declaration/step_grab_cours_des_comptes/FormDetailDeclarationCoursDesComptes'
                ),
            loading: () => <SpinnerHourGlass />,
        }),
        path:
            '/cour_des_comptes/declaration_saisie/saisie_details_declaration/:id',
        props: {
            exact: true,
        },
        name: 'cour_des_comptes_declaration_saisie_detail',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import('../screens/declaration/step_reception/consultation'),
            loading: () => <SpinnerHourGlass />,
        }),
        path:
            '/cour_des_comptes/declaration_saisie/declaration_consultation/:id',
        props: {
            exact: true,
        },
        name: 'cour_des_comptes_declaration_consultation',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import(
                    '../screens/validationDeclaration/listDecValideCoursDesComptes'
                ),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/cour_des_comptes/validation_de_declaration',
        props: {
            exact: true,
        },
        name: 'cour_des_comptes_validateur_Declaration',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import(
                    '../screens/publicationDeclaration/publicationDecCoursDesComptes'
                ),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/cour_des_comptes/publication_du_declaration',
        props: {
            exact: true,
        },
        name: 'cour_des_comptes_publication_du_declaration',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import(
                    '../screens/publicationDeclarant/publicationDeclarantCoursDesComptes'
                ),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/cour_des_comptes/publication_declarant',
        props: {
            exact: true,
        },
        name: 'cour_des_comptes_publication_declarant',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/tableauDeBoard'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/tableauDeBord',
        props: {
            exact: true,
        },
        name: 'tableauDeBord',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../components/consultation/index'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/cour_des_comptes/validation_de_declaration/:id',
        props: {
            exact: true,
        },
        name: 'validateur_Declaration_Detail',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../components/consultation/index'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/cour_des_comptes/publication_du_declaration/:id',
        props: {
            exact: true,
        },
        name: 'publication_du_declaration_detail',
        showWhenConnected: true,
    },
]

export default loadableComponents
