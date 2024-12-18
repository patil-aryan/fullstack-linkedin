
// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom'; // If you're using React Router
// import { useQuery } from '@tanstack/react-query'; // For data fetching
// // import { axiosInstance } from '../librar/axios'; // Or your preferred way of making API calls
// import { toast } from 'react-hot-toast';
// import { Loader2, MapPin, Briefcase, CheckCircle, XCircle } from 'lucide-react';
// import { axiosInstance } from '../../libraries/axios';

// const JobPage = () => {
//   const { jobId } = useParams(); // Get the job ID from the URL (if applicable)

//   const {
//     data: job,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ['job', jobId], // Unique key for this query
//     queryFn: async () => {
//       const response = await axiosInstance.get(`/api/jobs/${jobId}`); // Replace with your API endpoint
//       return response.data;
//     },
//     enabled: !!jobId, // Only run the query if jobId is available
//   });

//   // Example function to handle applying for the job (replace with your logic)
//   const handleApply = async () => {
//     try {
//       // Make API call to apply for the job
//       const response = await axiosInstance.post(`/api/jobs/${jobId}/apply`);
//       toast.success('Successfully applied for the job!');
//     } catch (error) {
//       toast.error('Failed to apply for the job.');
//       console.error(error);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader2 className="animate-spin text-4xl text-primary" />
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="flex flex-col justify-center items-center h-screen">
//         <XCircle className="text-red-500 text-4xl mb-4" />
//         <p className="text-lg text-gray-700">
//           Error loading job: {error.message}
//         </p>
//       </div>
//     );
//   }

//   if (!job) {
//     return (
//       <div className="flex justify-center items-center">
//         <p className="text-lg text-gray-700">Jobs not found at this moment. Please try again later!</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
//         <div className="flex items-center text-gray-600 mb-4">
//           <Briefcase className="mr-2" />
//           <span>{job.company}</span>
//           <span className="mx-2">•</span>
//           <MapPin className="mr-2" />
//           <span>{job.location}</span>
//         </div>

//         <div className="mb-4">
//           <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
//             {job.type}
//           </span>
//         </div>

//         <h2 className="text-xl font-semibold mb-4">Job Description</h2>
//         <div
//           className="prose prose-blue max-w-none"
//           dangerouslySetInnerHTML={{ __html: job.description }}
//         />

//         <h2 className="text-xl font-semibold mt-6 mb-4">Requirements</h2>
//         <ul className="list-disc list-inside mb-6">
//           {job.requirements.map((requirement, index) => (
//             <li key={index}>{requirement}</li>
//           ))}
//         </ul>

//         <h2 className="text-xl font-semibold mb-4">How to Apply</h2>
//         <p className="mb-6">{job.applicationInstructions}</p>

//         <button
//           onClick={handleApply}
//           className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full"
//         >
//           Apply Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default JobPage;




// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { Toaster, toast } from 'react-hot-toast';
// import {
//   Loader2,
//   MapPin,
//   Briefcase,
//   XCircle,
//   ArrowLeft,
// } from 'lucide-react';
// import axios from 'axios';

// // IMPORTANT: Replace with your Adzuna API credentials or your own API endpoint
// const API_ID = '18d12d06'; // Or your API's ID
// const API_KEY = '8a41c99d7bccaefeb78bae061e3cfdc3'; // Or your API's Key

// // You might need to adjust this if you are not using Adzuna
// const axiosInstance = axios.create({
//   baseURL: 'https://api.adzuna.com/v1/api/jobs/',
//   params: {
//     app_id: API_ID,
//     app_key: API_KEY,
//   },
// });

// const JobPage = () => {
//   const { jobId } = useParams();
//   const navigate = useNavigate();

//   // Data fetching using React Query
//   const {
//     data: job,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ['job', jobId],
//     queryFn: async () => {
//       // **Note:** Adzuna's free API does not support fetching a single job by ID.
//       // This is a workaround where we fetch a list of jobs and find the one with the matching ID.
//       // If you have a different API, adjust this fetch logic accordingly.
//       const response = await axiosInstance.get('/gb/search/1', { // Assuming UK for Adzuna
//         params: {
//           results_per_page: 50, // Fetch a larger number of results to increase the chance of finding the job
//         },
//       });

//       const foundJob = response.data.results.find(
//         (item) => item.id.toString() === jobId
//       );

//       if (!foundJob) {
//         throw new Error('Job not found');
//       }

//       return foundJob;
//     },
//     enabled: !!jobId, // Only run the query if the jobId is available
//   });

//   const handleApply = () => {
//     if (job && job.redirect_url) {
//       window.open(job.redirect_url, '_blank'); // Open the external URL in a new tab
//       toast.success('Redirecting to application page...');
//     } else {
//       toast.error('Application URL not found.');
//     }
//   };

//   // --- Loading State ---
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Loader2 className="animate-spin text-4xl text-blue-500" />
//       </div>
//     );
//   }

//   // --- Error State ---
//   if (isError) {
//     return (
//       <div className="flex flex-col justify-center items-center min-h-screen">
//         <XCircle className="text-red-500 text-4xl mb-4" />
//         <p className="text-lg text-gray-700">
//           Error loading job: {error.message}
//         </p>
//       </div>
//     );
//   }

//   // --- Job Not Found State ---
//   if (!job) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-lg text-gray-700">Job not found.</p>
//       </div>
//     );
//   }

//   // --- Job Details Display ---
//   return (
//     <div className="container mx-auto p-4">
//       <Toaster position="top-center" /> {/* For toast notifications */}

//       <button
//         onClick={() => navigate(-1)} // Go back to the previous page
//         className="text-blue-500 hover:text-blue-700 mb-4 flex items-center"
//       >
//         <ArrowLeft className="mr-1" size={16} />
//         Back to Results
//       </button>

//       <div className="bg-white shadow-md rounded-lg p-6">
//         <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
//         <div className="flex items-center text-gray-600 mb-4">
//           <Briefcase className="mr-2" size={18} />
//           <span>{job.company.display_name}</span>
//           <span className="mx-2">•</span>
//           <MapPin className="mr-2" size={18} />
//           <span>{job.location.display_name}</span>
//         </div>

//         <div className="mb-4">
//           <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
//             {job.category.label}
//           </span>
//         </div>

//         <h2 className="text-xl font-semibold mb-4">Job Description</h2>
//         <div
//           className="prose prose-blue max-w-none"
//           dangerouslySetInnerHTML={{ __html: job.description }}
//         />

//         <button
//           onClick={handleApply}
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-6"
//         >
//           Apply Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default JobPage;

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { Toaster, toast } from 'react-hot-toast';
// import {
//   Loader2,
//   MapPin,
//   Briefcase,
//   XCircle,
//   ArrowLeft,
// } from 'lucide-react';
// import axios from 'axios';

// // IMPORTANT: Replace with your Adzuna API credentials or your own API endpoint
// const API_ID = '18d12d06'; // Or your API's ID
// const API_KEY = '8a41c99d7bccaefeb78bae061e3cfdc3'; // Or your API's Key

// // axiosInstance configuration for Adzuna (US-based)
// const axiosInstance = axios.create({
//   baseURL: 'https://api.adzuna.com/v1/api/jobs/', // Base URL for job search
//   params: {
//     app_id: API_ID,
//     app_key: API_KEY,
//   },
// });

// const JobPage = () => {
//   const { jobId } = useParams();
//   const navigate = useNavigate();

//   const {
//     data: job,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ['job', jobId],
//     queryFn: async () => {
//       // Adzuna doesn't have a direct endpoint for fetching a single job by ID.
//       // We'll fetch a list of jobs and then filter to find the one with the matching ID.
//       const response = await axiosInstance.get('/us/search/1', { // Using US country code
//         params: {
//           results_per_page: 50, // Fetch more results to increase the chance of finding the job
//         },
//       });

//       const foundJob = response.data.results.find(
//         (item) => item.id.toString() === jobId
//       );

//       if (!foundJob) {
//         throw new Error('Job not found');
//       }

//       return foundJob;
//     },
//     enabled: !!jobId,
//   });

//   const handleApply = () => {
//     if (job && job.redirect_url) {
//       window.open(job.redirect_url, '_blank');
//       toast.success('Redirecting to application page...');
//     } else {
//       toast.error('Application URL not found.');
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Loader2 className="animate-spin text-4xl text-blue-500" />
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="flex flex-col justify-center items-center min-h-screen">
//         <XCircle className="text-red-500 text-4xl mb-4" />
//         <p className="text-lg text-gray-700">
//           Error loading job: {error.message}
//         </p>
//       </div>
//     );
//   }

//   if (!job) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-lg text-gray-700">Job not found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <Toaster position="top-center" />

//       <button
//         onClick={() => navigate(-1)}
//         className="text-blue-500 hover:text-blue-700 mb-4 flex items-center"
//       >
//         <ArrowLeft className="mr-1" size={16} />
//         Back to Results
//       </button>

//       <div className="bg-white shadow-md rounded-lg p-6">
//         <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
//         <div className="flex items-center text-gray-600 mb-4">
//           <Briefcase className="mr-2" size={18} />
//           <span>{job.company.display_name}</span>
//           <span className="mx-2">•</span>
//           <MapPin className="mr-2" size={18} />
//           <span>{job.location.display_name}</span>
//         </div>

//         <div className="mb-4">
//           <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
//             {job.category.label}
//           </span>
//         </div>

//         <h2 className="text-xl font-semibold mb-4">Job Description</h2>
//         <div
//           className="prose prose-blue max-w-none"
//           dangerouslySetInnerHTML={{ __html: job.description }}
//         />

//         <button
//           onClick={handleApply}
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-6"
//         >
//           Apply Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default JobPage;

// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { Toaster, toast } from 'react-hot-toast';
// import { Loader2, MapPin, Briefcase, XCircle, ArrowLeft } from 'lucide-react';
// import axios from 'axios';

// // Replace with your Jooble API key
// const JOOBLE_API_KEY = '0da46dfa-115f-4fc5-9d11-4bdef8b92290';

// const JobPage = () => {
//   const { jobId } = useParams();
//   const navigate = useNavigate();

//   const {
//     data: job,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ['job', jobId],
//     queryFn: async () => {
//       // API request body
//       const requestData = {
//         keywords: '', // Leave empty or use relevant keywords
//         location: '', // Leave empty for worldwide jobs
//         id: [jobId], // Pass job ID as an array
//       };

//       try {
//         const response = await axios.post(
//           `https://jooble.org/api/${JOOBLE_API_KEY}`,
//           requestData,
//           {
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           }
//         );

//         // Log the full API response for debugging
//         console.log('Jooble API Response:', response.data);

//         if (!response.data || !response.data.jobs || response.data.jobs.length === 0) {
//           throw new Error('Job not found');
//         }

//         // Return the first job in the response
//         return response.data.jobs[0];
//       } catch (err) {
//         console.error('Error fetching job:', err.message);
//         throw new Error(err.message || 'Failed to fetch job data.');
//       }
//     },
//     enabled: !!jobId, // Only run query if jobId is provided
//   });

//   const handleApply = () => {
//     if (job?.link) {
//       window.open(job.link, '_blank'); // Open the job application link
//       toast.success('Redirecting to application page...');
//     } else {
//       toast.error('Application URL not found.');
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Loader2 className="animate-spin text-4xl text-blue-500" />
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="flex flex-col justify-center items-center min-h-screen">
//         <XCircle className="text-red-500 text-4xl mb-4" />
//         <p className="text-lg text-gray-700">
//           Error loading job: {error.message}
//         </p>
//       </div>
//     );
//   }

//   if (!job) {
//     return (
//       <div className="flex justify-center items-center">
//         <p className="text-lg text-gray-700">
//           Jobs not found. Please try again later.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <Toaster position="top-center" />

//       <button
//         onClick={() => navigate(-1)}
//         className="text-blue-500 hover:text-blue-700 mb-4 flex items-center"
//       >
//         <ArrowLeft className="mr-1" size={16} />
//         Back to Results
//       </button>

//       <div className="bg-white shadow-md rounded-lg p-6">
//         <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
//         <div className="flex items-center text-gray-600 mb-4">
//           <Briefcase className="mr-2" size={18} />
//           <span>{job.company || 'Company not specified'}</span>
//           <span className="mx-2">•</span>
//           <MapPin className="mr-2" size={18} />
//           <span>{job.location || 'Location not specified'}</span>
//         </div>

//         <h2 className="text-xl font-semibold mb-4">Job Description</h2>
//         <div
//           className="prose prose-blue max-w-none"
//           dangerouslySetInnerHTML={{ __html: job.snippet || 'No description available.' }}
//         />

//         <button
//           onClick={handleApply}
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-6"
//         >
//           Apply Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default JobPage;


import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Toaster, toast } from 'react-hot-toast';
import { Loader2, MapPin, Briefcase, XCircle, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const JobPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const JOOBLE_API_KEY = '0da46dfa-115f-4fc5-9d11-4bdef8b92290'; // Replace with your API Key

  const {
    data: job,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['job', jobId],
    queryFn: async () => {
      try {
        // Jooble API does not provide single job by ID, simulate search filtering
        const requestData = { keywords: '', location: '' };

        const response = await axios.post(
          `https://jooble.org/api/${JOOBLE_API_KEY}`,
          requestData,
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );

        // Find job by ID in the list
        const jobs = response.data.jobs || [];
        const foundJob = jobs.find((job) => job.id === jobId);

        if (!foundJob) {
          throw new Error('Job not found');
        }

        return foundJob;
      } catch (err) {
        console.error('Error fetching job:', err.message);
        throw new Error('Failed to load job details');
      }
    },
    enabled: !!jobId,
  });

  const handleApply = () => {
    if (job?.link) {
      window.open(job.link, '_blank');
      toast.success('Redirecting to application page...');
    } else {
      toast.error('Application URL not found.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <XCircle className="text-red-500 text-4xl mb-4" />
        <p className="text-lg text-gray-700">Error: {error.message}</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-lg text-gray-700">Jobs not found. Please try again later!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Toaster position="top-center" />
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 hover:text-blue-700 mb-4 flex items-center"
      >
        <ArrowLeft className="mr-1" size={16} />
        Back to Results
      </button>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2">{job.title || 'No Title'}</h1>
        <div className="flex items-center text-gray-600 mb-4">
          <Briefcase className="mr-2" size={18} />
          <span>{job.company || 'Unknown Company'}</span>
          <span className="mx-2">•</span>
          <MapPin className="mr-2" size={18} />
          <span>{job.location || 'Location Not Specified'}</span>
        </div>

        <div className="mb-4">
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
            {job.type || 'Not specified'}
          </span>
        </div>

        <h2 className="text-xl font-semibold mb-4">Job Description</h2>
        <div
          className="prose prose-blue max-w-none"
          dangerouslySetInnerHTML={{ __html: job.snippet || 'No description available.' }}
        />

        <button
          onClick={handleApply}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-6"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobPage;
