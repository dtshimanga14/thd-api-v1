import { Auth } from './components/Auth';
import { db, auth, storage } from './config/firebase';
import React, { useEffect, useState } from 'react';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [releasedDate, setReleasedDate] = useState(2023);
  const [receivedAnOscar, setReceivedAnOscar] = useState(false);
  const [image, setImage] = useState(null);
  const moviesRef = collection(db, "movies");

  useEffect(() => {
    const getMovies = async () => {
      try {
        const snapshot = await getDocs(moviesRef);
        const data = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id }));
        console.log('test', data);
        setMovies(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, []);
  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesRef, {
        title,
        releasedDate,
        receivedAnOscar,
        userId: auth?.currentUser?.uid
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onUploadFile = async () => {
    if (!image) return;
    const refImage = ref(storage, `images/${image.name}`);  
    try {
      const uploadTask = uploadBytes(refImage, image);
      uploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      }, (error) => {
        console.log(error);
      }, async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log(downloadURL);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      <Auth />
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.releasedDate}</p>
          </div>
        ))}
      </div>
      <div>
        <input placeholder="Title..." type="text"  value={title} onChange={e => setTitle(e.target.value)}/>
        <input placeholder="released date..." type="number" value={releasedDate}  onChange={e => setReleasedDate(e.target.value)}/>
        <input type="checkbox" checked={receivedAnOscar}  onChange={e => setReceivedAnOscar(e.target.checked)}/>
        <button onClick={onSubmitMovie}> Add Movie </button>
      </div>
      <div>
        <input placeholder="upload image..." type="file" onChange={e => setImage(e.target.files[0])}/>
        <button onClick={onUploadFile}> Upload Image </button>
      </div>
    </div>
  );
}

export default App;
