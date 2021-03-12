import DateFnsUtils from '@date-io/date-fns'
import format from 'date-fns/format'

/**
 *
 *
 * @export
 * @class FrDateFnsUtils
 * @extends {DateFnsUtils}
 */
export default class FrDateFnsUtils extends DateFnsUtils {
    getDatePickerHeaderText(date) {
        return format(date, 'd MMMM', { locale: this.locale })
    }
}
