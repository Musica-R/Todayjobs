import { useParams } from "react-router-dom";
import jobsData from "../data/jobsData";
import "../styles/JobDetails.css";

const JobDetails = () => {
  const { id } = useParams();
  const job = jobsData.find((job) => job.id === id);

  if (!job) return <h2 style={{ padding: "40px" }}>Job not found</h2>;

  return (
    <div className="job-details">
      {/* HEADER */}
      <div className="job-header">
        <div className="jh1">
          <div>
            <h2>{job.title}</h2>
            <p className="company">{job.company}</p>

            <div className="meta">
              <span>{job.salary}</span>
              <span>{job.location}</span>
              <span>{job.type}</span>
            </div>
          </div>
          <div>
            <img className="jh1img" src="/assets/logomp.png" alt="" />
          </div>
        </div>

        <div className="actions">
          <div className="job-extra">
            <p>
              Openings : <b>{job.openings}</b>
            </p>
            <p>
              Posted : <b>{job.posted}</b>
            </p>
          </div>
          <div className="je1">
            <button className="save-btn">Saved</button>
            <button className="apply-btn">Apply Now</button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="job-content">
        <h4>Description</h4>

        <h5>About Company</h5>
        <p>{job.description.aboutCompany}</p>

        <h5>Job Description</h5>
        <p>{job.description.jobDescription}</p>

        <h5>More Info</h5>
        <p>
          <b>Role :</b> {job.title}
        </p>
        <p>
          <b>Industry :</b> {job.industry}
        </p>
        <p>
          <b>Employee Type :</b> {job.type}
        </p>

        <h5>Education</h5>
        <p>UG : {job.education}</p>

        <h5>Required Skill Set</h5>
        <div className="skills">
          {job.skills.map((skill, i) => (
            <span key={i}>{skill}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
