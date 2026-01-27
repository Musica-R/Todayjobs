import { useEffect, useState } from "react";
import "../styles/Jobs.css";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const [activeTab, setActiveTab] = useState("recommended");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* FETCH JOBS */
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("https://jobs.mpdatahub.com/api/job/list");
        const json = await res.json();

        if (json.status) {
          setJobs(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  /* SAVE / UNSAVE USING API */
  const toggleSave = async (job) => {
    try {
      const success = await fetch(
        "https://jobs.mpdatahub.com/api/job-save-status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: job.id,
            is_saved: job.is_saved ? 0 : 1,
          }),
        }
      );

      console.log(success);

      if (success.ok) {
        setJobs((prev) =>
          prev.map((j) =>
            j.id === job.id
              ? { ...j, is_saved: j.is_saved ? 0 : 1 }
              : j
          )
        );
      }
    } catch (err) {
      console.error("Save job failed");
    }
  };

  const displayedJobs =
    activeTab === "recommended"
      ? jobs
      : jobs.filter((job) => job.is_saved);

  return (
    <div className="jobs-pagejd">
      {/* HEADER */}
      <div className="jobs-herojd">
        <h1>
          Find your Perfect <span>Job</span>
        </h1>
        <p>
          Connect with top Companies and discover opportunities that match your
          skills and aspirations.
        </p>
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
        {loading ? (
          <p className="emptyjd">Loading jobs...</p>
        ) : displayedJobs.length === 0 ? (
          <p className="emptyjd">No jobs found</p>
        ) : (
          displayedJobs.map((job) => (
            <div className="job-card" key={job.id}>
              <div className="job-cardimgsec">
                <img className="cardimgsec" src="/assets/logomp.png" alt="" />
                <h4>{job.role}</h4>

                {/* SAVE ICON */}
                <div
                  className={`savejd ${job.is_saved ? "saved" : ""}`}
                  onClick={() => toggleSave(job)}
                >
                  <img src="/assets/sawed.png" className="saveit" alt="" />
                </div>
              </div>

              <p className="companyjd">{job.company_name}</p>

              <div className="job-info">
                <span>{job.salary}</span>
                <span>{job.location}</span>
                <span>{job.work_mode}</span>
              </div>

              <div className="skillsjd">
                {job.required_skill_set
                  .split(",")
                  .map((skill, i) => (
                    <span key={i}>{skill.trim()}</span>
                  ))}
              </div>

              <div className="card-footerjd">
                <span className="postedjd">
                  {new Date(job.created_at).toLocaleDateString()}
                </span>
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
