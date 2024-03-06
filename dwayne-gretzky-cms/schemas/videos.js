export default {
    name: 'videosPage',
    title: 'Videos Page',
    type: 'document',
    fields: [
        {
            name: 'sliceTitle',
            title: 'Slice Title',
            type: 'string'
        },
        {
            name: 'videoLinks',
            title: 'Video Links',
            description: 'Add multiple YoutTube video links here. These will be converted into videos. *Note. Each video has a toggle to set it as the main video.',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    {
                        name: 'url',
                        title: 'YouTube Url',
                        type: 'url'
                    },
                    {
                        name: 'mainVideoToggle',
                        title: 'Main Video Toggle',
                        type: 'boolean',
                    }
                ]
            }]
        }
    ]
}