import { Box, Stack } from '@mui/material'
import React from 'react'
import { Header } from './../components/Header/Header'
import { Media } from './Media/Media'
import { Rightbar } from './Rightbar/Rightbar'
import Sidebar from './sidebar/sidebar'
export const Home = () => {
  return (
    <Box bgcolor={"background.default"} color={"text.primary"}>
      <Header />
      <Stack direction={"row"} spacing={2} justifyContent="space-between">
        <Sidebar />
        <Media />
        <Rightbar />
      </Stack>
      {/* <Add /> */}
    </Box>
  )
}
