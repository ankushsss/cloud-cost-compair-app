import React, { useState, useEffect } from "react";
import { Avatar, Box, Hidden, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataInvoices } from "../data/mockData";
import axios from "axios";
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
      Aws: [],
      Azure: [],
      GCP: []
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
        'Ocp-Apim-Subscription-Key': '7b77ee525f724612b3c79a9735c8dd87'
      },
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  function callApiAccordingGenerationAndOs(e) {

    console.log(e.target.value)
    if (document.getElementById("selectGeneration").value === "Current Generation" && document.getElementById("selectOperatingSystem").value === "Window") {
      getData("https://costunify-optimization.azure-api.net/all-cloud-pricing/getCurrentEC2InstanceWindowsPricing").then((res) => {
        console.log(res.data.data)//previous window
        setSelectedArrayData(res.data.data)


      })


    }
    else if (document.getElementById("selectGeneration").value === "Current Generation" && document.getElementById("selectOperatingSystem").value === "Linux") {
      getData("https://costunify-optimization.azure-api.net/all-cloud-pricing/getCurrentEC2LnstanceLinuxPricing").then((res) => {
        console.log(res)//current linux
        setSelectedArrayData(res.data.data)

      })
    }
    else if (document.getElementById("selectGeneration").value === "Previous Generation" && document.getElementById("selectOperatingSystem").value === "Window") {
      getData("https://costunify-optimization.azure-api.net/all-cloud-pricing/getAWSEC2PrevGenerationWindowsInstancesPricing").then((res) => {
        setSelectedArrayData(res.data.data)


      })
    }
    else if (document.getElementById("selectGeneration").value === "Previous Generation" && document.getElementById("selectOperatingSystem").value === "Linux") {
      getData("https://costunify-optimization.azure-api.net/all-cloud-pricing/getAWSEC2PrevGenerationLinuxInstancesPricing").then((res) => {
        setSelectedArrayData(res.data.data)
      })
    }
  }

  useEffect(() => {
    // getData("https://costunify-optimization.azure-api.net/all-cloud-pricing/getAWSEC2PrevGenerationLinuxInstancesPricing").then((res)=>{
    //           console.log(res.data.data)//previous window
    //          setSelectedArrayData(res.data.data)


    //       })
    const fetchData = async () => {
      try {
        const res = await axios.get('https://price-comparison-apim.azure-api.net/fnapp-price-comparison-dev/getPriceComparisonDemoFile', {
          headers: { 'Ocp-Apim-Subscription-Key': '8991cef815bb4884bb632e95c19b0d89' }
        });
        console.log(res.data, "10000")
        let comparison = res.data.data // Log the response data
      // Return the response data
      comparison.map((res) => {

        console.log(res, "rd")
  
      })
      var awsArray = comparison.filter(function (item) {
        console.log(item,"108");  
        return item.CloudProvider == "AWS";
      });
      var AzureArray = comparison.filter(function (item) {
        return item.CloudProvider == "Azure";
      });
  
      var GcpArray = comparison.filter(function (item) {
        return item.CloudProvider == "GCP";
      });
      console.log(awsArray, "arrayData")
      console.log(AzureArray, "arrayData")
      console.log(GcpArray, "arrayData")
  
      // if(awsArray.length < AzureArray.length)
      let maxLength = Math.max(awsArray.length, AzureArray.length, GcpArray.length)
      let outerObject = {}
      let outerArray = []
  
      for (let combineRow = 0; combineRow < maxLength; combineRow++) {
        outerObject = {
          id: combineRow,
  
  
  
          awsInstanceType: awsArray[combineRow] ? awsArray[combineRow].InstanceType : "",
          awsvCPU: awsArray[combineRow] ? awsArray[combineRow].vCPU : "",
          awsMemory: awsArray[combineRow] ? awsArray[combineRow].Memory : "",
          awsPrice: awsArray[combineRow] ? `${awsArray[combineRow].Price}` : "",
          awsOs: awsArray[combineRow] ? `${awsArray[combineRow].OperatingSystem}` : "",
          awsLocation: awsArray[combineRow] ? `${awsArray[combineRow].Location}` : "",
  
  
  
  
  
          azureInstanceType: AzureArray[combineRow] ? AzureArray[combineRow].InstanceType : "",
          azureVCPU: AzureArray[combineRow] ? AzureArray[combineRow].vCPU : "",
          azureMemory: AzureArray[combineRow] ? AzureArray[combineRow].Memory : "",
          azurePrice: AzureArray[combineRow] ? `${AzureArray[combineRow].Price}` : "",
          azureOs: AzureArray[combineRow] ? `${AzureArray[combineRow].OperatingSystem}` : "",
          azureLocation: AzureArray[combineRow] ? `${AzureArray[combineRow].Location}` : "",
  
  
  
  
  
          gcpArrayInstanceType: GcpArray[combineRow] ? GcpArray[combineRow].InstanceType : "",
          gcpVCPU: GcpArray[combineRow] ? GcpArray[combineRow].vCPU : "",
          gcpMemory: GcpArray[combineRow] ? GcpArray[combineRow].Memory : "",
          gcpPrice: GcpArray[combineRow] ? `${GcpArray[combineRow].Price}` : "",
          gcpOs: GcpArray[combineRow] ? `${GcpArray[combineRow].OperatingSystem}` : "",
          gcpLocation: GcpArray[combineRow] ? `${GcpArray[combineRow].Location}` : "",
  
  
  
  
  
        }
        outerArray.push(outerObject)
      }
      console.log(outerArray, "outerArray")
      setNewRowData(outerArray)
      setFilterNewRowData(outerArray)
      } catch (err) {
        console.log(err, "err"); // Log any errors
        return null; // Return null to indicate an error
      }
    };
    fetchData();
    console.log("ehllo");
    // setSelectedArrayData(comparison)

  



  }, [])
  const columns = [
    {
      field: "awsInstanceType",
      headerName: "Capacity",
      cellClassName: "name-column--cell",
      width: 350,
      renderCell: (params) => {
        return params.row.azurePrice ? <div style={{ color: "#2e2e33" }}><p style={{ color: "#2e2e33" }}>{params.row.azureLocation}<br /> {params.row.azureOs} <br />vCPU:{params.row.azureVCPU}<br />Memory:{params.row.azureMemory}<br /></p></div> : "";
      }
    },
    {
      field: "awsPrice",
      headerName: "Price",
      cellClassName: "name-column--cell",
      width: 350,
      renderHeader: (params) => {
        return <Avatar variant="square" src="aws_dark.svg" />
      },
      renderCell: (params) => {
        return params.row.awsInstanceType ? <div>
          {parseFloat(parseInt(params.row.awsPrice) / 720).toFixed(2) == Math.max(params.row.gcpPrice ? parseFloat(parseInt(params.row.gcpPrice) / 720).toFixed(2) : null, params.row.awsPrice ? parseFloat(parseInt(params.row.awsPrice) / 720).toFixed(2) : null, params.row.azurePrice ? parseFloat(parseInt(params.row.azurePrice) / 720).toFixed(2) : null) ? <div style={{ color: "red" }}><p style={{ color: '#2e2e33' }}>{params.row.awsInstanceType}</p><label >OnD: $ <b>{parseFloat(params.row.awsPrice).toFixed(2)}</b> /month</label><br /> <div style={{ color: 'red' }}>OnD: $ <b>{parseFloat(parseInt(params.row.awsPrice) / 720).toFixed(2)}</b> /hour</div></div> :
            parseFloat(parseInt(params.row.awsPrice) / 720).toFixed(2) == Math.min(params.row.gcpPrice ? parseFloat(parseInt(params.row.gcpPrice) / 720).toFixed(2) : 1000, params.row.awsPrice ? parseFloat(parseInt(params.row.awsPrice) / 720).toFixed(2) : 1000, params.row.azurePrice ? parseFloat(parseInt(params.row.azurePrice) / 720).toFixed(2) : 1000) ? <div style={{ color: "green" }}><p style={{ color: "#2e2e33" }}>{params.row.awsInstanceType}</p><label >OnD: $ <b>{parseFloat(params.row.awsPrice).toFixed(2)}</b> /month</label><br /> <div style={{ color: 'green' }}>OnD: $ <b>{parseFloat(parseInt(params.row.awsPrice) / 720).toFixed(2)}</b> /hour</div> </div> :
              <div><p style={{ color: "#2e2e33" }}>{params.row.awsInstanceType}</p><label >OnD: $ <b>{parseFloat(params.row.awsPrice).toFixed(2)}</b> /month</label><br />
                <div>OnD: $ <b>{parseFloat(parseInt(params.row.awsPrice) / 720).toFixed(2)}</b> /hour</div></div>}
        </div> : ""
      }

    },
    {
      field: "azureInstanceType",
      headerName: "InstanceType",
      cellClassName: "name-column--cell",
      width: 350,
      renderHeader: (params) => {
        return <Avatar src="Azure_logo.svg" />
      },
      renderCell: (params) => {
        return params.row.azureInstanceType ? <div>
          {parseFloat(parseInt(params.row.azurePrice) / 720).toFixed(2) == Math.max(params.row.gcpPrice ? parseFloat(parseInt(params.row.gcpPrice) / 720).toFixed(2) : null, params.row.awsPrice ? parseFloat(parseInt(params.row.awsPrice) / 720).toFixed(2) : null, params.row.azurePrice ? parseFloat(parseInt(params.row.azurePrice) / 720).toFixed(2) : null) ? <div style={{ color: "red" }}><p style={{ color: "#2e2e33" }} >{params.row.azureInstanceType}</p><label>OnD: $ <b>{parseFloat(params.row.azurePrice).toFixed(2)}</b> /month</label><br /> <div style={{ color: 'red' }}>OnD: $ <b>{parseFloat(parseInt(params.row.azurePrice) / 720).toFixed(2)}</b> /hour</div> </div> :
            parseFloat(parseInt(params.row.azurePrice) / 720).toFixed(2) == Math.min(params.row.gcpPrice ? parseFloat(parseInt(params.row.gcpPrice) / 720).toFixed(2) : 1000, params.row.awsPrice ? parseFloat(parseInt(params.row.awsPrice) / 720).toFixed(2) : 1000, params.row.azurePrice ? parseFloat(parseInt(params.row.azurePrice) / 720).toFixed(2) : 1000) ? <div style={{ color: "green" }}><p style={{ color: "#2e2e33" }} >{params.row.azureInstanceType}</p><label>OnD: $ <b>{parseFloat(params.row.azurePrice).toFixed(2)}</b> /month</label><br /> <div style={{ color: 'green' }}>OnD: $ <b>{parseFloat(parseInt(params.row.azurePrice) / 720).toFixed(2)}</b> /hour</div></div> :
              <div><p style={{ color: "#2e2e33" }}>{params.row.azureInstanceType}</p><label>OnD: $ <b>{parseFloat(params.row.azurePrice).toFixed(2)}</b> /month</label><br /> OnD: $ <b>{parseFloat(parseInt(params.row.azurePrice) / 720).toFixed(2)} </b>/hour</div>}
        </div> : "";
      }
    },
    {
      field: "gcpArrayInstanceType",
      headerName: "gcpInstanceType",
      cellClassName: "name-column--cell",
      width: 350,

      renderHeader: (params) => {
        return <Avatar sx={{ objectFit: 'contain' }} src="GCP_logo.svg" />
      },
      renderCell: (params) => {
        return params.row.gcpArrayInstanceType ? <div>
          {
            parseFloat(parseInt(params.row.gcpPrice) / 720).toFixed(2) == Math.max(params.row.gcpPrice ? parseFloat(parseInt(params.row.gcpPrice) / 720).toFixed(2) : null, params.row.awsPrice ? parseFloat(parseInt(params.row.awsPrice) / 720).toFixed(2) : null, params.row.azurePrice ? parseFloat(parseInt(params.row.azurePrice) / 720).toFixed(2) : null) ? <div style={{ color: "red" }}><p style={{ color: "#2e2e33" }} >{params.row.gcpArrayInstanceType}</p><label>OnD: $ <b>{parseFloat(params.row.gcpPrice).toFixed(2)}</b> /month</label><br /> <div style={{ color: 'red' }}>OnD: $ <b>{parseFloat(parseInt(params.row.gcpPrice) / 720).toFixed(2)}</b> /hour</div></div> :
              parseFloat(parseInt(params.row.gcpPrice) / 720).toFixed(2) == Math.min(params.row.gcpPrice ? parseFloat(parseInt(params.row.gcpPrice) / 720).toFixed(2) : 1000, params.row.awsPrice ? parseFloat(parseInt(params.row.awsPrice) / 720).toFixed(2) : 1000, params.row.azurePrice ? parseFloat(parseInt(params.row.azurePrice) / 720).toFixed(2) : 1000) ? <div style={{ color: "green" }}><p style={{ color: "#2e2e33" }}>{params.row.gcpArrayInstanceType}</p><label>OnD: $ <b>{parseFloat(params.row.gcpPrice).toFixed(2)}</b> /month</label><br /> <div style={{ color: 'green' }}>OnD: $ <b>{parseFloat(parseInt(params.row.gcpPrice) / 720).toFixed(2)}</b> /hour</div> </div> :
                <div><p style={{ color: "#2e2e33" }}>{params.row.gcpArrayInstanceType}</p><label>OnD: $ <b>{parseFloat(params.row.gcpPrice).toFixed(2)}</b> /month</label><br /><div>OnD: $ <b>{parseFloat(parseInt(params.row.gcpPrice) / 720).toFixed(2)}</b> /hour</div></div>
          }

        </div> : "";
      }
    }
  ];
  const setFilter = (e, type) => {
    console.log(e.target.value)
    if (type == "Os") {
      let newOne = newRowData.filter(function (item) {
        return item.awsOs == e.target.value;
      });

      setFilterNewRowData(newOne)

      console.log(newOne)

    }
    else if (type == "vCPU") {
      let newOne = newRowData.filter(function (item) {
        return item.awsvCPU == e.target.value;
      });

      setFilterNewRowData(newOne)
      console.log(newOne)
    }
    else if (type == "Memory") {
      let newOne = newRowData.filter(function (item) {
        return item.awsMemory == e.target.value;
      });

      setFilterNewRowData(newOne)
      console.log(newOne)
    }
    else if (type == "Location") {
      let newOne = newRowData.filter(function (item) {
        return item.awsLocation == e.target.value;
      });

      setFilterNewRowData(newOne)
      console.log(newOne)
    }
  }
  return (
    <div>
    <img
      src="CloudTrakr.png"
      alt="Picture of the author"
      width={
        '20%'
      }
    />
      <Box m="20px" textAlign="center" >
        <div>
          <Typography variant="h3" sx={{color:'#2e2e33',marginBottom:"20px"}} >Cloud Price Comparision</Typography>
        </div>
        <FormControl sx={{ width: "200px", margin: "0 auto", }}>
          <InputLabel id="demo-simple-select-label"  sx={{ fontWeight: 'bold' }}>Os</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={(e) => setFilter(e, "Os")}
            label="Os"

          >
            <MenuItem value="Linux">Linux</MenuItem>
            <MenuItem value="Window">Window</MenuItem>

          </Select>
        </FormControl>
        <FormControl sx={{ width: "200px", margin: "0 auto", marginLeft: "10px" }}>
          <InputLabel id="demo-simple-select-label"  sx={{ fontWeight: 'bold' }} >vCPU</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={(e) => setFilter(e, "vCPU")}
            label="vCPU"

          >
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="8">8</MenuItem>
            <MenuItem value="12">12</MenuItem>
            <MenuItem value="16">16</MenuItem>
            <MenuItem value="32">32</MenuItem>


          </Select>
        </FormControl>

        <FormControl sx={{ width: "200px", margin: "0 auto", marginLeft: "10px" }}>
          <InputLabel id="demo-simple-select-label"  sx={{ fontWeight: 'bold' }}>Memory</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={(e) => setFilter(e, "Memory")}

            label="Memory"

          >
            <MenuItem value="16 GiB">16</MenuItem>
            <MenuItem value="32 GiB">32</MenuItem>
            <MenuItem value="64 GiB">64</MenuItem>
            <MenuItem value="128 GiB">128</MenuItem>



          </Select>
        </FormControl>
        <FormControl sx={{ width: "200px", margin: "0 auto", marginLeft: "10px" }}>
          <InputLabel id="demo-simple-select-label"  sx={{ fontWeight: 'bold' }}>Location</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={(e) => setFilter(e, "Location")}

            label="Location"

          >
            <MenuItem value="us-west-2">us-west-2</MenuItem>
            <MenuItem value="us-west-1">us-west-1</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box m="20px" sx={{ color: "white" }}>

        <Box
          m="8px 0 0 0"
          height="80vh"
          width='90%'
          margin='0 auto'


          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderColor: "#e6f3ff"
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: "#2e2e33",
              backgroundColor: 'white'
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: '#98d5ed',
              color: "#2e2e33",
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "white",
            },
            "& .MuiDataGrid-footerContainer": {
              // borderTop: "none",
              backgroundColor: '#98d5ed',
              color: "#2e2e33"
            },
            "& .MuiCheckbox-root": {
              color: `#2e2e33`,
            },
            "& .MuiChackbox-root": {
              color: `${colors.greenAccent[300]} !important`,
            },
          }}

        >

          <DataGrid rows={filterNewRowData} style={{ backgroundColor: 'white' }} rowHeight={100} getRowId={(row) => row.id} columns={columns} />

        </Box>

      </Box>
    </div>

  );
};

export default CloudPriceComparisonTable;


