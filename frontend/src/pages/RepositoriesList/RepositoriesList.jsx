import React from 'react';
import { useParams } from 'react-router-dom';
import Grid from '../../components/Grid/Grid';
import "./RepositoriesList.css"

const RepositoriesList = () => {
  const { username } = useParams();

  return (
    <div className='repoList'>
      <Grid repoList={true} username={username}/>
    </div>
  );
}

export default RepositoriesList;
