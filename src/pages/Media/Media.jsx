import { Box, Skeleton, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AddPost } from "../AddPost/AddPost";
import Post from "./Post";

export const Media = () => {
    const [loading, setLoading] = useState(true);
    const [posts, setPost] = useState([])
    const users = localStorage.getItem('items') && JSON.parse(localStorage.getItem('items'))

    useEffect(() => {
        axios.get('http://localhost:5000/post').then((res) => {
            setPost(res.data.posts);
            console.log(res.data.posts)
            setLoading(false)
        })
    }, [])
    return (
        <Box flex={4} p={{ xs: 0, md: 2 }}>
            {loading ? (
                <Stack spacing={1}>
                    <Skeleton variant="text" height={100} />
                    <Skeleton variant="text" height={20} />
                    <Skeleton variant="text" height={20} />
                    <Skeleton variant="rectangular" height={300} />
                </Stack>
            ) : (
                <>
                    <AddPost users={users} />
                    {
                        posts?.map((item => {
                            return (
                                <Post item={item}/>
                            )
                        }))
                    }

                    {/* <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post /> */}
                </>
            )}
        </Box>
    );
};
