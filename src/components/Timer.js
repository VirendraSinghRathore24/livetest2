import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Timer = ({testid, paper, lastIndex, posts}) => {
    const navigate = useNavigate();
    const [minutes, setMinutes ] = useState(1);
    const [seconds, setSeconds ] =  useState(10);
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

    const submitTest = () =>{
        let c = 0;
        for(var i = 0; i < lastIndex; i++)
        {
            var resUser = localStorage.getItem(testid +"#"+(i + 1));
            var result = posts[i].result;

            if(resUser == result)
            {
                c = c + 1;
            }
        }

        var res = (c/lastIndex)*100;
        
        var today = new Date();
        const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

        //localStorage.removeItem("viren")
        const user = localStorage.getItem("currentUser");
        var existingEntries = JSON.parse(localStorage.getItem(user + "data"));
        if(existingEntries == null) existingEntries = [];
        var testObject ={testid:testid, 
                        paper:paper,
                        res:res,
                        date:date
                        };

        localStorage.setItem('testObject', JSON.stringify(testObject));
        existingEntries.push(testObject);
        
        localStorage.setItem((user + "data"), JSON.stringify(existingEntries));

        let path = `/testresult?testid=${testid}&paper=${paper}&&score=${res}&&date=${date}`; 
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