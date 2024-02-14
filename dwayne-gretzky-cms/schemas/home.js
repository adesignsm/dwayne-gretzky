export default {
    name: 'home',
    title: 'Home Page',
    type: 'document',
    fields: [
        {
            name: 'sliceTitle',
            title: 'Slice Title',
            type: 'string',
        },
        {
            name: 'hero',
            title: 'Hero Content',
            type: 'object',
            description: 'Update content in the hero section here.',
            fields: [
                {
                    name: 'logo',
                    title: 'Hero Logo',
                    type: 'image'
                },
                {
                    name: 'backgroundImage',
                    title: 'Background Image',
                    type: 'image',
                }
            ]
        },
        {
            name: 'posts',
            title: 'Posts',
            type: 'array',
            of: [
                { 
                    type: 'object',
                    fields: [
                        {
                            name: 'heading',
                            title: 'Post Heading',
                            type: 'string',
                        },
                        {
                            name: 'subTitle',
                            title: 'Post Sub Heading',
                            type: 'string',
                        },
                        {
                            name: 'media',
                            title: 'Post Media',
                            type: 'image'
                        },
                        {
                            name: 'cta',
                            title: 'Call To Action Button',
                            type: 'object',
                            fields: [
                                {
                                    name: 'text',
                                    title: 'Button Text',
                                    type: 'string',
                                },
                                {
                                    name: 'url',
                                    title: 'Button Url',
                                    type: 'url'
                                }
                            ]
                        },
                    ]
                }
            ]
        }
    ]
}