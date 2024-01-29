import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Grid from '../../components/Grid/Grid';
import { useNavigate } from "react-router-dom";
import "./RepositoriesList.css"

const RepositoriesList = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  return (
    <div className='repoList'>
      {/* <Link className='back' to={"/"}>Back</Link> */}
      <button className="back" onClick={() => navigate(-1)}>Back</button>
      <Grid repoList={true} username={username} />
    </div>
  );
}

export default RepositoriesList;
