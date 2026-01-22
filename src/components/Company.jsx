import React, { useState } from "react";
import companiesData from "../data/companiesData";
import "../styles/Company.css";

const tabs = [
  { label: "MNCs", value: "mncs" },
  { label: "Corporate", value: "corporate" },
  { label: "Finance", value: "finance" },
  { label: "Startups", value: "startups" },
];

const Company = () => {
  const [activeTab, setActiveTab] = useState("mncs");
  const [search, setSearch] = useState("");

  const filteredCompanies = companiesData.filter(
    (company) =>
      company.category === activeTab &&
      company.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="company-sectioncy">
      <h2>
        Top Companies <span>Hiring Now</span>
      </h2>
      <p className="subtitlecy">
        Discover the best companies to work for. Explore their culture, open
        jobs, and more.
      </p>
      <div className="company-controlscy">
        <div className="tabscy">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              className={activeTab === tab.value ? "active" : ""}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search Companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="company-gridcy">
        {filteredCompanies.map((company) => (
          <div className="company-cardcy" key={company.id}>
            <img className="company-cardcyimg" src={company.logo} alt={company.name} />
            <h3>{company.name}</h3>
            <span className="industrycy">{company.industry}</span>
            <p><img src="/assets/Frame (1).png" alt="" /> {company.location}</p>
            <p><img src="/assets/bag.png" alt="" /> {company.openings} Openings</p>
            <a
              href={company.careerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="career-btncy"
            >
              View Career
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Company;
