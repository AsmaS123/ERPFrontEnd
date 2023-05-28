import Axios from 'axios';
import * as React from 'react';
import apiUrl from '../config/endpoint';
import { useState,useEffect ,useRef} from 'react';


export const FetchDataHook = (props) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        debugger;
        if(props){
          fetchData()
        }
      },[props]);
      
     const fetchData = () => {
        const url = apiUrl+"/"+props;
        fetch(url)
          .then(response => {
            return response.json()
          })
          .then(data => {
            setData(data)
          })
      }
      return data;
}   

// export default FetchDataHook;















      
        // if(props){
        //   // fetch(apiUrl+"/"+props).then((response) => response.json()).then(json => setData(json.data[Object.keys(response.data)[0]]))
        // }
        // Axios({
        //     method: "GET",
        //     url:apiUrl+"/"+props,
        //     }).then((response) => {
        //     debugger;
        //     console.log(response.data)
        //     setData(response.data[Object.keys(response.data)[0]])
        // });