'use client'
import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Paper, Typography, IconButton, InputAdornment, Grid } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/navigation';


const AuthSignIn = (props: any) => {
    const router = useRouter();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isErrorUsername, setIsErrorUsername] = useState<boolean>(false);
    const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);

    const [errorUsername, setErrorUsername] = useState<string>("");
    const [errorPassword, setErrorPassword] = useState<string>("");

    const [openMessage, setOpenMessage] = useState<boolean>(false);
    const [resMessage, setResMessage] = useState<string>("");

    const handleLogin = async () => {
        setIsErrorPassword(false)
        setIsErrorUsername(false)
        setErrorUsername("")
        setErrorPassword("")
        if (!username) {
            setIsErrorUsername(true)
            setErrorUsername("Username is not empty!")
            return;
        }
        if (!password) {
            setIsErrorPassword(true)
            setErrorPassword("Password is not empty!")
            return;
        }
        const res = await signIn("credentials", {
            username: username,
            password: password,
            redirect: false
        })
        if (!res?.error) {
            router.push('/')
        }
        if (res?.error) {
            setOpenMessage(true)
            setResMessage(res.error)
        }
    };
    return (
        <Box>
            <Grid container
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh"
                }}
            >
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    lg={4}
                    sx={{
                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", paddingTop: "50px", paddingBottom: "50px"
                    }}
                >
                    <Box style={{ margin: "20px" }}>
                        <Link href={"/"} style={{ left: "0" }}><ArrowBackIcon /></Link>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            width: "100%"
                        }}>

                            <Avatar sx={{ marginBottom: "10px" }}>
                                <LockIcon />
                            </Avatar>

                            <Typography component="h1">
                                Sign in
                            </Typography>
                        </Box>

                        <TextField
                            onChange={(event) => setUsername(event.target.value)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            name="username"
                            autoFocus
                            error={isErrorUsername}
                            helperText={errorUsername}
                        />
                        <TextField
                            onChange={(event) => setPassword(event.target.value)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            error={isErrorPassword}
                            helperText={errorPassword}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleLogin()
                                }
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword === false ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>,
                            }}
                        />
                        <Button
                            sx={{
                                my: 3
                            }}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleLogin}
                        >
                            Sign In
                        </Button>
                        <Divider>Sign in with</Divider>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "25px",
                                mt: 3
                            }}
                        >
                            <Avatar
                                sx={{
                                    cursor: "pointer",
                                    bgcolor: "orange"
                                }}
                                onClick={() => { signIn("github") }}
                            >
                                <GitHubIcon titleAccess="Login with Github" />
                            </Avatar>

                            <Avatar
                                sx={{
                                    cursor: "pointer",
                                    bgcolor: "orange"
                                }}
                            >
                                < GoogleIcon titleAccess="Login with Google" />
                            </Avatar>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={openMessage}>
                <Alert severity="error" sx={{ width: '100%' }} onClose={() => setOpenMessage(false)}>
                    {resMessage}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default AuthSignIn;