'use client'
import useHasMounted from "@/utils/customHook";
import { AppBar, Container } from "@mui/material"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AppFooter = () => {
    const hasMounted = useHasMounted()
    if (!hasMounted) return (<></>)

    return (
        <div>
            <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, background: "#f2f2f2" }}>
                <Container sx={{ display: "flex", gap: 10 }}>
                    <AudioPlayer
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/hoidanit.mp3`}
                        onPlay={e => console.log("onPlay")}
                        style={{
                            background: "#f2f2f2",
                            boxShadow: "unset"
                        }}
                    />
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        minWidth: 100,
                        justifyContent: "center"
                    }}>
                        <div style={{ color: "#ccc" }}> Eric</div>
                        <div style={{ color: "black" }}> Who am i?</div>
                    </div>
                </Container>
            </AppBar>
        </div>
    )
}

export default AppFooter