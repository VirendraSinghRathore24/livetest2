import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {db} from "../config/firebase";
import {collection, addDoc} from "firebase/firestore";
import testdata from '../data/livetest.json'

const Timer = ({testid, paper, lastIndex, posts, setRunningMin, setRunningSec, totalMinutes, totalSeconds, setHideHeader}) => {
    const navigate = useNavigate();
    
    const [minutes, setMinutes ] = useState(1);
    const [seconds, setSeconds ] =  useState(12);

    const testCollectionRef = collection(db, "tests");
    useEffect(()=> {

            const data1 = testdata.filter((x) => x.testid == testid);
            //setMinutes(data1[0].timeInMinutes);
            setMinutes(100);
            setSeconds(20);
        
    },[]);


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
            setRunningMin(minutes);
            setRunningSec(seconds);
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

    const submitTest = async () =>{
        setHideHeader(false);
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

            const totalTime = (totalMinutes * 60) + totalSeconds;
            const runningTime = (minutes * 60) + seconds;
            const timeTaken = (totalTime - runningTime);
            
            const user = localStorage.getItem("currentUser");

                try{
                    await addDoc(testCollectionRef, {
                        name: (user + "data"), testid : testid, paper : paper, result : result, date:date, time:time, ans:ans, resultid:resultid, timeTaken:timeTaken
                    });
                }
                catch(err)
                {
                    console.log(err);
                }

            let path = `/testresult?testid=${testid}&paper=${paper}&&score=${result}&&date=${date}&&time=${time}&&resultid=${resultid}`; 
            navigate(path);
    }
    return (
        <div>
        { minutes == 0 && seconds == 0
            ? <div>{submitTest()}</div>
            : <h1 className='font-semibold text-xl sm:text-2xl'> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
        }
        </div>
    )
}

export default Timer;