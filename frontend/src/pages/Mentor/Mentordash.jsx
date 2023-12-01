// Mentordash.jsx

import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, CardMedia, Container, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Mentordash = () => {
  const { mentorId: urlMentorId } = useParams();
  const [mentorId, setMentorId] = useState(null);
  const [mentorName, setMentorName] = useState('');
  const [mentorProjects, setMentorProjects] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

 
  useEffect(() => {
   

    const mentorId = localStorage.getItem("userid");
    console.log('Mentor ID from state:', mentorId);
    if (mentorId) {
      axios
        .get(`http://localhost:3000/mentordash/mentors?id=${mentorId}`, {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
          },
        })
        .then((response) => {
          const mentorData = response.data;
          console.log("responsedata:::",{mentorData})
          // Assuming you want to show only the first project, adjust accordingly
          // const firstProject = mentorData[0];
          setMentorName(mentorData.name);
          setMentorProjects(mentorData);
          
        })
        .catch((error) => {
          console.error('Error fetching mentor data:', error);
          
        });
    }
  }, [mentorId]);

  const handleCardClick = (projectId) => {
    navigate(`/submission/${projectId}`);
  };

  return (

    <div>
      {/* <Typography variant="h4">Welcome, {mentorName}!</Typography> */}
        <div>
          {mentorProjects.map((project) => (
            <Card key={project._id} onClick={() => handleCardClick(project._id)}>
              <CardContent>
                <Typography variant="h5">{project.title}</Typography>
                <Typography variant="body2">{project.description}</Typography>
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleCardClick(project._id)}
              >
                Go to Submission
              </Button>
            </Card>
          ))}
        </div>
      
    </div>
  );
};

export default Mentordash;