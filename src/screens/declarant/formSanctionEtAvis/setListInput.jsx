const SetListInput = (payload, type) => {
    return [
        type === 'declarantInterneSanction' && {
            name: 'type',
            label: 'نوع العقوبة : ',
            sm: 12,
            md: 12,
            list: [
                { label: 'إقتطاع 2/3 المرتب', value: 1 },
                { label: 'شكاية', value: 2 },
                { label: 'عدم مباشرة المهام', value: 3 },
                {
                    label: 'إقتطاع ثلثي المرتب أو المنحة عن كل شهر تأخير',
                    value: 4,
                },
                { label: 'خطية مالية من 1000 إلى 10000 دينار', value: 5 },
                {
                    label:
                        'عند إنقضاء مدة  60 يوم إقتطاع ثلثي المرتب أو المنحة عن كل شهر تأخير',
                    value: 6,
                },
                {
                    label:
                        'عند إنقضاء مدة  60 يوم خطية مالية من 1000 إلى 10000 دينار',
                    value: 7,
                },
                {
                    label:
                        'عند إنقضاء مدة  60 يوم خطية 300 دينار عن كل شهر تأخير',
                    value: 8,
                },
                {
                    label:
                        'إذا تواصل التأخير أكثر من 6 أشهر سجن لمدة سنة و خطية 20000 دينار+ إذا كان الممتنع من المنتجبين يحرم من الترشح للوظائف العامة لمدة 5 سنوات',
                    value: 9,
                },
            ],
            isSelect: true,
        },
        {
            name: 'dateCreation',
            isDate: true,
            type: 'date',
            sm: 12,
            md: 12,
            label: 'تاريخ الاصدار : ',
            required: false,
        },
        {
            name: 'dateEnvoi',
            isDate: true,
            type: 'date',
            sm: 12,
            md: 12,
            label: 'تاريخ الارسال : ',
            required: false,
        },
        {
            name: 'dateNotificationArrive',
            isDate: true,
            type: 'date',
            sm: 12,
            md: 12,
            label: 'تاريخ إعلام الوصول : ',
            required: false,
        },
        type === 'declarantInterneAvis' && {
            name: 'dateReception',
            isDate: true,
            type: 'date',
            sm: 12,
            md: 12,
            label: 'تاريخ التلقي : ',
            required: false,
        },
    ]
}

export default SetListInput
