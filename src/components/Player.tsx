import React, {ChangeEvent, useEffect} from 'react';
import {Pause, PlayArrow, VolumeUp} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import styles from "@/styles/Player.module.scss"
import Box from "@mui/material/Box";
import {Grid} from "@mui/material";
import TrackProgress from "@/components/TrackProgress";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useActions} from "@/hooks/useActions";

let audio:HTMLAudioElement;

const Player = () => {
    const {active, duration, volume, pause, currentTime} = useTypedSelector(state => state.player);
    const {pauseTrack, playTrack, setVolume, setCurrentTime, setDuration} = useActions()

    useEffect(()=>{
        if(!audio){
            audio = new Audio();
        }
        setAudio()
        playTrack()
    },[active])

    const setAudio = () =>{
        if (!active || !audio) {
            return;
        }

        audio.src = 'http://localhost:5000/' + active?.audio;
        audio.volume = volume / 100;

        audio.onloadeddata = () =>{
            setDuration(Math.ceil(audio.duration))
            audio.play()
        }
        audio.ontimeupdate = () =>{
            setCurrentTime(Math.ceil(audio.currentTime))
        }
    }

    const play = () =>{
        if (!active || !audio) {
            return;
        }
        if(pause){
            playTrack()
            audio.play()
        }
        pauseTrack()
        audio.pause()
    }

    const changeVolume = (e:ChangeEvent<HTMLInputElement>)=>{
        audio.volume = Number(e.target.value) / 100;
        setVolume(Number(e.target.value))
    }

    const changeCurrentTime = (e:ChangeEvent<HTMLInputElement>)=>{
        audio.currentTime = Number(e.target.value);
        setCurrentTime(Number(e.target.value))
    }

    if(!active){
        return null
    }

    return (
        <Box className={styles.player}>
            <IconButton onClick={play}>
                {pause ? <PlayArrow/> : <Pause/>}
            </IconButton>
            <Grid container direction="column" style={{width: 200, margin: '0 20px'}}>
                <div>{active?.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{active?.artist}</div>
            </Grid>
            <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} isTrack={true}/>
            <VolumeUp sx={{marginLeft: "auto"}}/>
            <TrackProgress left={volume} right={100} onChange={changeVolume} isTrack={false}/>
        </Box>
    );
};

export default Player;