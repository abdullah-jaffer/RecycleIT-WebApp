import React, {useEffect} from 'react';
import {Pie} from 'react-chartjs-2';


const PieChart= (props) => {
    function getTrash(trash, indice){
        let values = [];
        for(let i = 0; i < trash.length; i++){
            values[i] = trash[i][indice];
        }
        return values;
    }
    const [data, setData] = React.useState(null);
    const [dataset, setDataset] = React.useState(null);
    useEffect(() => {
        if(props.value === 1){
        let tempList1 = {};
        tempList1['Personal'] = 0;
        tempList1['Public'] = 0;
        
        props.alerts.forEach( function (arrayItem){
            if(arrayItem.type === 'PER'){
                tempList1['Personal'] = tempList1['Personal'] + 1;
            }else{
                tempList1['Public'] = tempList1['Public'] + 1;
            }
            
        });

        setData(tempList1);
        //alert(JSON.stringify(tempList2));
        let data1 = {
            labels: Object.keys(tempList1),
            datasets: [{
                data: Object.values(tempList1),
                backgroundColor: [
                '#ffc107',
                '#c62828',
                ],
                hoverBackgroundColor: [
                '#ffce3a',
                '#da4747',
                
                ]
            }]
        };
          setDataset(data1);
        }else{
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
            
            
            let sortable = Object.entries(tempList1)
            
            sortable.sort(function(a,b){
                return b[1] - a[1];
            });
            
            setData(tempList1);
           // alert(sortable.slice(sortable.length-3, sortable.length));
            //alert(JSON.stringify(tempList2));
            let data1 = {
                labels: getTrash(sortable.slice(0, 3), 0),
                datasets: [{
                    data: getTrash(sortable.slice(0, 3), 1),
                    backgroundColor: [
                    '#ffc107',
                    '#c62828',
                    '#0d47a1',
                    ],
                    hoverBackgroundColor: [
                    '#ffc107',
                    '#c62828',
                    '#0d47a1',
                    ]
                }]
            };
              setDataset(data1);
        }
          
        },[] );
    return (
        <div>
        <h4>{props.type? <div>Most Common Alert Types</div>: <div>Top 3 Disposables</div>}</h4>
        <Pie data={dataset}
        width={100}
        height={50}
        options={{
          maintainAspectRatio: true
        }} />
      </div>
    );
  };
  
  export default PieChart;
