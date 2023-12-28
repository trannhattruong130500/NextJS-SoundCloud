'use client'
import { TrackContext, useTrackContext } from "@/lib/track.wrapper";
import useHasMounted from "@/utils/customHook";
import { AppBar, Container } from "@mui/material"
import { useRef } from "react";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AppFooter = () => {
    const hasMounted = useHasMounted()
    const playerRef = useRef(null)
    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;
    if (!hasMounted) return (<></>)
    if (playerRef?.current && currentTrack?.isPlaying === true) {
        //@ts-ignore
        playerRef?.current?.audio?.current?.play();
    } if (playerRef?.current && currentTrack?.isPlaying === false) {
        //@ts-ignore
        playerRef?.current?.audio?.current?.pause();
    }

    return (
        <div>
            <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, background: "#f2f2f2" }}>
                <Container sx={{ display: "flex", gap: 5, ".rhap_main": { gap: '30px' } }}>
                    <AudioPlayer
                        ref={playerRef}
                        layout="horizontal-reverse"
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}tracks/${currentTrack.trackUrl}`}
                        style={{
                            background: "#f2f2f2",
                            boxShadow: "unset"
                        }}
                        onPause={() => { setCurrentTrack({ ...currentTrack, isPlaying: false }) }}
                        onPlay={() => { setCurrentTrack({ ...currentTrack, isPlaying: true }) }}
                    />
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        minWidth: 200,
                        justifyContent: "center"
                    }}>
                        <div style={{ color: "#ccc" }}> {currentTrack.description}</div>
                        <div style={{ color: "black" }}> {currentTrack.title}</div>
                    </div>
                </Container>
            </AppBar>
        </div>
    )
}

export default AppFooter