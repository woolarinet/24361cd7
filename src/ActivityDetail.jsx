import React, {useCallback, useEffect, useState} from 'react';
import {Card, CardContent, Typography, Button, Grid, CircularProgress} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './css/activityDetail.css';
import {useParams} from "react-router-dom";
import {http} from "./utils/http";
import {useInternalRouter} from "./hooks/useinternalRouter";

const DetailItem = ({ label, value }) => (
    <>
      <Grid item xs={6}>
        <Typography className="detail-label">{label}:</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography className="detail-value">{value}</Typography>
      </Grid>
    </>
);

const ActivityDetailContent = ({ activityDetail, router }) => {
  const details = [
    { label: 'From', value: activityDetail.from },
    { label: 'To', value: activityDetail.to },
    { label: 'Direction', value: activityDetail.direction },
    { label: 'Duration', value: `${activityDetail.duration} seconds` },
    { label: 'Call Type', value: activityDetail.call_type },
    { label: 'Via', value: activityDetail.via },
    { label: 'Created At', value: new Date(activityDetail.created_at).toLocaleString() },
  ];

  return (
      <Card className="activity-detail">
        <CardContent>
          <Button
              variant="contained"
              color="primary"
              startIcon={<ArrowBackIcon />}
              onClick={() => router.goBack()}
              className="back-button"
          >
            Back
          </Button>
          <Typography variant="h5" component="div" className="detail-title">
            Call Details
          </Typography>
          <Grid container spacing={2} className="detail-grid">
            {details.map((detail, index) => (
                <DetailItem key={index} label={detail.label} value={detail.value} />
            ))}
          </Grid>
        </CardContent>
      </Card>
  );
};

const ActivityDetail = () => {
  const router = useInternalRouter();
  const [activityDetail, setActivityDetail] = useState(null);
  const { id } = useParams();

  const loadDetailInfo = useCallback(async () => {
    http.get(`/activities/${id}`)
        .then(response => setActivityDetail(response))
        .catch(error => console.error('Error fetching call details:', error));
  }, [id]);

  useEffect(() => {
    loadDetailInfo();
  }, [loadDetailInfo]);

  return activityDetail ? <ActivityDetailContent activityDetail={activityDetail} router={router} /> :
      <div style={{display:'flex',height: '100vh', alignItems:'center', justifyContent:'center'}}>
        <CircularProgress/>
      </div>;
};

export default ActivityDetail;