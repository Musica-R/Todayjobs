import { useEffect, useState } from "react";
import "../styles/Jobs.css";
import jobsData from "../data/jobsData";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const [activeTab, setActiveTab] = useState("recommended");
  const [savedJobs, setSavedJobs] = useState([]);
  const navigate = useNavigate();

  /* LOAD SAVED JOBS */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(stored);
  }, []);

  /* SAVE / UNSAVE */
  const toggleSave = (job) => {
    let updated;

    if (savedJobs.find((j) => j.id === job.id)) {
      updated = savedJobs.filter((j) => j.id !== job.id);
    } else {
      updated = [...savedJobs, job];
    }

    setSavedJobs(updated);
    localStorage.setItem("savedJobs", JSON.stringify(updated));
  };

  const isSaved = (id) => savedJobs.some((job) => job.id === id);

  const displayedJobs =
    activeTab === "recommended" ? jobsData : savedJobs;

  return (
    <div className="jobs-pagejd">
      {/* SEARCH HEADER */}
      <div className="jobs-herojd">
        <h1>
          Find your Perfect <span>Job</span>
        </h1>
        <p>
          Connect with top Companies and discover opportunities that match your
          skills and aspirations.
        </p>

        <div className="search-box">
          <div className="input-group">
            <img className="icon" src="/assets/ri_search-line.png" alt="" />
            <input
              type="text"
              placeholder="Job Title, Keywords, or Company"
            />
          </div>

          <div className="input-group">
            <img className="icon" src="/assets/Frame (6).png" alt="" />
            <input
              type="text"
              placeholder="Location"
            />
          </div>

          <div className="input-group">
            <img className="icon" src="/assets/Frame (7).png" alt="" />
            <select>
              <option>Job Type</option>
              <option>Full-time</option>
              <option>Part-time</option>
            </select>
          </div>

          <button className="search-btn">Search Jobs</button>
        </div>
      </div>

      {/* TABS */}
      <div className="tabs">
        <button
          className={activeTab === "recommended" ? "active" : ""}
          onClick={() => setActiveTab("recommended")}
        >
          Recommended Jobs
        </button>
        <button
          className={activeTab === "saved" ? "active" : ""}
          onClick={() => setActiveTab("saved")}
        >
          Saved Jobs
        </button>
      </div>

      {/* JOB LIST */}
      <div className="jobs-gridjd">
        {displayedJobs.length === 0 ? (
          <p className="emptyjd">No jobs found</p>
        ) : (
          displayedJobs.map((job) => (
            <div className="job-card" jd key={job.id}>
              <div className="job-cardimgsec">
                <img className="cardimgsec" src="/assets/logomp.png" alt="" />
                <h4>{job.title}</h4>
                {/* SAVE ICON */}
                <div
                  className={`savejd ${isSaved(job.id) ? "saved" : ""}`}
                  onClick={() => toggleSave(job)}
                >
                  <img src="/assets/sawed.png" className="saveit" alt="" />
                </div>
              </div>
              <p className="companyjd">{job.company}</p>

              <div className="job-info">
                <span> <img src="/assets/Frame.png" alt="" /> {job.salary}</span>
                <span> <img src="/assets/Frame (1).png" alt="" /> {job.location}</span>
                <span> <img src="/assets/Frame (2).png" alt="" /> {job.type}</span>
              </div>

              <div className="skillsjd">
                {job.skills.map((skill, i) => (
                  <span key={i}>{skill}</span>
                ))}
              </div>

              <div className="card-footerjd">
                <span className="posted" jd>{job.posted}</span>
                <button
                  onClick={() => navigate(`/jobsdetails/${job.id}`)}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Jobs;
