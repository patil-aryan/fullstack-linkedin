




// import React, { useState } from 'react';
// import { Search, MapPin, Briefcase, Clock, BookmarkPlus, Send } from 'lucide-react';

// const MOCK_JOBS = [
//   {
//     id: 1,
//     title: "Senior Software Engineer",
//     company: "TechCorp Inc.",
//     location: "San Francisco, CA",
//     type: "Full-time",
//     posted: "2 days ago",
//     description: "We're looking for a Senior Software Engineer to join our growing team. The ideal candidate will have 5+ years of experience in full-stack development.",
//     requirements: ["5+ years experience", "React", "Node.js", "AWS"],
//     logo: "/api/placeholder/48/48"
//   },
//   {
//     id: 2,
//     title: "Product Manager",
//     company: "InnovateNow",
//     location: "Remote",
//     type: "Full-time",
//     posted: "1 week ago",
//     description: "Join our product team to help shape the future of our digital products. You'll work closely with designers and engineers.",
//     requirements: ["3+ years PM experience", "Agile", "Data Analysis"],
//     logo: "/api/placeholder/48/48"
//   },
//   {
//     id: 3,
//     title: "UX Designer",
//     company: "DesignHub",
//     location: "New York, NY",
//     type: "Contract",
//     posted: "3 days ago",
//     description: "Looking for a talented UX Designer to help create beautiful and functional user interfaces.",
//     requirements: ["Figma", "User Research", "Prototyping"],
//     logo: "/api/placeholder/48/48"
//   }
// ];

// const JobPage = () => {
//   const [selectedJob, setSelectedJob] = useState(MOCK_JOBS[0]);
//   const [searchTerm, setSearchTerm] = useState('');

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Left sidebar - Search and Filters */}
//       <div className="w-1/4 p-4 bg-white border-r">
//         <div className="mb-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-3 text-gray-400" size={20} />
//             <input
//               type="text"
//               placeholder="Search jobs"
//               className="w-full pl-10 pr-4 py-2 border rounded-md"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>
        
//         <div className="mb-4">
//           <h3 className="font-semibold mb-2">Filters</h3>
//           <div className="space-y-2">
//             <label className="flex items-center">
//               <input type="checkbox" className="mr-2" />
//               Remote
//             </label>
//             <label className="flex items-center">
//               <input type="checkbox" className="mr-2" />
//               Full-time
//             </label>
//             <label className="flex items-center">
//               <input type="checkbox" className="mr-2" />
//               Contract
//             </label>
//           </div>
//         </div>
//       </div>

//       {/* Middle section - Job listings */}
//       <div className="w-1/3 overflow-y-auto border-r">
//         {MOCK_JOBS.filter(job => 
//           job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           job.company.toLowerCase().includes(searchTerm.toLowerCase())
//         ).map(job => (
//           <div
//             key={job.id}
//             className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
//               selectedJob.id === job.id ? 'bg-blue-50' : ''
//             }`}
//             onClick={() => setSelectedJob(job)}
//           >
//             <div className="flex items-start">
//               <img
//                 src={job.logo}
//                 alt={`${job.company} logo`}
//                 className="w-12 h-12 rounded"
//               />
//               <div className="ml-3">
//                 <h3 className="font-semibold text-lg text-blue-600">{job.title}</h3>
//                 <p className="text-gray-700">{job.company}</p>
//                 <div className="flex items-center text-gray-500 text-sm mt-1">
//                   <MapPin size={14} className="mr-1" />
//                   <span className="mr-3">{job.location}</span>
//                   <Clock size={14} className="mr-1" />
//                   <span>{job.posted}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Right section - Job details */}
//       <div className="flex-1 p-6 bg-white overflow-y-auto">
//         {selectedJob && (
//           <div>
//             <div className="flex justify-between items-start mb-6">
//               <div>
//                 <h1 className="text-2xl font-semibold mb-2">{selectedJob.title}</h1>
//                 <div className="flex items-center text-gray-600 mb-4">
//                   <span className="mr-4">{selectedJob.company}</span>
//                   <span className="mr-4">{selectedJob.location}</span>
//                   <span>{selectedJob.type}</span>
//                 </div>
//                 <div className="flex items-center text-gray-500 text-sm">
//                   <Clock size={16} className="mr-1" />
//                   <span>Posted {selectedJob.posted}</span>
//                 </div>
//               </div>
//               <div className="flex gap-2">
//                 <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
//                   <Send size={16} className="mr-2" />
//                   Apply
//                 </button>
//                 <button className="flex items-center px-4 py-2 border rounded-full hover:bg-gray-50">
//                   <BookmarkPlus size={16} className="mr-2" />
//                   Save
//                 </button>
//               </div>
//             </div>

//             <div className="prose max-w-none">
//               <h2 className="text-xl font-semibold mb-4">About the job</h2>
//               <p className="mb-6">{selectedJob.description}</p>

//               <h2 className="text-xl font-semibold mb-4">Requirements</h2>
//               <ul className="list-disc pl-6 mb-6">
//                 {selectedJob.requirements.map((req, index) => (
//                   <li key={index} className="mb-2">{req}</li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default JobPage;


import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Clock, BookmarkPlus, Send, Loader2 } from 'lucide-react';
import axios from 'axios';


const JobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    remote: false,
    fullTime: false,
    contract: false
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const options = {
      method: 'GET',
      url: 'https://jsearch.p.rapidapi.com/search',
      params: {
        query: 'Software developer',
        page: '1',
        num_pages: '1'
      },
      headers: {
        'X-RapidAPI-Key': "90d2a3adddmshefcf8a1b466bb54p16e3a3jsn7c26004b1909", //import.meta.env.VITE_RAPID_APIKEY,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
      }
    };

    try {
      setIsLoading(true);
      const response = await axios.request(options);
      const formattedJobs = response.data.data.map(job => ({
        id: job.job_id,
        title: job.job_title,
        company: job.employer_name,
        location: job.job_city + ", " + job.job_country,
        type: job.job_employment_type,
        posted: job.job_posted_at_datetime_utc,
        description: job.job_description,
        requirements: job.job_highlights?.Qualifications || [],
        logo: job.employer_logo || "/api/placeholder/48/48",
        apply_link: job.job_apply_link
      }));
      
      setJobs(formattedJobs);
      setSelectedJob(formattedJobs[0]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch jobs');
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    const options = {
      method: 'GET',
      url: 'https://jsearch.p.rapidapi.com/search',
      params: {
        query: searchTerm,
        page: '1',
        num_pages: '1'
      },
      headers: {
        'X-RapidAPI-Key': "90d2a3adddmshefcf8a1b466bb54p16e3a3jsn7c26004b1909",
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
      }
    };

    try {
      setIsLoading(true);
      const response = await axios.request(options);
      const formattedJobs = response.data.data.map(job => ({
        id: job.job_id,
        title: job.job_title,
        company: job.employer_name,
        location: job.job_city + ", " + job.job_country,
        type: job.job_employment_type,
        posted: job.job_posted_at_datetime_utc,
        description: job.job_description,
        requirements: job.job_highlights?.Qualifications || [],
        logo: job.employer_logo || "/api/placeholder/48/48",
        apply_link: job.job_apply_link
      }));
      
      setJobs(formattedJobs);
      setSelectedJob(formattedJobs[0]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch jobs');
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    if (selectedJob?.apply_link) {
      window.open(selectedJob.apply_link, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left sidebar - Search and Filters */}
      <div className="w-1/4 p-4 bg-white border-r">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search jobs"
              className="w-full pl-10 pr-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Filters</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.remote}
                onChange={(e) => setFilters({...filters, remote: e.target.checked})}
              />
              Remote
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.fullTime}
                onChange={(e) => setFilters({...filters, fullTime: e.target.checked})}
              />
              Full-time
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.contract}
                onChange={(e) => setFilters({...filters, contract: e.target.checked})}
              />
              Contract
            </label>
          </div>
        </div>
      </div>

      {/* Middle section - Job listings */}
      <div className="w-1/3 overflow-y-auto border-r">
        {jobs.map(job => (
          <div
            key={job.id}
            className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
              selectedJob?.id === job.id ? 'bg-blue-50' : ''
            }`}
            onClick={() => setSelectedJob(job)}
          >
            <div className="flex items-start">
              <img
                src={job.logo}
                alt={`${job.company} logo`}
                className="w-12 h-12 rounded"
              />
              <div className="ml-3">
                <h3 className="font-semibold text-lg text-blue-600">{job.title}</h3>
                <p className="text-gray-700">{job.company}</p>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <MapPin size={14} className="mr-1" />
                  <span className="mr-3">{job.location}</span>
                  <Clock size={14} className="mr-1" />
                  <span>{new Date(job.posted).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right section - Job details */}
      <div className="flex-1 p-6 bg-white overflow-y-auto">
        {selectedJob && (
          <div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-semibold mb-2">{selectedJob.title}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <span className="mr-4">{selectedJob.company}</span>
                  <span className="mr-4">{selectedJob.location}</span>
                  <span>{selectedJob.type}</span>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock size={16} className="mr-1" />
                  <span>Posted {new Date(selectedJob.posted).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={handleApply}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                >
                  <Send size={16} className="mr-2" />
                  Apply
                </button>
                <button className="flex items-center px-4 py-2 border rounded-full hover:bg-gray-50">
                  <BookmarkPlus size={16} className="mr-2" />
                  Save
                </button>
              </div>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-4">About the job</h2>
              <p className="mb-6">{selectedJob.description}</p>

              <h2 className="text-xl font-semibold mb-4">Requirements</h2>
              <ul className="list-disc pl-6 mb-6">
                {selectedJob.requirements.map((req, index) => (
                  <li key={index} className="mb-2">{req}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPage;