import { useState, useEffect } from "react";
import "../styles/ProfileDetail.css";

const ProfileDetail = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  /* FETCH SAVED JOBS FROM API */
  useEffect(() => {
    const fetchSavedJobs = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://jobs.mpdatahub.com/api/job/list");
        const json = await res.json();

        if (json.status) {
          const saved = json.data.filter(
            (job) => job.is_saved === 1
          );
          setSavedJobs(saved);
        }
      } catch (err) {
        console.error("Failed to load saved jobs");
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === "saved") {
      fetchSavedJobs();
    }
  }, [activeTab]);

  return (
    <div className="profile-pagepd">
      {/* Header Card */}
      <div className="profile-headerpd">
        <img src="https://i.pravatar.cc/80" alt="profile" />
        <div>
          <h3>Hina</h3>
          <p>Junior UI UX Designer</p>
          <div className="infopd">
            <span>
              <img className="detph" src="/assets/Frame (10).png" alt="" />
              hina20@gmail.com
            </span>
            <span>
              <img className="detph" src="/assets/ph.png" alt="" />
              +91-6369146601
            </span>
            <span>
              <img className="detph" src="/assets/Frame (11).png" alt="" />
              Salem, Tamilnadu
            </span>
          </div>
        </div>
      </div>

      <div className="profile-contentpd">
        {/* Sidebar */}
        <div className="profile-sidebarpd">
          <button
            className={activeTab === "personal" ? "active" : ""}
            onClick={() => setActiveTab("personal")}
          >
            <img className="primag" src="/assets/man.png" alt="" />
            Personal Details
          </button>

          <button
            className={activeTab === "saved" ? "active" : ""}
            onClick={() => setActiveTab("saved")}
          >
            <img className="primag" src="/assets/bmark.png" alt="" />
            Saved Jobs
          </button>
        </div>

        {/* Main Content */}
        <div className="profile-mainpd">
          {activeTab === "personal" && (
            <div className="details-cardpd">
              <div className="headerpd">
                <h3>Personal Details</h3>
                <button>Edit Profile</button>
              </div>

              <div className="gridpd">
                <div>
                  <label>Full Name</label>
                  <input value="Hina" readOnly />
                </div>
                <div>
                  <label>Role</label>
                  <input value="Junior UI UX Designer" readOnly />
                </div>
                <div>
                  <label>Email</label>
                  <input value="hina20@gmail.com" readOnly />
                </div>
                <div>
                  <label>Phone Number</label>
                  <input value="+91-6369146601" readOnly />
                </div>
                <div className="fullpd">
                  <label>Location</label>
                  <input value="Salem, Tamilnadu" readOnly />
                </div>
              </div>
            </div>
          )}

          {activeTab === "saved" && (
            <div className="saved-jobspd">
              {loading ? (
                <p>Loading saved jobs...</p>
              ) : savedJobs.length === 0 ? (
                <p>No saved jobs yet.</p>
              ) : (
                savedJobs.map((job) => (
                  <div key={job.id} className="saved-job-cardpd">
                    <h4>{job.role}</h4>
                    <p>{job.company_name}</p>
                    <span>{job.location}</span>
                    <span>{job.work_mode}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
