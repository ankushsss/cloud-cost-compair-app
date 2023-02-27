import React,{useState,useEffect} from "react";
import { Avatar, Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataInvoices } from "../data/mockData";
import comparison from "../comparison.json"

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import azure from "../azure.png"


const CloudPriceComparisonTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedArrayData, setSelectedArrayData] = useState([])
  const [selectedNewArrayData, setSelectedNewArrayData] = useState([])
  // const [filterselectedNewArrayData, setSelectedNewArrayData] = useState([])

  const [tables, setTAbles] = useState(
    {
      Aws:[],
      Azure:[],
      GCP:[]
    }
)
const [newRowData, setNewRowData] = useState([])
const [filterNewRowData, setFilterNewRowData] = useState([])



  async function getData(url) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'get', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key':'7b77ee525f724612b3c79a9735c8dd87'
      },
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  function callApiAccordingGenerationAndOs(e) {

    console.log(e.target.value)
    if(document.getElementById("selectGeneration").value === "Current Generation" && document.getElementById("selectOperatingSystem").value === "Window")
    {
        getData("https://costunify-optimization.azure-api.net/all-cloud-pricing/getCurrentEC2InstanceWindowsPricing").then((res)=>{
            console.log(res.data.data)//previous window
           setSelectedArrayData(res.data.data)

           
        })

      
    }
    else if(document.getElementById("selectGeneration").value === "Current Generation" && document.getElementById("selectOperatingSystem").value === "Linux")
    {
        getData("https://costunify-optimization.azure-api.net/all-cloud-pricing/getCurrentEC2LnstanceLinuxPricing").then((res)=>{
            console.log(res)//current linux
            setSelectedArrayData(res.data.data)
    
        })
    }
    else if(document.getElementById("selectGeneration").value === "Previous Generation" && document.getElementById("selectOperatingSystem").value === "Window")
    {
        getData("https://costunify-optimization.azure-api.net/all-cloud-pricing/getAWSEC2PrevGenerationWindowsInstancesPricing").then((res)=>{
            setSelectedArrayData(res.data.data)

            
        })
    }
    else if(document.getElementById("selectGeneration").value === "Previous Generation" && document.getElementById("selectOperatingSystem").value === "Linux"){
        getData("https://costunify-optimization.azure-api.net/all-cloud-pricing/getAWSEC2PrevGenerationLinuxInstancesPricing").then((res)=>{
            setSelectedArrayData(res.data.data)
        })
    }
}

useEffect(() => {
  // getData("https://costunify-optimization.azure-api.net/all-cloud-pricing/getAWSEC2PrevGenerationLinuxInstancesPricing").then((res)=>{
  //           console.log(res.data.data)//previous window
  //          setSelectedArrayData(res.data.data)

           
  //       })

  setSelectedArrayData(comparison)

  console.log(comparison,"comparison")
  comparison.map((res)=>{

    console.log(res,"rd")
     
  })
  var awsArray = comparison.filter(function(item)
 {
  return item.CloudProvider == "AWS";
 });
 var AzureArray = comparison.filter(function(item)
 {
  return item.CloudProvider == "Azure";
 });

 var GcpArray = comparison.filter(function(item)
 {
  return item.CloudProvider == "GCP";
 });
  console.log(awsArray,"arrayData")
  console.log(AzureArray,"arrayData")
  console.log(GcpArray,"arrayData")

  // if(awsArray.length < AzureArray.length)
  let maxLength = Math.max(awsArray.length, AzureArray.length, GcpArray.length)
  let outerObject = {}
  let outerArray = []

  for(let combineRow = 0;combineRow<maxLength;combineRow++)
  {
    outerObject = {
      id:combineRow,


     
      awsInstanceType:awsArray[combineRow]?awsArray[combineRow].InstanceType:"",
      awsvCPU:awsArray[combineRow]?awsArray[combineRow].vCPU:"",
      awsMemory:awsArray[combineRow]?awsArray[combineRow].Memory:"",
      awsPrice:awsArray[combineRow]?`${awsArray[combineRow].Price}`:"",
      awsOs:awsArray[combineRow]?`${awsArray[combineRow].OperatingSystem}`:"",
      awsLocation:awsArray[combineRow]?`${awsArray[combineRow].Location}`:"",
      




      azureInstanceType:AzureArray[combineRow]?AzureArray[combineRow].InstanceType:"",
      azureVCPU:AzureArray[combineRow]?AzureArray[combineRow].vCPU:"",
      azureMemory:AzureArray[combineRow]?AzureArray[combineRow].Memory:"",
      azurePrice:AzureArray[combineRow]?`${AzureArray[combineRow].Price}`:"",
      azureOs:AzureArray[combineRow]?`${AzureArray[combineRow].OperatingSystem}`:"",
      azureLocation:AzureArray[combineRow]?`${AzureArray[combineRow].Location}`:"",





      gcpArrayInstanceType:GcpArray[combineRow]?GcpArray[combineRow].InstanceType:"",
      gcpVCPU:GcpArray[combineRow]?GcpArray[combineRow].vCPU:"",
      gcpMemory:GcpArray[combineRow]?GcpArray[combineRow].Memory:"",
      gcpPrice:GcpArray[combineRow]?`${GcpArray[combineRow].Price}`:"",
      gcpOs:GcpArray[combineRow]?`${GcpArray[combineRow].OperatingSystem}`:"",
      gcpLocation:GcpArray[combineRow]?`${GcpArray[combineRow].Location}`:"",





    }
    outerArray.push(outerObject)
  }
     console.log(outerArray,"outerArray")
     setNewRowData(outerArray)
     setFilterNewRowData(outerArray)



}, [])
  const columns = [
    {
      field: "awsInstanceType",
      headerName: "Capacity",
      cellClassName: "name-column--cell",
      width: 350,
      renderCell: (params) => {
        return params.row.awsInstanceType?<div style={{color:"black"}}><p style={{color:"grey"}}>memory:{params.row.awsMemory}<br/>vCpu:{params.row.awsvCPU}<br/>OS:{params.row.awsOs}</p></div>:"";
      }
    },
    {
      field: "awsPrice",
      headerName: "Price",
      cellClassName: "name-column--cell",
      width: 350,
      renderHeader:(params)=>{
        return <Avatar src="aws.png"/>
      },
      renderCell:(params)=>{
        return params.row.awsInstanceType?<div><p style={{color:"black"}}  >{params.row.awsInstanceType}</p><label >$ {params.row.awsPrice}/month</label><br/>
        <label style={parseInt(params.row.awsPrice)/720<parseInt(params.row.azurePrice)/720?{color:"blue"}:{color:"red"}}>$ {parseFloat(parseInt(params.row.awsPrice)/720).toFixed(2)}/day</label></div>:""
      }

    },
    {
      field: "azureInstanceType",
      headerName: "InstanceType",
      cellClassName: "name-column--cell",
      width:350,
      renderHeader:(params)=>{
        return <Avatar src="azure.jpg"/>
      },
         renderCell: (params) => {
        return params.row.azureInstanceType? <div><p style={{color:"black"}}>{params.row.azureInstanceType}</p>{params.row.azurePrice}</div>:"";
      }
    },
    {
      field: "gcpArrayInstanceType",
      headerName: "gcpInstanceType",
      cellClassName: "name-column--cell",
      width:350,

      renderHeader:(params)=>{
        return <Avatar src="gcp.png"/>
      },
      renderCell: (params) => {
        return params.row.gcpArrayInstanceType? <div><p style={{color:"black"}}>{params.row.gcpArrayInstanceType}</p>{params.row.gcpPrice}</div>:"";
      }
    }
  ];
  const  setFilter = (e,type) =>
  {
    console.log(e.target.value)
    if(type == "Os")
    {
      let newOne = newRowData.filter(function(item)
            {
              return item.awsOs == e.target.value;
            });

            setFilterNewRowData(newOne)
    
            console.log(newOne)
        
    }
    else if(type == "vCPU")
    {
      let newOne = newRowData.filter(function(item)
            {
              return item.awsvCPU == e.target.value;
            });

            setFilterNewRowData(newOne)     
            console.log(newOne)
    }
    else if(type == "Memory")
    {
      let newOne = newRowData.filter(function(item)
            {
              return item.awsMemory == e.target.value;
            });

            setFilterNewRowData(newOne)     
            console.log(newOne)
    }
    else if(type == "Location")
    {
      let newOne = newRowData.filter(function(item)
            {
              return item.awsLocation == e.target.value;
            });

            setFilterNewRowData(newOne)     
            console.log(newOne)
    }
  }
  return (
    <div>
    <Box m="20px" textAlign="center" >
    <FormControl sx={{width:"200px", margin:"0 auto",}}>
    <InputLabel id="demo-simple-select-label">Os</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      onChange={(e)=>setFilter(e,"Os")}
      label="Os"
   
    >
      <MenuItem value="Linux">Linux</MenuItem>
      <MenuItem value="Window">Window</MenuItem>
     
    </Select>
  </FormControl>
  <FormControl sx={{width:"200px",margin:"0 auto",marginLeft:"10px"}}>
    <InputLabel id="demo-simple-select-label">vCPU</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      onChange={(e)=>setFilter(e,"vCPU")}
      label="vCPU"
   
    >
      <MenuItem value="4">4</MenuItem>
      <MenuItem value="8">8</MenuItem>
      <MenuItem value="12">12</MenuItem>
      <MenuItem value="16">16</MenuItem>
      <MenuItem value="32">32</MenuItem>


    </Select>
  </FormControl>
  
  <FormControl sx={{width:"200px",margin:"0 auto",marginLeft:"10px"}}>
  <InputLabel id="demo-simple-select-label">Memory</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    onChange={(e)=>setFilter(e,"Memory")}
   
    label="Memory"
 
  >
    <MenuItem value="16 GiB">16</MenuItem>
    <MenuItem value="32 GiB">32</MenuItem>
    <MenuItem value="64 GiB">64</MenuItem>
    <MenuItem value="128 GiB">128</MenuItem>



  </Select>
</FormControl>
  <FormControl sx={{width:"200px",margin:"0 auto",marginLeft:"10px"}}>
  <InputLabel id="demo-simple-select-label">Location</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    onChange={(e)=>setFilter(e,"Location")}
   
    label="Location"
 
  >
    <MenuItem value="us-west-2">us-west-2</MenuItem>
    <MenuItem value="us-west-1">us-west-1</MenuItem>
  </Select>
</FormControl>
</Box>
    <Box m="20px" sx={{color:"white"}}>
   
      <Box
        m="8px 0 0 0"
        width="100%"
        height="80vh"
        
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: "black",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.primary[400],
            color:"black",
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            // borderTop: "none",
            backgroundColor: colors.primary[400],
            color:"black"
          },
          "& .MuiCheckbox-root": {
            color: `black`,
          },
          "& .MuiChackbox-root": {
            color: `${colors.greenAccent[300]} !important`,
          },
        }}

      >
    
        <DataGrid  rows={filterNewRowData} rowHeight={100} getRowId={(row)=>row.id} columns={columns} />

      </Box>
      
    </Box>
    </div>

  );
};

export default CloudPriceComparisonTable;
