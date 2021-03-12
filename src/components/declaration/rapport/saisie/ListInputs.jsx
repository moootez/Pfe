/**
 *
 *
 * @param {*} rubrique
 * @param {*} sousRubrique
 * @param {*} isSelectedRub
 * @returns
 */
const ListInputs = (rubrique, sousRubrique, isSelectedRub) => {
    return [
        {
            name: 'rubrique',
            sm: 6,
            md: 6,
            list: rubrique,
            label: 'العنوان',
            placeholder: 'العنوان',
            isSelect: true,
        },
        sousRubrique.length > 0 && {
            name: 'sousRubrique',
            sm: 6,
            md: 6,
            list: sousRubrique,
            label: 'العنوان الفرعي',
            placeholder: 'العنوان الفرعي',
            isSelect: true,
        },
        isSelectedRub && {
            name: 'commentaire',
            sm: 12,
            md: 12,
            lg: 12,
            label: 'إضافة تعليق',
            placeholder: ' تعليق',
        },
    ]
}

export default ListInputs
