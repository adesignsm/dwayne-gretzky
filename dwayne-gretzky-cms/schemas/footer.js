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
        }
    ]
}