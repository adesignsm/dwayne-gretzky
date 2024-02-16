import { useState, useEffect } from "react"

import { Hero } from "../../Components/Hero";
import { Posts } from "../../Components/Posts";

export const Home = () => {
    return (
        <>
            <Hero />
            <Posts />
        </>
    )
}