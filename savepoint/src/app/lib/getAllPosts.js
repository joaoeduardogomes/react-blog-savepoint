export default async function getAllPosts() {
    const res = await fetch("/api/posts", { cache: "no-store" });

    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
}
