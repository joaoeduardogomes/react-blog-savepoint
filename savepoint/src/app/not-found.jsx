"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Page from "./components/Page";

export default function NotFound() {
    const router = useRouter();

    // Optional: redirect to home after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/");
        }, 5000); // 5 seconds

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <Page>
            <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
                <h1 className="display-1">404</h1>
                <h2>Page Not Found</h2>
                <p>The page you are looking for does not exist.</p>
                <p>You will be redirected to the homepage in 5 seconds.</p>
            </div>
        </Page>
    );
}
