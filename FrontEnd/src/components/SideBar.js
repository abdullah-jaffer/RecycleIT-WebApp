import React, {useEffect} from 'react';
import {HorizontalBar} from 'react-chartjs-2';



const SideBar= (props) => {
    const [data, setData] = React.useState(null);
    const [dataset, setDataset] = React.useState(null);
    useEffect(() => {
        if(props.value === 1 || props.value === 2){
            let tempList1 = {};
        
        props.alerts.forEach( function (arrayItem){
           let country = arrayItem.country.trim();
           let i;
            
            if(country.trim() in tempList1){
                tempList1[country.trim()] = tempList1[country.trim()]  + 1;
             }else{
                tempList1[country.trim()] = 1;
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
        <h4>Trash By Country</h4>
        <HorizontalBar
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
  
  export default SideBar;