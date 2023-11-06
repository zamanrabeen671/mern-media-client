import {
  Avatar,
  Box,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from "@mui/material";
import axios from 'axios';
import React, { useEffect, useState } from "react";
export const Rightbar = () => {
  const [post, setPost] = useState([]);
  const [contributor, setContributor] = useState([])
  useEffect(() => {
    axios.get('https://mern-media-server.vercel.app/post/topPost').then((res) => setPost(res.data.post)).catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    axios.get('https://mern-media-server.vercel.app/post/topContributor').then((res) => setContributor(res.data.users)).catch((err) => console.log(err))
  }, [])
  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed" width={300}>
        <Typography variant="h6" fontWeight={100}>
          Top Contributors
        </Typography>
        <List sx={{ bgcolor: 'background.paper' }}>
          {
            contributor.map((item, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar src={item.photo}
                    sx={{ width: 30, height: 30 }} />
                </ListItemAvatar>
                <ListItemText primary={item?.username} secondary={`status - ${item.status}`} />
              </ListItem>
            ))
          }

          {/* <ListItem>
            <ListItemAvatar>
              <Avatar>
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Work" secondary="Jan 7, 2014" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <BeachAccessIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Vacation" secondary="July 20, 2014" />
          </ListItem> */}
        </List>
        <Typography variant="h6" fontWeight={100} mt={2} mb={2}>
          Latest Photos
        </Typography>
        <ImageList cols={3} rowHeight={100} gap={5} >
          {
            post.map((item, index) => (
              <ImageListItem key={item._id}>
                <img
                  src={item.image}
                  alt=""
                />
              </ImageListItem>
            ))
          }
        </ImageList>

      </Box>
    </Box>
  );
};
