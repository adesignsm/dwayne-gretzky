export default {
    name: 'shows',
    title: 'Shows',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Feature Title',
            type: 'string'
        },
        {
            name: 'show',
            title: 'Show',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    {
                        name: 'venue',
                        title: 'Venue',
                        type: 'string',
                    },
                    {
                        name: 'city',
                        title: 'City',
                        type: 'string',
                    },
                    {
                        name: 'date',
                        title: 'Show Date',
                        type: 'date'
                    },
                    {
                        name: 'link',
                        title: 'Ticket Link',
                        type: 'url'
                    }
                ]
            }]
        }
    ]
}