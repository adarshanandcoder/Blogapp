import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoPencil } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [viewButton, setViewButton] = useState(false);
  const [selectedPost, setSelectedPost] = useState(" ");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getBlogs();
  }, [blogs]);

  const getBlogs = async () => {
    const response = await fetch("http://localhost:5000/getblogs");
    const data = await response.json();
    setBlogs(data.blogs);
  };

  const deleteBlogs = async (id) => {
    const response = await fetch(`http://localhost:5000/deleteblog/${id}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      toast.success("Blog deleted successfully");
    } else {
      toast.error("Something went wrong");
    }
  };

  const updateBlogs = async (id) => {
    const response = await fetch(`http://localhost:5000/updateblog/${id}` , {
      method:"PUT",
      headers:{
        "Content-Type" : "application/json",
      },
      body : JSON.stringify({title,description})
    });
    if(response.status === 200) {
      toast.success("Blog updated successfully.")
      setTimeout(()=>{
        setViewButton(false)
      },2000)
    }
    else{
      toast.error("There is some problem")
    }
  };

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="my-10 flex flex-col gap-5">
        {blogs.map((blog) => {
          return (
            <div
              className="w-[50vw] mx-auto p-2 rounded-md shadow-md mt-2"
              key={blog._id}
            >
              <div className="flex justify-end gap-2">
                <MdDelete
                  style={{ opacity: 0.4 }}
                  className=" hover:text-red-500 cursor-pointer hover:scale-110 transition-all"
                  onClick={() => deleteBlogs(blog._id)}
                />
                <IoPencil
                  style={{ opacity: 0.4 }}
                  className={` ${
                    selectedPost === blog._id && viewButton
                      ? "text-red-400 scale-110"
                      : "text-gray-400"
                  }hover:text-red-500 cursor-pointer hover:scale-110 transition-all`}
                  onClick={() => {
                    setViewButton(!viewButton);
                    setSelectedPost(blog._id);
                  }}
                />
              </div>
              <h2 className="font-semibold text-lg mt-1 outline-none focus:bg-gray-300"
              contentEditable = {viewButton}
              onInput={(e) => setTitle(e.target.innerText)}
              >{blog.title}</h2>
              <h3 className="text-gray-600 mt-2 outline-none focus:bg-gray-200"
              contentEditable = {viewButton}
              onInput={(e) => setDescription(e.target.innerText)}
              >{blog.description}</h3>
              <button
                className={`${
                  selectedPost === blog._id && viewButton ? "block" : "hidden"
                } bg-blue-300 hover:bg-blue-600 font-semibold text-white my-1 px-2 py-1 rounded-md`}
                onClick={() => updateBlogs(blog._id)}
              >
                Save
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
