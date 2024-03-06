export default {
    name: 'footer',
    title: 'Footer',
    type: 'document',
    fields: [
        {
            name: 'sliceTitle',
            title: 'Slice Title',
            type: 'string',
        },
        {
            name: 'logo',
            title: 'Logo',
            type: 'image'
        },
        {
            name: 'backgroundImage',
            title: 'Background Image',
            type: 'image'
        },
        {
            name: 'navigation',
            title: 'Navigation Items',
            type: 'array',
            of: [{
                type: 'string',
            }]
        },
        {
            name: 'links',
            title: 'Link Items',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    {
                        name: 'title',
                        title: 'Link Title',
                        type: 'string'
                    },
                    {
                        name: 'url',
                        title: 'Link Url',
                        type: 'url',
                    }
                ]
            }]
        }
    ]
}