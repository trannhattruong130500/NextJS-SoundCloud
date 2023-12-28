import MainSlider from '@/components/main/main.slider';
import { Container } from '@mui/material';
import * as React from 'react';
import { sendRequest } from '@/utils/api';
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  const chills = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `http://localhost:8000/api/v1/tracks/top`,
    method: "POST",
    body: { category: "CHILL", limit: 10 }
  })
  const workouts = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `http://localhost:8000/api/v1/tracks/top`,
    method: "POST",
    body: { category: "WORKOUT", limit: 10 }
  })
  const party = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `http://localhost:8000/api/v1/tracks/top`,
    method: "POST",
    body: { category: "PARTY", limit: 10 }
  })

  return (
    <div>
      <Container sx={{ marginBottom: "130px" }}>
        <MainSlider
          data={chills?.data ?? []}
          title='Top Chills' />
        <MainSlider
          data={workouts?.data ?? []}
          title='Top Workouts' />
        <MainSlider
          data={party?.data ?? []}
          title='Top Party' />
      </Container>
    </div>
  );
}
