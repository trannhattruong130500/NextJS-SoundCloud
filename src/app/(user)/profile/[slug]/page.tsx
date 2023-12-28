import ProfileTracks from "@/components/header/profile.track";
import { sendRequest } from "@/utils/api";
import { Container, Grid } from "@mui/material";


const ProfilePage = async ({ params }: { params: { slug: string } }) => {

    const tracks = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
        url: `http://localhost:8000/api/v1/tracks/users?current=1&pageSize=10`,
        method: "POST",
        body: { id: params.slug }
    })
    const d = tracks?.data?.result ?? [];

    return (
        <Container sx={{ my: 5 }}>
            <Grid container gap={3}>
                {d.map((item: ITrackTop, index: number) => {
                    return (
                        <Grid item xs={12} md={5.8} key={index}>
                            <ProfileTracks data={item} />
                        </Grid>
                    )
                })}
            </Grid>

        </Container>
    )
}

export default ProfilePage;