import {TrackAction, TrackActionTypes} from "@/types/track";
import {Dispatch} from "react";
import axios from "axios";

export const fetchTracks = ()=>{
    return async (dispatch: Dispatch<TrackAction>) =>{
        try {
            const response = await axios.get('http://localhost:5000/tracks')
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
        } catch (e){
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: "Произошла ошибка при загрузке треков"
            })
        }
    }
}

export const searchTracks = (query: string)=>{
    return async (dispatch: Dispatch<TrackAction>) =>{
        try {
            const response = await axios.get('http://localhost:5000/tracks/search?query=' + query)
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
        } catch (e){
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: "Произошла ошибка при загрузке треков"
            })
        }
    }
}

export const deleteTrack = (id: string)=>{
    return async (dispatch: Dispatch<TrackAction>) =>{
        try {
            await axios.delete('http://localhost:5000/tracks/' + id);
            // @ts-ignore
            dispatch(fetchTracks())
        } catch (e){
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: "Произошла ошибка при загрузке треков"
            })
        }
    }
}

export const listensTrack = (id: string)=>{
    return async (dispatch: Dispatch<TrackAction>) =>{
        try {
            const response = await axios.post('http://localhost:5000/tracks/listen/' + id)
            // @ts-ignore
            dispatch({type: TrackActionTypes.UPDATE_TRACK_LISTENS, payload: {_id: id}})
        } catch (e){
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: "Произошла ошибка при загрузке треков"
            })
        }
    }
}
