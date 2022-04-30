import React from 'react';
import './template2.css';
import { IoCall, IoLink, IoLocationSharp, IoLogoLinkedin, IoMailSharp } from "react-icons/io5";

export const HarvardTemplate = React.forwardRef(({profile, education, experience, achivements, interests, languages, skills}, ref) => {
  return (
    <div ref={ref} className="template2">
      <div className="profile-header">
        <div className="profile-header-wrapper">
            <img src={profile.profilePicUrl} className="thumbnail" alt="profile" />
            <p className="name">{profile.firstName+" "+profile.lastName}</p>
          <p className="dob">DOB: {profile.dob}</p>
          <p className="gender">Gender: {profile.gender}</p>
        </div>
      </div>
      <div className="template2-main">
        <div className="side-content">
          <div className="content-container">
            <div className="content-heading">
              <b className="heading-3">Contact info</b>
            </div>
            <div className="content-body">
            <p className="contact-items"><span><IoCall /></span> &nbsp;+91 {profile.contact}&nbsp;</p>
              <p className="contact-items"><span><IoMailSharp /></span> &nbsp; {profile.email}</p>
              <p className="contact-items"><span><IoLink /></span> &nbsp;<a href={profile.website}>{profile.website}</a></p>
              <p className="contact-items"><span><IoLogoLinkedin /></span> &nbsp;<a href={profile.linkedIn}>{profile.linkedIn}</a></p>
              <p className="contact-items"><span><IoLocationSharp /></span> &nbsp; {profile.city}, {profile.state}</p>
            </div>
          </div>
          <div className="content-container">
            <div className="content-heading">
              <b className="heading-3">My skills</b>
            </div>
            <div className="content-body">
              <ul>
                {
                  skills.length > 0? skills.map((e, i) => 
                    <li key={i}>{e}</li>
                  ):''
                }
              </ul>
            </div>
          </div>
          <div className="content-container">
            <div className="content-heading">
              <b className="heading-3">Languages</b>
            </div>
            <div className="content-body">
              {
                languages.length > 0? languages.map((e, i) => 
                <p key={i} className="contact-items">{e}</p>
                ):''
              }
            </div>
          </div>
          <div className="content-container">
            <div className="content-heading">
              <b className="heading-3">Interest</b>
            </div>
            <div className="content-body">
              <ul>
                {
                  interests.length > 0? interests.map((e, i) => 
                    <li key={i}>
                      {e}
                    </li>
                  ):''
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="main-content">
          <div className="content-container">
            <div className="content-heading">
              <b className="heading-3">About Me</b>
            </div>
            <div className="content-body">
              <p>
                {profile.aboutMe}
              </p>
            </div>
          </div>
          <div className="content-container">
            <div className="content-heading">
              <b className="heading-3">Experience</b>
            </div>
            <div className="content-body">
              {
                experience.length > 0? experience.map((e, i) => 
                  <div key={i}>
                      <p className="experience-name">{e.jobtitle} at {e.company} ({e.startdate.split("-")[0]}-{e.enddate? e.enddate.split("-")[0]:"Present"})</p>
                      <p className="description">
                      {e.description}
                      </p>
                  </div>
                ):''
              }
            </div>
          </div>
          <div className="content-container">
            <div className="content-heading">
              <b className="heading-3">Education</b>
            </div>
            <div className="content-body">
              {
                education.length > 0? education.map((e, i) => 
                  <div key={i}>
                    <p className="experience-name">{e.degree} ({e.startdate.split("-")[0]}-{e.enddate? e.enddate.split("-")[0]:"Present"})</p>
                      <p className="description">
                      {e.school}
                      </p>
                  </div>
                ):''
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});