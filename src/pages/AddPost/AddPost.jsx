/* eslint-disable default-case */
import { DateRange, EmojiEmotions, PersonAdd } from '@mui/icons-material';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Alert, Avatar, Box, Button, ButtonGroup, Fab, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import axios from 'axios';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { firebaseApp } from '../../firebase';
const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
});

export const AddPost = ({ users }) => {
    // const { register, handleSubmit, reset } = useForm();
    const [uploadState, setUploadState] = useState("initial");
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [image, setImage] = useState("");
    const [description, setDescroption] = useState('');
    const [title, setTitle] = useState('')
    const [file, setFile] = useState(null);
    const [media, setMedia] = useState("");
    const handleText = (e) => {
        setDescroption(e.target.value)
    }

    // const handleUploadClick = (event) => {
    //     var file = event.target.files[0];
    //     const reader = new FileReader();
    //     if (file) {
    //         reader.readAsDataURL(file);
    //         reader.onloadend = function (e) {
    //             setImage(reader.result);
    //             setUploadState("uploaded");
    //         };
    //     }
    // };

    // const handleResetClick = (event) => {
    //     setImage(null);
    //     setUploadState("initial");
    //     reset({ logo: null });
    // };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storage = getStorage(firebaseApp);
            const upload = () => {
                const name = new Date().getTime() + file.name;
                const storageRef = ref(storage, name);

                const uploadTask = uploadBytesResumable(storageRef, file);

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log("Upload is " + progress + "% done");
                        switch (snapshot.state) {
                            case "paused":
                                console.log("Upload is paused");
                                break;
                            case "running":
                                console.log("Upload is running");
                                break;
                        }
                    },
                    (error) => { console.log(error) },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setMedia(downloadURL);
                        });
                    }
                );
            };

            file && upload();
        }

    }, [file]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            title: `${users?.username} daily blog`,
            description: description,
            image: media,
            addedby: users?._id
        }
        try {
            const res = await axios.post('https://mern-media-server.vercel.app/post/create', formData)
            console.log(res)
            setMedia(null)
            setDescroption('')
            setSnackbarOpen(true)

        } catch (err) {
            console.log(err)
        }
    }
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackbarOpen(false);
      };
    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <Box
                    // width={400}
                    height={280}
                    bgcolor={"background.default"}
                    color={"text.primary"}
                    p={3}
                    borderRadius={5}
                >
                    <Typography variant="h6" color="gray" textAlign="center">
                        Create post
                    </Typography>
                    <UserBox>
                        <Avatar
                            // src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            src={users?.photo}
                            sx={{ width: 30, height: 30 }}
                        />
                        <Typography fontWeight={500} variant="span">
                            {users?.username}
                        </Typography>
                    </UserBox>
                    <TextField
                        sx={{ width: "100%" }}
                        id="standard-multiline-static"
                        multiline
                        rows={3}
                        // onBlur={handleText}
                        onChange={(e) => setDescroption(e.target.value)}
                        placeholder="What's on your mind?"
                        variant="standard"
                        value={description}
                    />
                    <Stack direction="row" gap={1} mt={2} mb={3}>
                        {/* <input
                        accept="image/jpeg,image/png,image/tiff,image/webp"
                        sx={{ display: "none" }}
                        id="contained-button-file"
                        name="logo"
                        ref={register({ required: true })}
                        type="file"
                        onChange={handleUploadClick}
                    />
                    <label
                        htmlFor="contained-button-file"
                        sx={{ display: uploadState === "uploaded" ? "none" : null }}
                    >
                        <Fab component="span" sx={{ color: blue[900], margin: '10px' }}>
                            <AddPhotoAlternateIcon />
                        </Fab>
                    </label> */}
                        {/* <Button
                        variant="contained"
                        component="label"
                    > */}
                        <Box>
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/tiff,image/webp"
                                style={{ display: "none" }}
                                id="contained-button-file"
                                name="logo"
                                // ref={register({ required: true })}
                                onChange={(e) => setFile(e.target.files[0])}

                            />
                            <label
                                htmlFor="contained-button-file"
                            // style={{ display: uploadState === "uploaded" ? "none" : null }}
                            >
                                <Fab component="span" sx={{ color: blue[900], }} size="small">
                                    <AddPhotoAlternateIcon />
                                </Fab>
                            </label>
                        </Box>

                        <Fab component="span" sx={{ color: blue[900], }} size="small">
                            <EmojiEmotions color="primary" />
                        </Fab>
                        <Fab component="span" sx={{ color: blue[900], }} size="small">
                            <PersonAdd color="primary" />
                        </Fab>
                        <Fab component="span" sx={{ color: blue[900], }} size="small">
                            <AddLocationIcon color="primary" />
                        </Fab>
                    </Stack>
                    <ButtonGroup
                        fullWidth
                        variant="contained"
                        aria-label="outlined primary button group"
                    >
                        <Button type='submit'>Post</Button>
                        <Button sx={{ width: "100px" }}>
                            <DateRange />
                        </Button>
                    </ButtonGroup>
                </Box>
            </form>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="danger" sx={{ width: '100%' }}>
                    your blog is posted
                </Alert>
            </Snackbar>
        </Box>
    )
}
