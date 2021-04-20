import Grid from '../components/Grid'
export default function Row ({i,row_vec}) {
    // console.log(row_vec);
  
    return (
        <tr>
          {row_vec.map((grid_content,grid_idx)=>(<Grid i={i} j={grid_idx} key={grid_idx} grid_content={grid_content} />))}
        
        </tr>
    );
};
