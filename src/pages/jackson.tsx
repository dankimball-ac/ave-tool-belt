import React from 'react'
import { Box, Typography, Container, Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'

const RoadRageAdventures = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Jackson Porter: Road Rage Chronicles
      </Typography>
      <Typography variant="h5" gutterBottom>
        An Unconventional Guide to Surviving Rush Hour
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1" paragraph>
          Jackson Porter's adventures began every weekday morning at
          precisely 7:45 AM, when he would leave his cozy suburban home and
          embark on the treacherous journey to the Avenue Consultant Taylorsville office. Little did
          Jackson know, the roads had their own plans for him.
        </Typography>
        <Typography variant="body1" paragraph>
          On one particularly memorable Tuesday, Jackson found himself caught in
          the mother of all traffic jams. Cars were lined up for miles, and the
          sound of honking horns filled the air. Jackson’s knuckles turned white
          as he gripped the steering wheel, his eyes narrowing at the
          audaciously slow driver in front of him. “How can anyone drive this
          slow and still be considered human?” he muttered to himself.
        </Typography>
        <Typography variant="body1" paragraph>
          As the minutes ticked by, Jackson’s frustration grew. He imagined
          himself as a hero in an action movie, leaping from car roof to car
          roof, clearing a path to freedom. But reality had other plans. Instead,
          he was stuck behind a minivan, the most dangrous drivers on the road, with a bumper sticker that read “Honk if
          you love unicorns.” Jackson honked, not out of love for mythical
          creatures, but out of sheer, unadulterated rage.
        </Typography>
        <Typography variant="body1" paragraph>
          Suddenly, a glimmer of hope appeared on the horizon. The traffic
          started to move. Jackson’s heart raced with excitement. Could it be?
          Could he finally escape this vehicular purgatory? But just as quickly
          as it started, the movement ceased. Jackson let out a primal scream
          that startled the elderly woman in the car next to him. She gave him a
          sympathetic smile and a thumbs up, which only fueled his fury.
        </Typography>
        <Typography variant="body1" paragraph>
          By the time Jackson finally reached his office, he was a changed man.
          His hair, once neatly combed, was now a disheveled mess. His shirt was
          soaked with sweat, and his eyes had a wild look to them. As he walked
          through the door, Morgan gave him a wide berth, having learned
          from past experiences to avoid Jackson during rush hour mornings.
        </Typography>
        <Typography variant="body1" paragraph>
          And so, Jackson Porter's road rage adventures continued, each day
          bringing a new chapter to his ever-growing saga of traffic-induced
          turmoil and trauma. 
        </Typography>
        <LoadingButton    variant="contained">
           Chapter 1: Minivan Mayhem
        </LoadingButton>
      </Box>
    </Container>
  )
}

export default RoadRageAdventures
