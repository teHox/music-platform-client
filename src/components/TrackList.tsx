import React from 'react';
import {ITrack} from "@/types/track";
import {Grid} from "@mui/material";
import Box from "@mui/material/Box";
import TrackItem from "@/components/TrackItem";

type TypeTrackList = {
    tracks: ITrack[]
}

const TrackList: React.FC<TypeTrackList> = ({tracks}) => {

    // @ts-ignore
    if(tracks.length === 0 || tracks[0].length === 0){
        return (
            <Grid container direction="column">
                <Box p={2}>
                    No tracks
                </Box>
            </Grid>
        )
    }

    console.log(tracks)

    return (
        <Grid container direction="column">
            <Box p={2}>
                {tracks.map(track =>
                    <TrackItem
                        key={track._id}
                        track={track}
                    />
                )}
            </Box>
        </Grid>
    );
};
export default TrackList;
