import React, {useEffect} from 'react';
import {Bar} from 'react-chartjs-2';


const BarChart= (props) => {
    const [data, setData] = React.useState(null);
    const [dataset, setDataset] = React.useState(null);
    useEffect(() => {
        if(props.value === 1 || props.value === 2){
            let tempList1 = {};
        
        props.alerts.forEach( function (arrayItem){
           let trash = arrayItem.item_list.split(',');
           let i;
            for(i = 0; i < trash.length; i++){
                if(trash[i].trim() in tempList1){
                    tempList1[trash[i].trim()] = tempList1[trash[i].trim()]  + 1;
                }else{
                    tempList1[trash[i].trim()] = 1;
                }
            }
        });

        setData(tempList1);
        //alert(JSON.stringify(tempList2));
        let data1 = {
            labels: Object.keys(tempList1),
            datasets: [
            {
                label: 'Trash Type',
                backgroundColor: randomColorGenerator,
                borderColor: "white",
                borderWidth: 1,
                hoverBackgroundColor: randomColorGenerator,
                hoverBorderColor: randomColorGenerator,
                data: Object.values(tempList1)
            }
            ]
        };
          setDataset(data1);
        }else{

        }
          
        },[] );

      var randomColorGenerator = function () { 
          return '#' + (Math.random().toString(16) + '0000000').slice(2, 8); 
      };

    return (
        <div>
        <h4>{props.type? <div>Most Disposed Trash By Type</div>: <div>All Trash Types</div>}</h4>
        <Bar
          data={dataset}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: true,
            scales: {
              xAxes: [{
                  gridLines: {
                      display:false
                  },
                  ticks: {
                    
                    fontSize: 18
                }
              }],
              yAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontSize: 18
                }
            }]
           
    }
          }}
        />
      </div>
    );
  };
  
  export default BarChart;