import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {db} from "../config/firebase";
import {collection, addDoc} from "firebase/firestore";

const Timer = ({testid, paper, lastIndex, posts}) => {
    const navigate = useNavigate();
    const [minutes, setMinutes ] = useState(1);
    const [seconds, setSeconds ] =  useState(10);

    const testCollectionRef = collection(db, "tests");

    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

    const submitTest = async () =>{
            var ans = [];
            let c = 0;
            for(var i = 0; i < lastIndex; i++)
            {
                var resUser = localStorage.getItem(testid +"#"+(i + 1));
                var result1 = posts[i].result;

                if(resUser == result1)
                {
                    c = c + 1;
                }

                ans.push({resUser});
            }

            var result = (c/lastIndex)*100;
            
            var today = new Date();
            const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
            const time = today.toLocaleTimeString();

            var resultid = date + '-' + today.getMilliseconds();
            
            const user = localStorage.getItem("currentUser");

                try{
                    await addDoc(testCollectionRef, {
                        name: (user + "data"), testid : testid, paper : paper, result : result, date:date, time:time, ans:ans, resultid:resultid
                    });
                }
                catch(err)
                {
                    console.log(err);
                }

            const timeTaken = `${minutes}:${seconds}`
            console.log(timeTaken);

            let path = `/testresult?testid=${testid}&paper=${paper}&&score=${result}&&date=${date}&&time=${time}&&resultid=${resultid}`; 
            navigate(path);
    }
    return (
        <div>
        { minutes == 0 && seconds == 0
            ? <div>{submitTest()}</div>
            : <h1 className='text-bold text-2xl sm:text-3xl'> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
        }
        </div>
    )
}

export default Timer;