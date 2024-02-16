export default {
    name: 'header',
    title: 'Header',
    type: 'document',
    fields: [
        {
            name: 'sliceTitle',
            title: 'Slice Title',
            type: 'string'
        },
        {
            name: 'navigation',
            title: 'Navigation',
            description: 'Create, update, and delete navigation menu items.',
            type: 'array',
            of: [{ type: 'string'}]
        },
        {
            name: 'links',
            title: 'Social Links',
            description: 'Create, update, and delete social link items.',
            type: 'array',
            of: [
                { 
                    type: 'object',
                    fields: [
                        {
                            name: 'icon',
                            title: 'Icon',
                            type: 'image',
                        },
                        {
                            name: 'url',
                            title: 'Url',
                            type: 'url',
                        }
                    ]
                }
            ]
        }
    ]
}