import sanityClient from "@sanity/client";

export default sanityClient({
    projectId: "su7nwxkb",
    dataset: "production",
    useCdn: true,
});