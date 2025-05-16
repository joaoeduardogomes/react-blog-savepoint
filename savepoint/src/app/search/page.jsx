import ListPosts from "../components/ListPosts";

export default function SearchPage({ searchParams }) {
    const query = searchParams.q || "";

    if (!query) {
        return <p>No search query provided.</p>;
    }

    return <ListPosts pageName="Search" query={query} />;
}
