import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import "./RepoDescription.css"

const RepoDescription = () => {

  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  return (
    <>
        <button className="back" onClick={() => navigate(-1)}>Back</button>
      <div className='repoDescription'>
        {/* <Link className='back' to={`/repolist/${state.owner.login}`}>Back</Link> */}
        <div className='left'>
          <img src={state.owner.avatar_url} alt="" />
          <h4>✅ Verified by GitHub</h4>
          <p>GitHug confirms that this app meets <br /> the <span style={{ color: "blue" }}> descriptions for verification</span></p>
          <br />

          <p>Catagories</p>
          <div className='catagories'>
            <p>Code Review</p>
            <p>IDEs</p>
            <p>Free</p>
            <p>Paid</p>
          </div>
        </div>

        <div className='right'>
          <h3 className='application'>Application</h3>
          <h1>{state.name}</h1>
          <button>Setup Plan</button>
          <p><span style={{ color: "blue" }}>{state.name}</span> is an online IDE for github</p>
          <p>{state.description}</p>
        </div>
      </div>
    </>
  )
}

export default RepoDescription