import React,{useState,useEffect} from 'react';

export default function Grid ({i,j,grid_content}) {

    let grid_id = "grid-"+i+"-"+j;
    let value_id = "value-"+i+"-"+j;
    let temp_class_name = 'grid level-'+grid_content;
    const mapping = {'':"", 2:"NCTU", 4:"NYMU", 8:"NTU", 16:"UCSD", 32:"UBC", 64:"CUHK", 128:"UCLA", 256:"NYU",512:"UCB",1024:"HKUST", 2048:"UTokyo", 4096:"Columbia", 8192:"Yale", 16384:"Cambridge", 32768:"Stanford", 65536:"MIT"}
    // #########################
    // # 1 #2 Modify everything here (including the above one) yourself
    // #########################

    // const [value,setValue] = useState(grid_content);
    // if (value === 0) {
    //     setValue("");
    // }

    

    return (
        <td>
            <div className={temp_class_name} id={grid_id}>
                {grid_content===0?<div className="school-name" id={value_id}>{mapping[""]}</div>:<div className="school-name" id={value_id}>{mapping[grid_content]}</div>}
                
            </div>
        </td>
    );
}