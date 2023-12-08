import React, {ChangeEvent, FC} from 'react';
import Box from "@mui/material/Box";

type TypeTrackProgress = {
    left: number | string,
    right: number | string,
    onChange: (e:ChangeEvent<HTMLInputElement>) => void,
    isTrack: boolean
}

const TrackProgress:FC<TypeTrackProgress> = (
    {
        left, right, onChange, isTrack
    }) => {
    let trackStartSeconds: number | string = Number(left) % 60;
    let trackEndSeconds: number | string = Number(right) % 60;
    if(trackStartSeconds < 10){
        trackStartSeconds = "0" + trackStartSeconds
    } else if(trackEndSeconds < 10){
        trackEndSeconds = "0" + trackEndSeconds
    }
    let trackStart = `${Math.floor(Number(left)/60)}:${trackStartSeconds}`;
    let trackEnd = `${Math.floor(Number(right)/60)}:${trackEndSeconds}`;

    return (
        <Box sx={{display: 'flex'}}>
            <input
                type="range"
                min={0}
                max={right}
                value={left}
                onChange={onChange}
            />
            {isTrack? (
                <Box>
                    {trackStart} / {trackEnd}
                </Box>
            ) : (
                <Box>{left} / {right}</Box>
            )}

        </Box>
    );
};

export default TrackProgress;