import { Avatar, Box, Button, Grid, Stack, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const Comment = ({ postId }) => {
    const [commentText, setCommentText] = useState('')
    const users = localStorage.getItem('uid');
    const [comments, setComments] = useState([])
    const [ check, setCheck] = useState(false)
    const addComment = async () => {
        const formData = {
            post: postId,
            user: users,
            commentText: commentText
        }
        try {
            const res = await axios.post('http://localhost:5000/comment/add', formData)
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        const formData = {
            post: postId,
            user: users,
        }
        axios.post('http://localhost:5000/comment/getCommentbyUser', formData).then((res) => {
            setComments(res.data.response)
            // console.log(res.data)
            setCheck(!check)
        }).catch((err) => console.log(err))
    }, [])
    return (
        <Box>
            <h1>Comments</h1>
            {
                comments?.map((item, index) => {
                    return (
                        <Box sx={{padding: '10px 0'}}>
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item>
                                    <Avatar alt="Remy Sharp" src={item.user?.photo} />
                                </Grid>
                                <Grid justifyContent="left" item xs zeroMinWidth>
                                    <h4 style={{ margin: 0, textAlign: "left" }}>{item?.user?.username}</h4>
                                    <p style={{ textAlign: "left" }}>
                                        {item?.commentText}
                                    </p>
                                    <p style={{ textAlign: "left", color: "gray" }}>
                                        {item?.createdAt}
                                    </p>
                                </Grid>
                            </Grid>
                        </Box>
                    )
                })
            }

            <Box sx={{ position: 'fixed', bottom: '0', width: '500px', backgroundColor: 'common.white' }}>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent='center'>
                    <TextField
                        sx={{ p: "20px 0" }}
                        multiline
                        fullWidth
                        minRows={1}
                        id="outlined-multilined"
                        placeholder={'write your comment here'}
                        value={commentText}
                        onChange={(e) => {
                            setCommentText(e.target.value);
                        }}
                    />
                    <Button
                        size="large"
                        sx={{
                            bgcolor: "#333996",
                            color: "#f4f5fd",
                            p: "8px 25px",
                            "&:hover": {
                                bgcolor: "#3c44b126",
                            },
                        }}
                        onClick={(e) => {
                            !commentText.trim() ? e.preventDefault() : addComment(commentText.trim());
                            setCommentText("");
                        }}
                    >
                        Send
                    </Button>
                </Stack>

            </Box>
        </Box>
    )
}
