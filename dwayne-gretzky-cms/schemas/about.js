export default {
    name: 'aboutPage',
    title: 'About Page',
    type: 'document',
    fields: [
        {
            name: 'sliceTitle',
            title: 'Slice Title',
            type: 'string',
        },
        {
            name: 'bio',
            title: 'About Page Bio',
            type: 'object',
            fields: [
                {
                    name: 'text',
                    title: 'Bio Text',
                    type: 'text'
                },
                {
                    name: 'contact',
                    title: 'Contact Name and Email',
                    type: 'object',
                    description: 'Add a contacts name and email',
                    fields: [
                        {
                            name: 'name',
                            title: 'Name',
                            type: 'string'
                        },
                        {
                            name: 'email',
                            title: 'Email',
                            type: 'string',
                            validation: Rule => Rule.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).error('Please enter a valid email address'),
                        }
                    ]
                }
            ]
        },
        {
            name: 'sliderImages',
            title: 'Slider Images',
            description: 'Add images to the About Page slider.',
            type: 'array',
            of: [{
                type: 'image',
            }]
        }
    ]
}