import axios from "axios";
import React, { useEffect } from "react";

const Post = (id) => {
  const [image, setImage] = React.useState(null);
  const [message, setMessage] = React.useState(null);
  const [userId, setUserId] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [evenementId, setEvenementId] = React.useState("");
  const [posts , setPosts] = React.useState([ ])
  console.log(userId);
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      photo: image,
      message: message,
      userId: userId.user.id,
     
    };
    const formData = new FormData();
    formData.append("image", image);
    formData.append("message", message);
    formData.append("userId", userId.user.id);
    formData.append("evenementId", id.id);
    axios
      .post("http://localhost:3001/api/posts", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const takePost = () => {
    axios
    .get("http://localhost:3001/api/posts/post/" + id.id)
    .then((res)=>{
      console.log(res)
      setPosts(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
  }
  useEffect (()=>{
    takePost()
  }
  ,[])

  return (
    <><div>
      <h1>Post</h1>
      <div>créer un post </div>
      <form action="">
        <input type="text" placeholder="message" onChange={handleMessage} />
        <input type="file" placeholder="image" onChange={handleImage} />
        <button onClick={handleSubmit}>Envoyer</button>
      </form>
    </div><div>

      </div>
      <h2>Les posts de cette évenement</h2>
      {posts?.map((post) => (
        <div key={post.id}>
          <p>{post.message}</p>
          {
            post.photo ? <img src={post.photo} /> : <p>pas d'image</p>
          }
        


        
        
        </div>
      ))}
      
      
      </>
  );
};

export default Post;
