import React, {FC, MouseEventHandler} from 'react';
import {ITrack} from "@/types/track";
import {Card, Grid} from "@mui/material";
import styles from "@/styles/TrackItem.module.scss"
import IconButton from "@mui/material/IconButton";
import {Delete, Pause, PlayArrow} from "@mui/icons-material";
import Box from "@mui/material/Box";
import {useRouter} from "next/navigation";
import {useActions} from "@/hooks/useActions";
import {useDispatch} from "react-redux";
import {NextThunkDispatch} from "@/store";
import {deleteTrack, listensTrack} from "@/store/actions-creators/tracks";

type TypeTrackItem = {
    track: ITrack;
    active?: boolean;
}

const TrackItem:FC<TypeTrackItem> = ({track, active= false}) => {
    const router = useRouter();
    const {playTrack, pauseTrack, setActiveTrack} = useActions();
    const dispatch = useDispatch() as NextThunkDispatch;

    const play: MouseEventHandler<HTMLElement> = (e) =>{
        e.stopPropagation()
        setActiveTrack(track)
        playTrack()
        dispatch(listensTrack(track._id))
    }

    const deleteFunc = (e:any) =>{
        e.stopPropagation()
         dispatch( deleteTrack(track._id))
    }

    console.log(track)

    return (
        <Card className={styles.track} onClick={()=> router.push("/tracks/" + track._id)}>
            <IconButton onClick={play}>
                {!active ? <PlayArrow/> : <Pause/>}
            </IconButton>
            <img width={70} height={70} src={'http://localhost:5000/' + track.picture} alt={track.picture}/>
            <Grid container direction="column" sx={{width: 200, margin: "0 20px"}}>
                <Box>{track.name}</Box>
                <Box sx={{fontSize: 12, color: "gray"}}>{track.artist}</Box>
            </Grid>
            {active && <Box>02:42 / 03:42</Box>}
            <IconButton onClick={deleteFunc} sx={{marginLeft: "auto"}}>
                <Delete/>
            </IconButton>
        </Card>
    );
};

export default TrackItem;