/* eslint-disable import/no-unresolved */

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
        path: '/livraison',
        props: {
            exact: true,
        },
        name: 'livraison',
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
            loader: () => import('../screens/editCommande'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/edit-commande',
        props: {
            exact: true,
        },
        name: 'Validation',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/reclamation'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/mes-reclamation',
        props: {
            exact: true,
        },
        name: 'mes_reclamation',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/listeReclamation'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/liste-reclamation',
        props: {
            exact: true,
        },
        name: 'liste_reclamation',
        showWhenConnected: true,
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../screens/addReclamation'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/ajout-reclamation',
        props: {
            exact: true,
        },
        name: 'ajout_reclamation',
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
            loader: () => import('../screens/validerCommande'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/validation-commande',
        props: {
            exact: true,
        },
        name: 'Validation',
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
            loader: () => import('../screens/createCommande'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/create_commande',
        props: {
            exact: true,
        },
        name: 'create-commande',
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
            loader: () =>
                import('../screens/pageCms/actualite/gestionActualite'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/actualite/gestion',
        props: {
            exact: true,
        },
        name: 'Gestion actualite',
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
            loader: () => import('../screens/tableauDuBord'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/dashboard',
        props: {
            exact: true,
        },
        name: 'dashboard',
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
            loader: () => import('../screens/parametreGlobale/parametreGlobale'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/prametreGlobale',
        props: {
            exact: true,
        },
        role: ['ROLE_ADMIN'],
        name: 'prametre_globale',
        showWhenConnected: true,
    },
]

export default loadableComponents
