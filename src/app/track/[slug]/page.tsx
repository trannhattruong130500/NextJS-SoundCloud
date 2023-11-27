'use client'
import WaveTrack from '@/components/track/wave.track'
import { useSearchParams } from 'next/navigation'
import { Container } from '@mui/material'


const DetailTrackPage = (props: any) => {
    const searchParams = useSearchParams()
    searchParams.get('audio')

    return (
        <Container>
            detail track page
            <div>
                <WaveTrack />
            </div>
        </Container>
    )
}

export default DetailTrackPage