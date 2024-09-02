import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography, CardHeader } from "@mui/material";
import { format } from 'date-fns';

const MediaDisplay = (props) => {
  const { userData } = props;

  const alterType = (type) => {
    if (type=='Video') {
      return 'video'
    } else {
      return 'img'
    }
  };  

  return (
    <Grid container spacing={1} justifyContent="center">
      {
        userData?.map((item, index) => (
          <Grid item xs={12} sm={4}>
            <Card sx={{ maxWidth: 600, margin: "auto" }}>
              <CardHeader
                title={item?.ownerFullName}
                subheader={format(new Date(item?.timestamp), "MMM dd, yyyy")}
              />
              <CardMedia
                component={alterType(item.type)}
                controls
                height="300"
                src={item?.videoUrl ?? item?.displayUrl}
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    URL: {item?.url}
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" color="text.secondary">
                      👍 {item?.likesCount}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" color="text.secondary">
                      💬 {item?.commentsCount}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" color="text.secondary">
                      👁️ {item?.videoPlayCount ?? '-'}
                    </Typography>
                  </Grid>
                  {/* <Grid item xs={12}>
                    <Typography sx={{ marginBottom: 2 }}>Caption:</Typography>
                    <Typography sx={{ marginBottom: 2 }}>
                      {item?.caption}
                    </Typography>
                  </Grid> */}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

        ))
      }

      <Grid item xs={12} sm={3}>
        <Card sx={{ maxWidth: 600, margin: "auto" }}>
          <CardHeader
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
          <CardMedia
            component="img"
            height="300"
            controls
            src="https://fastly.picsum.photos/id/397/536/354.jpg?hmac=8UQkZUmuPJ4LkdA-5RTxg-Uuv3L5J-eAssr2Sbed1Xc"
            alt="Video 1"
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  👍 {12}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  👁️ {2}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  💬 {3}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MediaDisplay;
