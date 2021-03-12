import React from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import consultationInput from './setListInput'
import LabelText from '../../../components/ui/label'

/**
 *
 *
 * @param {*} { payload, lng, intl, type, form }
 * @returns
 */
const ConsultationForm = ({ payload, lng, intl, type, form }) => {
    // list type sanction
    const list = [
        { label: 'إقتطاع 2/3 المرتب', value: 1 },
        { label: 'شكاية', value: 2 },
        { label: 'عدم مباشرة المهام', value: 3 },
        { label: 'إقتطاع ثلثي المرتب أو المنحة عن كل شهر تأخير', value: 4 },
        { label: 'خطية مالية من 1000 إلى 10000 دينار', value: 5 },
        {
            label:
                'عند إنقضاء مدة  60 يوم إقتطاع ثلثي المرتب أو المنحة عن كل شهر تأخير',
            value: 6,
        },
        {
            label: 'عند إنقضاء مدة  60 يوم خطية مالية من 1000 إلى 10000 دينار',
            value: 7,
        },
        {
            label: 'عند إنقضاء مدة  60 يوم خطية 300 دينار عن كل شهر تأخير',
            value: 8,
        },
        {
            label:
                'إذا تواصل التأخير أكثر من 6 أشهر سجن لمدة سنة و خطية 20000 دينار+ إذا كان الممتنع من المنتجبين يحرم من الترشح للوظائف العامة لمدة 5 سنوات',
            value: 9,
        },
    ]

    if (payload.length !== 0) {
        return consultationInput(payload, type, form).map(item => {
            return (
                payload[0][item.name] && (
                    <Grid
                        item
                        xs={12}
                        md={item.md}
                        sm={item.sm}
                        className="gridItem"
                        key={`${item.name}`}
                    >
                        <LabelText
                            lng={lng}
                            intl={intl}
                            label={item.label}
                            defaultValue={
                                payload[0][item.name] && item.type === 'date'
                                    ? payload[0][item.name].substr(0, 11)
                                    : list
                                          .filter(
                                              e =>
                                                  e.value ===
                                                  // eslint-disable-next-line radix
                                                  parseInt(
                                                      payload[0][item.name]
                                                  )
                                          )
                                          .map(i => i.label)[0]
                            }
                        />
                    </Grid>
                )
            )
        })
    }
    return null
}
/**
 *  Inialisation
 */
ConsultationForm.defaultProps = {
    form: 'consultation',
}
/**
 *  declaration des props
 */

ConsultationForm.propTypes = {
    payload: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    intl: PropTypes.object.isRequired,
    form: PropTypes.string,
}

export default injectIntl(ConsultationForm)
