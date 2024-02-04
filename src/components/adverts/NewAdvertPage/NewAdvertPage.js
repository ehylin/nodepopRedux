import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { createAdvert } from '../service';
import NewAdvertForm from './NewAdvertForm';


function NewAdvertPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  // const handleSubmit = newAdvert => {
  //   execute(newAdvert).then(({ id }) => navigate(`/adverts/${id}`));
  // };

  const handleSubmit = newAdvert => {
 
    dispatch(createAdvert(newAdvert)).then(({ id }) => navigate(`/adverts/${id}`));
  };

  return <NewAdvertForm onSubmit={handleSubmit} />;
}

export default NewAdvertPage;
