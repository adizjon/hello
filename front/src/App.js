import {BrowserRouter, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Login from "./Components/Login";
import {useEffect, useState} from "react";
import axios from "axios";
import Admin from "./Components/Admin";
import UniversalTable from "./Components/UniversalTable";


function App() {
    const [users, setUsers] = useState([])
    const [columns, setColumns] = useState([
        {
            title: "Body",
            key: "body",
            dataType: "text",
            show: true
        },
        {
            title: "Name",
            key: "name",
            dataType: "text",
            show: true
        },
        {
            title: "Email",
            key: "email",
            dataType: "text",
            show: true
        }
    ])
    useEffect(()=>{
        axios({
            url: "https://jsonplaceholder.typicode.com/comments",
            method: "get"
        }).then(res=>{
            setUsers(res.data)
        })
    },[])

    // const [user, setUser]=useState("")
    // const location=useLocation();
    // const permissions=[
    //     {url:"/admin", role:"ROLE_SUPER_ADMIN"}
    // ]
    // const navigate= useNavigate()
    // function checkFree(){
    //     let arr=[]
    //     permissions.map(item =>{
    //         if(item.url === location.pathname){
    //             arr.push(item.role)
    //         }
    //     })
    //     if(arr.length===0){
    //         return ["FREE"]
    //     }
    //     return arr;
    // }
    // useEffect(()=>{
    //     axios.get("http://localhost:8080/api/auth/getMe?accessToken="+localStorage.getItem("accessToken")).then(res=>{
    //         console.log(res.data.data)
    //         let user=res.data.data.roles
    //         let permittedRoles=checkFree()
    //         if(permittedRoles[0]!=="FREE"){
    //             let a=0
    //             user.map(item=>{
    //
    //                 if(permittedRoles.includes(item.name)){
    //                     a=1
    //                 }
    //             })
    //             if(a===1){
    //                 navigate(location.pathname)
    //             }else {
    //                 navigate("/404")
    //
    //             }
    //         }
    //         setUser(res.data)
    //     }).catch(err=>{
    //         let checkPath=checkFree()
    //         if(checkPath[0]!=="FREE"){
    //             navigate("/404")
    //         }
    //     })
    // },[location.pathname])
    return (
        // <Routes>
        //     <Route path={"/"} element={<Login/>}/>
        //     <Route path={"/admin"} element={<Admin/>}/>
        // </Routes>
        <div>
            <UniversalTable data={users} columns1={columns} api={"https://jsonplaceholder.typicode.com/comments?_page={page}&_limit={limit}"} />
        </div>
    );
}

export default App;
