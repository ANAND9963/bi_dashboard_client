// import React, { useEffect, useState } from 'react';
// import ReactEcharts from "echarts-for-react";
// const getOption=()=>{
//     const option = {
//         tooltip: { trigger: 'axis' },
//         xAxis: {
//           type: 'category',
//           data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//         },
//         yAxis: {
//           type: 'value'
//         },
//         series: [
//           {
//             data: [120, 200, 150, 80, 70, 110, 130],
//             type: 'bar'
//           }
//         ]
//       };
//       return option;
      
//     };
// function Bar() {
//     let [option,setOption]=useState(getOption);
  
  
//   return (
   
//       <ReactEcharts option={option} theme="dark" notMerge={true}
//       lazyUpdate={true} style={{ height: '400px', width: '100%' }}/>
 
//   )
// }

// export default Bar