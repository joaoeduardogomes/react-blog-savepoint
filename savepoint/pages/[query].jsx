import { useRouter } from 'next/router';
import ListPosts from "@/components/ListPosts";

export default function SearchPage() {
    const router = useRouter();
    const { query } = router.query;
    const slicedQuery = query ? query.slice(2) : "";

    return (
        <>
        {console.log(query)}
        {console.log(slicedQuery)}
        <ListPosts pageName="Search" query={slicedQuery || ""} />
        </>
    );
}
