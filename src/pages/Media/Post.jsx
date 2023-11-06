/* eslint-disable default-case */
import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import DetailsIcon from '@mui/icons-material/Details';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Post({ item }) {
  const navigate = useNavigate();
  const [reaction, setReaction] = useState([])
  const users = localStorage.getItem('uid');
  const [checkedReaction, setCheckedReaction] = useState(false)
  useEffect(() => {
    const formData = {

      user: users,
    }
    axios.post('http://localhost:5000/reaction/getReactionById', formData).then((res) => {
      setReaction(res.data.response)
      console.log(res.data.response)
    }).catch((err) => console.log(err))
  }, [checkedReaction])

  const addReaction = async (data, postId) => {
    const formData = {
      post: postId,
      user: users,
      reaction: data
    }
    try {
      const res = await axios.post('http://localhost:5000/reaction/add', formData)
      console.log(res)
      setCheckedReaction((prev) => !prev)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Card sx={{ margin: 5 }} >
      <CardHeader
        avatar={
          <Avatar
            // src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            src={item.addedby?.photo}
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
        title={item.addedby?.username}
        subheader={item?.createdAt}
      />
      <CardMedia
        component="img"
        height="20%"
        image={item?.image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item?.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          {
            reaction.find(idx => idx.post === item?._id) ?
              <Checkbox
                icon={<FavoriteIcon sx={{ color: "red" }} />}

                checkedIcon={<Favorite sx={{ color: "red" }} />}
                onClick={() => addReaction(false, item?._id)}
              />
              :
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: "red" }} />}
                onClick={() => addReaction(true, item?._id)}
              />
          }
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
        <IconButton aria-label="details" onClick={() => navigate(`/post/${item?._id}`)}>
          <DetailsIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
