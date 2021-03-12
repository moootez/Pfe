import React from 'react'
import { connect } from 'react-redux'
import { Grid, FormGroup } from '@material-ui/core'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import Form from './Form'
import ButtonComponent from '../../../ui/button'
import addCommentActions from '../../../../redux/rapport/saisie/index'
import getRapportByRubriqueActions from '../../../../redux/rapport/getRapportByRubrique/index'
import changeStepActions from '../../../../redux/step_saisie/index'
import getRapportActions from '../../../../redux/rapport/getRapport/index'

/**
 *
 *
 * @class index
 * @extends {React.Component}
 */
class index extends React.Component {
    // intialisation des données state
    constructor(props) {
        super(props)
        this.state = {
            isSelectedRub: false,
            isExistComment: false,
            rubrique: [
                {
                    id: 1,
                    label: 'القرين',
                    value: 'Le conjoint',
                },
                {
                    id: 2,
                    label: 'الأبناء القصر',
                    value: 'Les enfants mineurs',
                },
                {
                    id: 3,
                    label: 'المصرح',
                    value: 'Le declarant',
                },
                {
                    id: 4,
                    label: 'التصريح بالمكاسب',
                    value: 'Les biens',
                },
                {
                    id: 5,
                    label: 'التصريح بالمصالح',
                    value: 'Les intérets',
                },
            ],
            sousRubrique: [],
        }
        this.title = 'اختر من القوائم القسم المعني بالتقرير:'

        this.sousRubriqueBien = [
            {
                id: 1,
                label: 'المداخيل',
                value: 'Les revenues',
            },
            {
                id: 2,
                label: 'العقارات',
                value: 'Les immeubles',
            },
            {
                id: 3,
                label: 'العربات',
                value: 'les véhicules ',
            },
            {
                id: 4,
                label: 'الأسهم والحصص والرقاع',
                value: 'Les actions et les parts sociales',
            },
            {
                id: 5,
                label: 'حصص التأسيس',
                value: 'Les parts sociales de constriction',
            },
            {
                id: 7,
                label: 'الأوراق المالية',
                value: 'Les autres valeurs mobiliers                ',
            },
            {
                id: 8,
                label: 'الأصول التجارية',
                value:
                    'Les fonds de commerce dont la valeur unitaire est supérieure à 10 000 DT',
            },
            {
                id: 9,
                label: 'الحيوانات',
                value: 'Les animaux',
            },
            {
                id: 10,
                label: 'المبالغ المالية المودعة',
                value: 'Le montant dans les sociétés financières',
            },
            {
                id: 11,
                label: 'الأموال التي تحت اليد نقدا ',
                value: 'Les fonds en espèce qui dépassent cinq mille dinars',
            },
            {
                id: 12,
                label: 'الأشياء الثمينة ',
                value: 'Les objets précieux',
            },
            {
                id: 13,
                label: 'القروض المتحصل عليها والجارية في تاريخ التصريح',
                value:
                    'Les prêts acquis et en cours à la date de la déclaration',
            },
            {
                id: 14,
                label: 'عقود التأمين ',
                value: 'Le contrat d’assurance de vie',
            },
        ]

        this.sousRubriqueIntr = [
            {
                id: 1,
                label: 'تقديم االستشارات والدراسات',
                value: 'Les etudes',
            },
            {
                id: 2,
                label: 'مهنة حرة',
                value: 'Profession libérale',
            },
            {
                id: 3,
                label: 'جير بمؤسسة خاصة',
                value: 'Salarié dans une société privée',
            },
            {
                id: 4,
                label: 'الأنشطة المهنية للقرين',
                value: 'Les activités professionnelles du conjoint',
            },
            {
                id: 5,
                label:
                    'عضوية في هياكل المداولة والتسيير لدى الشركات الخاصة أو الجمعيات أو الأحزاب أو المنظمات الدولية الحكومية أو غير الحكومية',
                value:
                    'Membres aux organes de délibération et de fonctionnement des entreprises privées ou associations ou parties politiques ou Organizations non gouvernementales ou non gouvernementales',
            },
            {
                id: 6,
                label: 'الهدايا المتحصل عليها',
                value: 'Les cadeaux',
            },
        ]
        const { history } = this.props
        const { idDeclaration } = history.location.state
        this.payload = { declaration: idDeclaration }
    }
    /* life cycle */

    /**
     *
     *
     * @param {*} nextProps
     * @memberof index
     */
    /**
     *
     *
     * @param {*} nextProps
     * @memberof
     */
    componentWillReceiveProps(nextProps) {
        if (
            nextProps.getRapportByRubrique &&
            nextProps.getRapportByRubrique.data
        ) {
            this.payload.commentaire =
                nextProps.getRapportByRubrique.data.commentaire
        }
        /*
                if (
                    nextProps.addRapport &&
                    nextProps.addRapport.response &&
                    nextProps.addRapport.response.code === 200
                ) {
                    history.push({
                        pathname: `/verification_de_declaration/${idDeclaration}`,
                        state: {
                            idDeclaration,
                            dataDeclaration,
                            step: 4,
                            type: 'verificateur',
                        },
                    })
                }
                */
    }

    /* functions */

    /**
     * changer payload
     *
     * @memberof index
     */
    /**
     * set Payload
     *
     * @memberof
     */
    fieldChangedHandler = ({ target: { name, value } }) => {
        const { getRapportByRubriqueReq } = this.props
        const { rubrique } = this.state
        this.payload.commentaire = ''
        if (name === 'rubrique') {
            this.payload.idRubrique = value
            if (value === 4)
                this.setState({
                    sousRubrique: this.sousRubriqueBien,
                    isSelectedRub: false,
                })
            else if (value === 5)
                this.setState({
                    sousRubrique: this.sousRubriqueIntr,
                    isSelectedRub: false,
                })
            else {
                getRapportByRubriqueReq({
                    ...this.payload,
                    rubrique: rubrique.find(e => e.id === value).label,
                })
                this.setState({
                    isSelectedRub: true,
                    sousRubrique: [],
                })
            }
            this.payload.rubrique = rubrique.find(e => e.id === value).label
            this.payload.sousRubrique = ''
            this.payload.idSousRubrique = 0
        } else if (name === 'sousRubrique') {
            console.log('value', this.payload.idRubrique)

            this.payload.sousRubrique = (this.payload.idRubrique === 4
                ? this.sousRubriqueBien
                : this.sousRubriqueIntr
            ).find(e => e.id === value).label
            this.payload.idSousRubrique = value
            getRapportByRubriqueReq(this.payload)
            this.setState({
                isSelectedRub: true,
            })
        } else {
            this.setState({ isExistComment: true })
            this.payload.commentaire = value
        }
    }

    /**
     * ajouter comentaire
     *
     * @memberof index
     */
    addComment = () => {
        const { addCommentReq, history, changeStep, getRapportReq } = this.props
        // const { idDeclaration, dataDeclaration } = history.location.state
        addCommentReq([this.payload])
        setTimeout(() => {
            getRapportReq(this.payload.declaration)
            history.goBack()
        }, 1000)

        // history.push({
        //     pathname: `/verification_de_declaration/${idDeclaration}`,
        //     state: {
        //         idDeclaration,
        //         dataDeclaration,
        //         step: 4,
        //         type: 'verificateur',
        //         label: 'مراقبة التصاريح'
        //     },
        // })
        changeStep(4)
    }

    /**
     * render
     *
     * @returns
     * @memberof index
     */
    /* render */
    /**
     *
     *
     * @returns
     * @memberof Actions
     */
    render() {
        const {
            rubrique,
            sousRubrique,
            isSelectedRub,
            isExistComment,
        } = this.state
        const { intl, history } = this.props
        console.log(
            'history',
            history.location.state.dataDeclaration.user.situationCivile
        )

        return (
            <div style={{ paddingTop: '1em' }}>
                <FormGroup>
                    <div className="centerDiv">
                        <Grid container>
                            <Grid container>{this.title}</Grid>
                            <Grid container>
                                <Form
                                    payload={this.payload}
                                    disabled={false}
                                    rubrique={
                                        history.location.state.dataDeclaration
                                            .user.situationCivile !== 'marié'
                                            ? rubrique.slice(1)
                                            : rubrique
                                    }
                                    sousRubrique={sousRubrique}
                                    isSelectedRub={isSelectedRub}
                                    fieldChangedHandler={
                                        this.fieldChangedHandler
                                    }
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div style={{ textAlign: 'center', padding: 10 }}>
                        <div>
                            <ButtonComponent
                                disabled={!isExistComment}
                                color="secondary"
                                type="contained"
                                size="medium"
                                label="تأكيد"
                                clicked={this.addComment}
                            />
                            <ButtonComponent
                                color="secondary"
                                type="contained"
                                size="medium"
                                label={intl.formatMessage({
                                    id: 'btnAnnuer',
                                })}
                                clicked={() => {
                                    history.goBack()
                                }}
                            />
                        </div>
                    </div>
                </FormGroup>
            </div>
        )
    }
}

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
function mapStateToProps(state) {
    return {
        addRapport: state.rapport.addRapport,
        getRapportByRubrique: state.rapport.getRapportByRubrique.response,
    }
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    addCommentReq: payload =>
        dispatch(addCommentActions.addRapportRequest(payload)),
    getRapportByRubriqueReq: payload =>
        dispatch(
            getRapportByRubriqueActions.getRapportByRubriqueRequest(payload)
        ),
    changeStep: step => dispatch(changeStepActions.changeStepSaisie(step)),
    getRapportReq: payload =>
        dispatch(getRapportActions.getRapportRequest(payload)),
})
/**
 *  intialisation
 */
index.defaultProps = {
    getRapportByRubrique: {},
}
/**
 *  declaration des props
 */
index.propTypes = {
    history: PropTypes.object.isRequired,
    /* addRapport: PropTypes.object.isRequired, */
    getRapportByRubrique: PropTypes.object,
    changeStep: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    addCommentReq: PropTypes.func.isRequired,
    getRapportByRubriqueReq: PropTypes.func.isRequired,
    getRapportReq: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(index))
