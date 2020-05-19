import React, {useEffect} from 'react';
import {Line} from 'react-chartjs-2';


const RadarChart= (props) => {
    const [data, setData] = React.useState(null);
    const [dataset, setDataset] = React.useState(null);
    useEffect(() => {
        if(props.value === 1){
            let data1 = {
                labels: props.values,
                datasets: [
                  {
                    label: 'Disposal Days',
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
                    data: props.values
                  }
                ]
              };
    
              setDataset(data1);
        }else{

        }
        
        //alert(JSON.stringify(tempList2));
        
          
        },[] );
    return (
        <div>
        <h4>Average Duration By Days</h4>
        <Line data={dataset}
        width={100}
        height={50}
        options={{
          maintainAspectRatio: true
        }} />
      </div>
    );
  };
  
  export default RadarChart;
