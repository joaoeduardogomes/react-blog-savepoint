"use client"

import { useSearchParams } from "next/navigation";
import ListPosts from "../components/ListPosts";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";

    if (!query) {
        return <p>No search query provided.</p>;
    }

    return <ListPosts pageName="Search" query={query} />;
}
