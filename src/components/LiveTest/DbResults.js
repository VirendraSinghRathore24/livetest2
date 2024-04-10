import {db} from "../../config/firebase";
import {collection, getDocs, query, where} from "firebase/firestore";

const testCollectionRef = collection(db, "livetests");

export const getLiveTests = async () => {
    try
    {
        const existingData = localStorage.getItem("livetests");

        if(existingData)
        {
            console.log("Data already exists")
            return existingData;
        }
    
        const data = await getDocs(testCollectionRef);
        const filteredData = data.docs.map((doc) => ({...doc.data(), id:doc.id}));
    
        localStorage.setItem("livetests", JSON.stringify(filteredData));
        return filteredData;
    }
    catch(err)
    {
        console.log("error occured while fetching livetests data " + err)
    } 
}

const testCollectionRef1 = collection(db, "livetestcurrent");
export const getAllAnswersByResultId = async (resultid) => {
    try
    {
        var q = query(testCollectionRef1, where('resultid', '==', resultid))

        const pp = await getDocs(q)
        var productArray = [];
        
        for(var snap of pp.docs)
        {
            var data1 = snap.data();
            productArray.push({...data1});
        }

        const prod = productArray[0];
        return JSON.stringify(prod);
    }
    catch(err)
    {

    }
}

export const getLiveTestResult = async () => {
    try
    {
        const data = await getDocs(testCollectionRef1);
        const filteredData = data.docs.map((doc) => ({...doc.data(), id:doc.id}));

        return filteredData;
    }
    catch(err)
    {

    }
}