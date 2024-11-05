import React from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

function Create() {

  const navigate = useNavigate();

  const handleBlogs = async(e) => {
    e.preventDefault();
    let title = e.target.title.value;
    let description = e.target.description.value;

    const blog = {
      title,
      description,
    };

    const response = await fetch("http://localhost:5000/postblog",{
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(blog),
    });

    if(response.status == 200){
      toast.success("Blog posted successfully");
      e.target.title.value = "";
      e.target.description.value="";
      setTimeout(()=>{
        navigate('/');
      }, 2000)
    }
    else{
      alert("Something went wrong")
    }
  }

  return (
    <>
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
      <div className="mt-5 lg:mt-10 w-[90vw] lg:w-[60vw] mx-auto">
        <h1 className="font-bold text-2xl text-center">Create Your Own Blog</h1>
        <div className="mt-4">
          <form className="flex flex-col gap-3" onSubmit={handleBlogs}>
            <label htmlFor="title" className="font-semibold text-lg">
              Title :
            </label>
            <input
              type="text"
              name="title"
              className="outline-none border-2 border-gray-200 px-3 py-2 rounded-md"
              placeholder="Enter your blog title"
            />
            <label htmlFor="description" className="font-semibold text-lg">
              Description :
            </label>
            <textarea
              name="description"
              className="p-2 outline-none border-2 border-gray-200 px-3 py-2 rounded-md"
              rows={8}
            />
            <button
              type="submit"
              className="bg-blue-300 hover:bg-blue-600 px-2 py-1 mt-2 rounded-md text-lg font-semibold text-white"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Create;
