import { Favorite, FavoriteBorder, MoreVert, Share } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, Container, Grid, IconButton, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Comment } from './Comment';
const SinglePost = () => {
  const { postId } = useParams();
  // console.log(postId)
  const [post, setPost] = useState({});
  const [reaction, setReaction] = useState([])
  const users = localStorage.getItem('uid');
  const [loader, setLoader] = useState(true);
  const [checkedReaction, setCheckedReaction] = useState(false)
  useEffect(() => {
    axios.get(`https://mern-media-server.vercel.app/post/${postId}`).then((res) => {
      setPost(res.data.post)
      setLoader(false)
    })
  }, [])

  useEffect(() => {
    const formData = {
      user: users,
    }
    axios.post('https://mern-media-server.vercel.app/reaction/getReactionById', formData).then((res) => {
      setReaction(res.data.response)
      console.log(res.data.response)
    }).catch((err) => console.log(err))
  }, [checkedReaction])

  const addReaction = async (data) => {
    const formData = {
      post: postId,
      user: users,
      reactionType: data
    }
    try {
      const res = await axios.post('https://mern-media-server.vercel.app/reaction/add', formData)
      console.log(res)
      setCheckedReaction((prev) => !prev)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      {
        loader ? <h1>Loading....</h1> : <Box bgcolor={"background.default"} color={"text.primary"}>
          <Header />
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={7}>
                <Card sx={{ margin: 5 }}>

                  <CardMedia
                    component="img"
                    height="20%"
                    image={post?.image}
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {post?.description}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      {
                        reaction.find(idx => idx.post === postId) ?
                          <Checkbox
                            icon={<FavoriteIcon sx={{ color: "red" }} />}

                            checkedIcon={<Favorite sx={{ color: "red" }} />}
                            onClick={() => addReaction(false)}
                          />
                          :
                          <Checkbox
                            icon={<FavoriteBorder />}
                            checkedIcon={<Favorite sx={{ color: "red" }} />}
                            onClick={() => addReaction(true)}
                          />
                      }

                    </IconButton>
                    <IconButton aria-label="share">
                      <Share />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={5}>
                <Card sx={{ margin: '30px 0 10px 0', padding: "4px 0 4px 0" }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        // src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        src={post?.addedby?.photo}
                        sx={{ width: 30, height: 30 }}
                      />
                      // <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                      //   R
                      // </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVert />
                      </IconButton>
                    }
                    title={post?.addedby?.username}
                    subheader={post?.createdAt}
                  />
                </Card>
                <Comment postId={postId} />
              </Grid>
            </Grid>
          </Container>
        </Box>

      }
    </>

  )
}

export default SinglePost