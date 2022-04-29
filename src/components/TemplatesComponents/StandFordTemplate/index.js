import React, {useEffect} from 'react';
import './App.css';
import logo from './profile.png';
import { IoCall, IoLink, IoLocationSharp, IoLogoLinkedin, IoMailSharp } from "react-icons/io5";

export const StandForTemplate = React.forwardRef(({profile, education, experience, achivements, interests, languages, skills}, ref) => {
  useEffect(() => {
    skills.length > 0? skills.map((item, idx) => {
      console.log(item)
    }):console.log(1)
  })
  return (
    <div ref={ref} className="print">
      <div className="template1">
        <div className="side-content">
          <div className="profile">
            <img src={profile.profilePicUrl} className="thumbnail" alt="profile" />
            <p className="name">{profile.firstName+" "+profile.lastName}</p>
          </div>
          <div>

          <hr />
          </div>
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
              <b className="heading-3">Education</b>
            </div>
            <div className="content-body">
              {
                education.length > 0? education.map((e, i) => 
                  <div key={i}>
                    <div className="education-wrapper" key={i}>
                      <p className="period">{e.startdate.split("-")[0]}-{e.enddate? e.enddate.split("-")[0]:"Present"}</p>
                      <p className="degree">{e.degree}</p>
                      <p className="university">{e.school}</p>
                    </div>
                  </div>
                ):''
              }
            </div>
          </div>
          <div className="content-container">
            <div className="content-heading">
              <b className="heading-3">Languages</b>
            </div>
            <div className="content-body">
              {
                languages.length > 0? languages.map((e, i) => 
                <p key={i} className="language-items">{e}</p>
                ):''
              }
            </div>
          </div>
        </div>
        <div className="main-content">
          <div className="content-container">
            <div className="content-heading">
              <b className="heading-3">Profile</b>
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
              <table>
                <tbody>
                  {
                    experience.length > 0? experience.map((e, i) => 
                      <tr key={i}>
                        <td className="period-wrapper">
                          <p className="period">{e.startdate.split("-")[0]}-{e.enddate? e.enddate.split("-")[0]:"Present"}</p>
                          <p className="companyName">{e.company}</p>
                        </td>
                        <td className="position-wrapper">
                          <p className="position"><b>{e.jobtitle}</b></p>
                          <p className="description">
                            {e.description}
                          </p>
                        </td>
                      </tr>
                    ):''
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className="content-container">
            <div className="content-heading">
              <b className="heading-3">Professional skills</b>
            </div>
            <div className="content-body">
              <div className="skill-wrapper">
              <p>
                {
                  skills.length > 0? skills.map((e, i) => 
                    <span key={i}>
                      {e}, &nbsp;
                    </span>
                  ):''
                }
              </p>
              </div>
            </div>
          </div>
          <div className="content-container">
            <div className="content-heading">
              <b className="heading-3">Interest</b>
            </div>
            <div className="content-body">
              <div className="skill-wrapper">
                {
                  interests.length > 0? interests.map((e, i) => 
                    <div key={i}>
                      <p>{e}</p>
                    </div>
                  ):''
                }
              </div>
            </div>
          </div>
          <div className="content-container">
            <div className="content-heading">
              <b className="heading-3">Achivements</b>
            </div>
            <div className="content-body">
              {
                achivements.length > 0? achivements.map((e, i) =>
                  <div key={i} className="achivement-wrapper">
                    <p><b>{e.achivementTitle}</b></p>
                    <p>
                      {e.description}
                    </p>
                  </div>
                ):''
              }
            </div>
          </div>
        </div>
      </div>
      <div className="page-break"></div>
    </div>
  );
});