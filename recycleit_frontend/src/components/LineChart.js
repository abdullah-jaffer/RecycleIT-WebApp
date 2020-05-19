import React, {useEffect} from 'react';
import {Line} from 'react-chartjs-2';


const LineChart= (props) => {
    const [data, setData] = React.useState(null);
    const [dataset, setDataset] = React.useState(null);
    useEffect(() => {
      if(props.value === 1){
        let tempList1 = props.alerts;
        tempList1.sort((a,b)=>a.date-b.date);
        let tempList2 = Array();
        
        tempList1.forEach( function (arrayItem){
            if(arrayItem.date in tempList2){
                tempList2[arrayItem.date] = tempList2[arrayItem.date]  + 1;
            }else{
                tempList2[arrayItem.date] = 1;
            }
            
        });

        setData(tempList2);
        //alert(JSON.stringify(tempList2));
        let data1 = {
            labels: Object.keys(tempList2),
            datasets: [
              {
                label: 'Recyclables',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: Object.values(tempList2)
              }
            ]
          };
          setDataset(data1);
        }else{
            let tempList1 = props.alerts;
            tempList1.sort((a,b)=>a.date-b.date);
            let tempList2 = Array();
            let tempList3 = Array();
            tempList1.forEach( function (arrayItem){
              if(arrayItem.type === 'PUB'){
                if(arrayItem.date in tempList2){
                    tempList2[arrayItem.date] = tempList2[arrayItem.date]  + 1;
                }else{
                    tempList2[arrayItem.date] = 1;
                }
                if(!(arrayItem.date in tempList3)){
                  tempList3[arrayItem.date] = 0;
              }
              }else{
                if(arrayItem.date in tempList3){
                  tempList3[arrayItem.date] = tempList3[arrayItem.date]  + 1;
              }else{
                  tempList3[arrayItem.date] = 1;
              }
                if(!(arrayItem.date in tempList2)){
                  tempList2[arrayItem.date] = 0;
            }
              }
                
            });
    
            setData(tempList2);
            //alert(JSON.stringify(tempList2));
            let data1 = {
                 datasets: [
                  {
                    data: Object.values(tempList2),
                    borderColor: ["rgb(0,255,255)"],
                    fill: false,
                    label: "Public"
                  },
                  {
                    data: Object.values(tempList3),
                    borderColor: ["rgb(255,0,0)"],
                    fill: false,
                    label: "Personal"
                  }
                ],
                labels: Object.keys(tempList2)
              }
              setDataset(data1);
          }

         
          
        },[] );
    return (
        <div>
        <h4>{props.type? <div>Trash Disposal Frequency</div>: <div>Trash Disposal By Sector</div>}</h4>
        <Line data={dataset}
        width={100}
        height={50}
        options={{
          maintainAspectRatio: true
        }} />
      </div>
    );
  };
  
  export default LineChart;
