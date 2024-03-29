import React, { useEffect, useState } from 'react'
import {auth, googleProvider, db} from "../config/firebase";
import {createUserWithEmailAndPassword, signInWithPopup, signOut, sendEmailVerification, updateProfile} from "firebase/auth";
import {getDocs, collection, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore";


function Auth() {


    const signup = () => {
        createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // send verification mail.
                userCredential.sendEmailVerification();
                signOut();
                alert("Email sent");
            })
            .catch(alert);
    };

    const [movieList, setMovieList] = useState([]);


    const [newMovieTitle, setNewMovieTitle] = useState("");
    const [newMovieReleaseDate, setNewMovieReleaseDate] = useState(0);
    const [newMovieIsAvailable, setNewMovieIsAvailable] = useState(false);

    const [updateTitle, setUpdateTitle] = useState("");

    const moviesCollectionRef = collection(db, "movies");

    console.log(auth?.currentUser)

    const getMovieList = async () => {
        // Read
        try
        {
            const data = await getDocs(moviesCollectionRef);
            const filteredData = data.docs.map((doc) => ({...doc.data(), id:doc.id}));
            setMovieList(filteredData);
        }
        catch(err){
            console.log(err);
        }
        
    }

    useEffect(() =>  {
        getMovieList();
    },[]);
    

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(auth.currentUser)
   var displayName = "Soniya";
    const signIn = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password)
        }
        catch(err){
            console.log(err);
        }
        
    };

    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider)
        }
        catch(err){
            console.log(err);
        }
        
    };

    const logout = async () => {
        try{
            await signOut(auth)
        }
        catch(err){
            console.log(err);
        }
        
    };

    const onSubmitMovie = async () =>{
        try{
            await addDoc(moviesCollectionRef, {
                title: newMovieTitle, releaseDate : newMovieReleaseDate, isAvailable : newMovieIsAvailable, userId : auth?.currentUser?.uid
            });
            getMovieList();
        }
        catch(err)
        {

        }
        
    }

    const deleteMovie = async (id) =>{
        const movieDoc = doc(db, "movies", id);
        await deleteDoc(movieDoc);
    }

    const updateMovieTitle = async (id, ) =>{
        const movieDoc = doc(db, "movies", id);
        await updateDoc(movieDoc, {title : updateTitle});
    }
  return (
    <div>
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input placeholder="Password" type='password' onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={signIn}>Sign In</button>
            <button onClick={signInWithGoogle}>Sign In With Google</button>
            <button onClick={logout}>Logout</button>
            <div>
                {
                    movieList.map((m) => (
                        <div>
                            <h1>{m.title}</h1>
                            <button onClick={() => (deleteMovie(m.id))}>Delete Movie</button>
                            <input placeholder='new title' onChange={(e) => setUpdateTitle(e.target.value)}/>
                            <button onClick={() => updateMovieTitle(m.id)}>Update Title</button>
                        </div>
                    ))
                }

            </div>
            <input placeholder="Movie title..." onChange={(e) => setNewMovieTitle(e.target.value)}/>
            <input placeholder="Release Date..." type='number' onChange={(e) => setNewMovieReleaseDate(Number(e.target.value))}/>
            <input  type='checkbox' checked={newMovieIsAvailable} onChange={(e) => setNewMovieIsAvailable(e.target.checked)}/>
            <label>IsAvailable</label>
            <button onClick={onSubmitMovie}>Submit Movie</button>
            <br />
            <br />
            <input
                type="email"
                placeholder="Email"
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            ></input>
            <br />
            <br />
            <input
                type="password"
                placeholder="password"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            ></input>
            <br />
            <br />
            <button onClick={signup}>Sign-up</button>
        </div>
  )
}

export default Auth