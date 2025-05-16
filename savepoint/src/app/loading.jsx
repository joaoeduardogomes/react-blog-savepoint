import React from 'react'
import Page from './components/Page'

export default function Loading() {
    return (
        <Page>
            <div className="d-flex flex-column justify-content-center align-items-center vh-100">
                {/* Seu conteúdo de loading aqui */}
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-center">Loading...</p>
            </div>
        </Page>
    )
}
