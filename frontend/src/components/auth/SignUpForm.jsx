// import { useState } from "react";

// const SignUpForm = () => {

//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [username, setUsername] = useState("");

//     const handleSignup = (e) => {
//         e.preventDefault();
//     }



//   return (
//     <>
//     <form className="flex flex-col gap-4" onSubmit={handleSignup}>
//         <div>
//             <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered w-full required"/>
//         </div>
//         <div>
//             <input type="text" placeholder="username" value={username} onChange={(e) => setName(e.target.value)} className="input input-bordered w-full required"/>
//         </div>
//         <div>
//             <input type="text" placeholder="Email Address" value={email} onChange={(e) => setName(e.target.value)} className="input input-bordered w-full required"/>
//         </div>
//         <div>
//             <input type="text" placeholder="password" value={password} onChange={(e) => setName(e.target.value)} className="input input-bordered w-full required"/>
//         </div>
//     </form>
//     </>
//   )
// }

// export default SignUpForm

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../libraries/axios.js";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";


const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const { mutate: signUpMutation, isLoading } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/auth/signup", data);
      return res.data;
    },
    onSuccess: () => {
        toast.success("Account created successfully");
    },
    onError: (err) => {
        toast.error(err.response.data.message || "An error occurred. Please try again");
    }
  });


  const handleSignup = (e) => {
    e.preventDefault();
    signUpMutation({ name, username, email, password });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSignup}>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
        />
      </label>

      <label className="input input-bordered flex items-center gap-2 mt-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full"
        />
      </label>

      <label className="input input-bordered flex items-center gap-2 mt-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
        />
      </label>

      <label className="input input-bordered flex items-center gap-2 mt-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="password"
          placeholder="Password (6 or more characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full"
        />
      </label>
      <button type="submit" disabled={isLoading} className="btn btn-primary mt-4 w-full text-white">
        {isLoading ? <Loader className= "size-5 animate-spin" /> : "Sign Up"}
      </button>
    </form>
  );
};

export default SignUpForm;
