import ListPosts from "../components/ListPosts";

export default async function SearchPage({ params }) {
    const resolvedParams = await params;
    const query = resolvedParams.query || "";
    const decodedQuery = decodeURIComponent(query);
    const slicedQuery = decodedQuery.startsWith("q=") ? decodedQuery.slice(2) : decodedQuery;

    console.log("query:", query);
    console.log("decodedQuery:", decodedQuery);
    console.log("slicedQuery:", slicedQuery);

    return (
        <>
            <ListPosts pageName="Search" query={slicedQuery} />
        </>
    );
}
