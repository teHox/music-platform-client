"use client"

import React, {FC, useState} from 'react';
import MainLayout from "@/layouts/MainLayout";
import {ITrack} from "@/types/track";
import {Button, Grid, TextField} from "@mui/material";
import {useRouter} from "next/navigation";
import Box from "@mui/material/Box";
import {GetServerSideProps} from "next";
import axios from "axios";
import {useInput} from "@/hooks/useInput";

type TypeTrackPage = {
    serverTrack: ITrack
}

const TrackPage:FC<TypeTrackPage> = ({serverTrack}) => {
    const [track, setTrack] = useState(serverTrack);
    const router = useRouter();
    const username = useInput('')
    const text = useInput('')

    const addComment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/tracks/comment', {
                username: username.value,
                text: text.value,
                trackId: track._id
            })
            setTrack({...track, comments: [...track.comments, response.data]})
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <MainLayout
            title={"Музыкальная площадка - " + track.name + " - " + track.artist}
            keywords={'Музыка, артисты, ' + track.name + ", " + track.artist}
        >
            <Button
                variant={"outlined"}
                sx={{fontSize: 32}}
                onClick={()=>router.push("/tracks")}
            >
                К списку
            </Button>
            <Grid container sx={{padding: "20px 0", gap:"30px"}}>
                <img src={'http://localhost:5000/' + track.picture} alt={track.picture} width={200} height={200}/>
                <Box>
                    <h1>Название трека - {track.name}</h1>
                    <h1>Исполнитель - {track.artist}</h1>
                    <h1>Прослушиваний - {track.listens}</h1>
                </Box>
            </Grid>
            <h1>Слова к треку</h1>
            <p>{track.text}</p>
            <h1>Коментарии</h1>
            <Grid container sx={{gap: "20px"}}>
                <TextField label="Ваше имя" fullWidth {...username}/>
                <TextField label="Коментарий" fullWidth multiline rows={4} {...text}/>
                <Button onClick={addComment}>Отправить</Button>
            </Grid>
            <Box>
                {track.comments.map((comment)=>(
                    <Box key={comment._id}>
                        <Box>Автор - {comment.username}</Box>
                        <Box>Коментарий - {comment.text}</Box>
                    </Box>
                ))}
            </Box>
        </MainLayout>
    );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get('http://localhost:5000/tracks/' + params?.id)
    return {
        props: {
            serverTrack: response.data
        }
    }
}