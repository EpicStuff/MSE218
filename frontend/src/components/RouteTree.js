import React from "react";

import { useParams } from "react-router-dom"
import Home from "./home/home";


export const RouteTree = () => {
    const params = useParams();
    const uniqueID = params.id
    //fetchByID(Number(uniqueID))
    //console.log("mydata", treeData)
    return <Home uniqueID={Number(uniqueID)} />
}