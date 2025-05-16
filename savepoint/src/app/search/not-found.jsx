import Page from "../components/Page";

export default function NotFound() {
    return (
        <Page>
            <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
                <h1 className="display-1">404</h1>
                <h2>Page Not Found</h2>
                <p>This search query does not exist.</p>
            </div>
        </Page>
    );
}
