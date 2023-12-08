import React, {FC, ReactNode} from 'react';
import NavBar from "@/components/NavBar";
import {Container} from "@mui/material";
import Player from "@/components/Player";
import Head from "next/head";

type TypeMainLayout = {
    children: ReactNode,
    title?: string,
    description?: string,
    keywords?: string,
}
const MainLayout:FC<TypeMainLayout> = ({children, title, description, keywords}) => {
    return (
        <>
            <Head>
                <title>{title || "Музыкальная платформа"}</title>
                <meta name="description" content={`Музыкальная площадка. Здесь каждый может оставить свой трек и стать знаменитым.` + description}/>
                <meta name="robots" content="index, follow"/>
                <meta name="keywords" content={keywords || "Музыка, треки, артисты"}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <NavBar/>
            <Container sx={{padding:"30px 20px 10px 80px"}}>
                {children}
            </Container>
            <Player/>
        </>
    );
};

export default MainLayout;