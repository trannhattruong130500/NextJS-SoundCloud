'use client'
import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Alert, Button, Grid, MenuItem, Snackbar, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { useSession } from "next-auth/react"
import { sendRequest } from '@/utils/api';
import { useToast } from '@/utils/toast';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

function LinearWithValueLabel(props: IProps) {
    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={props.trackUpload.percent} />
        </Box>
    );
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function InputFileUpload(props: any) {
    const { setInfo, info } = props
    const { data: session } = useSession()

    const handleUpload = async (image: any) => {
        const formData = new FormData()
        formData.append('fileUpload', image)

        try {
            const res = await axios.post("http://localhost:8000/api/v1/files/upload", formData, {
                headers: {
                    Authorization: `Bearer ${session?.access_token}`,
                    'target_type': 'images',
                },
            })
            setInfo({
                ...info,
                imgUrl: res.data.data.fileName
            })
        } catch (error) {
            //@ts-ignore
            alert(error?.response?.data?.message)
        }
    }

    return (
        <Button
            onChange={(e) => {
                let file = e.target as HTMLInputElement
                if (file.files) {
                    handleUpload(file.files[0])
                }
            }}
            component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            Upload file
            <VisuallyHiddenInput type="file" />
        </Button>
    );
}

const category = [
    {
        value: 'CHILLS',
        label: 'CHILLS',
    },
    {
        value: 'WORKOUT',
        label: 'WORKOUT',
    },
    {
        value: 'PARTY',
        label: 'PARTY',
    },
];

interface IProps {
    trackUpload: {
        fileName: string,
        percent: number,
        uploadedTrackName: string
    },
    setValue: (v: number) => void
}

interface INewTracks {
    title: string,
    description: string,
    trackUrl: string,
    imgUrl: string,
    category: string,
}

const Step2 = (props: IProps) => {
    const toast = useToast();
    const { data: session } = useSession()
    // const [open, setOpen] = React.useState(false)
    const { trackUpload, setValue } = props;

    const [info, setInfo] = React.useState<INewTracks>({
        title: "",
        description: "",
        trackUrl: "",
        imgUrl: "",
        category: "",
    })

    React.useEffect(() => {
        if (trackUpload && trackUpload.uploadedTrackName) {
            setInfo({
                ...info,
                trackUrl: trackUpload.uploadedTrackName,
            })
        }
    }, [trackUpload])

    const handleSubmit = async () => {
        const res = await sendRequest<IBackendRes<ITrackTop[]>>({
            url: `http://localhost:8000/api/v1/tracks`,
            method: "POST",
            body: {
                title: info.title,
                description: info.description,
                trackUrl: info.trackUrl,
                imgUrl: info.imgUrl,
                category: info.category,
            },
            headers: {
                Authorization: `Bearer ${session?.access_token}`,
            },
        })
        if (res.data) {
            // setOpen(true)
            setValue(0);
            toast.success("Create success!!!")
        } else {
            toast.error(res.message)
        }
    }

    // const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    //     setOpen(false);
    // };

    return (
        <Box>
            <div>
                <div>
                    {trackUpload.fileName}
                </div>
                <LinearWithValueLabel trackUpload={trackUpload} setValue={setValue} />
            </div>

            <Grid container spacing={2} mt={5}>
                <Grid item xs={6} md={4}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "10px"
                    }}
                >
                    <div
                        style={{
                            height: 250, width: 250, background: "#ccc", overflow: "hidden",
                            display: "flex", alignItems: "center", justifyContent: "center"
                        }}>
                        {info.imgUrl &&
                            <img
                                style={{ objectFit: "cover", height: "100%", width: "100%", }}
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}images/${info.imgUrl}`}
                            />
                        }
                    </div>
                    <div >
                        <InputFileUpload
                            setInfo={setInfo}
                            info={info}
                        />
                    </div>

                </Grid>
                <Grid item xs={6} md={8}>
                    <TextField
                        value={info.title}
                        onChange={(event) => { setInfo({ ...info, title: event.target.value }) }}
                        label="Title" variant="standard" fullWidth margin="dense"
                    />
                    <TextField
                        value={info.description}
                        onChange={(event) => { setInfo({ ...info, description: event.target.value }) }}
                        label="Description" variant="standard" fullWidth margin="dense" />
                    <TextField
                        value={info.category}
                        onChange={(event) => { setInfo({ ...info, category: event.target.value }) }}
                        sx={{ mt: 3 }}
                        select
                        label="Category"
                        fullWidth
                        variant="standard"
                        defaultValue="EUR"
                    >
                        {category.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        variant="outlined" sx={{ mt: 5 }}
                        onClick={() => handleSubmit()}
                    >Save
                    </Button>
                </Grid>
            </Grid>

            {/* <Snackbar
                open={open} autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Submit Success!
                </Alert>
            </Snackbar> */}

            {/* <Box sx={{ width: '100%' }}>
                <Box>Progress upload your files</Box>
                <LinearProgressWithLabel value={progress} />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    gap: 5,
                    height: 400,
                    padding: '15px',
                }}>
                <Grid item xs={6} md={4} className='left'
                    sx={{
                        width: '30%',
                        display: "flex",
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '15px',
                        gap: 3,
                        paddingTop: '50px'
                    }}>
                    <Box
                        sx={{
                            boder: '1px solid red',
                            background: "#333",
                            display: "flex",
                            height: 250,
                            width: 250,
                        }}>
                    </Box>
                    <Box >
                        <InputFileUpload />
                    </Box>
                </Grid>
                <Grid item xs={6} md={8} className='right'
                    sx={{
                        width: '70%',
                        display: "flex",
                        flexDirection: 'column',
                        alignItems: "center",
                        gap: 3,
                        paddingTop: "50px"
                    }}>
                    <TextField label="Title" variant="standard" fullWidth />
                    <TextField label="Descriptions" variant="standard" fullWidth />
                    <TextField
                        label="Category"
                        variant="standard"
                        fullWidth
                        select
                        defaultValue="EUR"
                        helperText="Please select your currency"
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button variant="outlined">SAVE</Button>
                </Grid>
            </Box> */}
        </Box>

    )
}

export default Step2

