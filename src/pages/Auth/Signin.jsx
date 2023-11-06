import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Checkbox, Fab, FormControlLabel, Grid, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import "firebase/auth";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { firebaseApp } from '../../firebase';
const paperStyle = { padding: 20, width: 350, margin: "0 auto" }
const avatarStyle = { backgroundColor: '#1bbd7e' }
const btnstyle = { margin: '8px 0' }
const auth = getAuth(firebaseApp)
const provider = new GoogleAuthProvider();
export const Signin = () => {
    const navigate = useNavigate()
    const { control, handleSubmit } = useForm({})
    const onSubmit = (data) => {
        console.log(data)
        if (data.Username !== undefined) {
            handleUserSignUp(data)
        }
        else {
            handleSignIn(data)
        }
    }
    const [isSignedup, setIsSignedUp] = useState(false);

    const handleUserSignUp = (data) => {
        // const user = {
        //     email: '',
        //     password: ''
        // }
        console.log(data)
        createUserWithEmailAndPassword(auth, data.Email, data.Password).then((userCredential) => {
            // User signed in.
            const user = userCredential.user;
            const paramsData = {
                username: data.Username,
                email: data.Email,
                phone: "",
                photo: '',
                userId: user.uid
            }
            updateUserToDB(paramsData)
            // console.log('User signed in:', user);

        })
            .catch((error) => {
                // Handle errors here.
                console.error('Error signing in:', error);
            });
    };
    const handleSignIn = (data) => {

        signInWithEmailAndPassword(auth, data.Email, data.Password).then((userCredential) => {
            // User signed in.
            const user = userCredential.user;
            getUsers(user)
            // console.log('User signed in:', user);
        })
            .catch((error) => {
                // Handle errors here.
                console.error('Error signing in:', error);
            });
    };
    
    const googleHandler = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                const userData = {
                    username: result.user.displayName,
                    email: result.user.email,
                    phone: "",
                    photo: result.user.photoURL,
                    userId: result.user.uid
                }
                // console.log(result)
                updateUserToDB(userData)
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
    const updateUserToDB = async (data) => {
        
        // console.log(requiredData)
        try {
            const saveUser = await axios.post('http://localhost:5000/auth/saveUser', data)
            console.log(saveUser)
            localStorage.setItem('uid', saveUser.data?._id)
            navigate('/')
        } catch (err) {
            console.log(err)
        }

    }
    const getUsers = async (data) => {

        try {
            const saveUser = await axios.get(`http://localhost:5000/auth/checkedUser/${data.uid}`)
            console.log(saveUser)
            localStorage.setItem('uid', saveUser.data?._id)
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    };
    return (

        <Grid container spacing={2} sx={{ padding: '20px 0', margin: '10px', overflowY: "hidden !important" }}>
            <Grid item xs={7}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Paper elevation={10} style={paperStyle}>
                        <Grid align='center'>
                            <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                            <h2> {isSignedup ? 'Sign Up' : 'Sign In'} </h2>
                        </Grid>
                        {
                            isSignedup &&
                            <Box sx={{ padding: "10px 5px" }}>
                                <Controller
                                    name="Username"
                                    control={control}
                                    render={({ field }) => <TextField {...field} label='Username' placeholder='Enter username' variant="outlined" fullWidth required />}
                                />

                            </Box>
                        }
                        <Box sx={{ padding: "10px 5px" }}>
                            <Controller
                                name="Email"
                                control={control}
                                render={({ field }) => <TextField {...field} label='Email' placeholder='Enter email' variant="outlined" fullWidth required />}
                            />
                        </Box>
                        <Box sx={{ padding: "10px 5px" }}>

                            <Controller
                                name="Password"
                                control={control}
                                render={({ field }) => <TextField {...field} label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required />}
                            />
                        </Box>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="Remember me"
                        />
                        <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                        <Typography>
                            <Link href="#" >
                                Forgot password ?
                            </Link>
                        </Typography>
                        <Typography >  {isSignedup ? 'Do you have an account ?' : 'create an account ?'}
                            <Link href="#" onClick={() => setIsSignedUp(!isSignedup)}>
                                {isSignedup ? 'Sign In' : 'Sign Up'}
                            </Link>
                        </Typography>
                    </Paper>
                </form>
            </Grid>
            <Grid item xs={5} sx={{ borderLeft: '1px solid' }}>
                <Box sx={{ display: "flex", justifyContent: 'center', alignItems: 'center', marginTop: '40%' }}>
                    <Fab component="span" sx={{ color: '#edbf07' }} size="large">
                        <GoogleIcon onClick={googleHandler} color='#edbf07' fontSize='large' />
                    </Fab>
                    <Box sx={{ padding: "0 20px" }}>
                        <Fab component="span" sx={{ color: '#151ceb' }} size="large">
                            <FacebookIcon color='#151ceb' fontSize='large' />
                        </Fab>
                    </Box>
                    <Fab component="span" sx={{ color: '#9596ad' }} size="large">
                        <GitHubIcon color='#9596ad' fontSize='large' />
                    </Fab>
                </Box>
            </Grid>

        </Grid>
    )
}