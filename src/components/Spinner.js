import React from 'react'
import loading from "./Image/loading.gif"

export default function Spinner() {
    return (
        <div className="text-center">
            <img src={loading} alt="loading"/>
        </div>
    )
}
