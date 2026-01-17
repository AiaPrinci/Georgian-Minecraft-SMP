import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './style.css';

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [editUsername, setEditUsername] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${userId}`, { withCredentials: true })
      .then(res => {
        setUser(res.data);
        setEditUsername(res.data.username);
      });
  }, [userId]);

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("username", editUsername);
    if (profileImage) formData.append("profile_image", profileImage);

    axios.put(`http://localhost:5000/users/${userId}`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" }
    }).then(() => window.location.reload());
  };

  const isSelf = user.id === parseInt(localStorage.getItem("userId"));

  return (
    <div className="profile">
      <h1>{user.username}</h1>
      {user.profile_image && <img src={`http://localhost:5000/static/uploads/${user.profile_image}`} alt="profile" style={{maxWidth:"150px"}} />}
      
      {isSelf && (
        <div>
          <input type="text" value={editUsername} onChange={e => setEditUsername(e.target.value)} />
          <input type="file" onChange={e => setProfileImage(e.target.files[0])} />
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}

      <h2>Posts</h2>
      {user.posts?.map(p => (
        <div key={p.id}>
          <h3>{p.title}</h3>
          <p>{p.content}</p>
          {p.image && <img src={`http://localhost:5000/static/uploads/${p.image}`} alt="post" style={{maxWidth:"300px"}} />}
        </div>
      ))}
    </div>
  );
};

export default Profile;