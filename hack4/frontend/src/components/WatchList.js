import constants from '../constants';  
// Look at this file and see how the watchList is strucutred
import { useQuery } from '@apollo/react-hooks';
import { STATSCOUNT_QUERY } from '../graphql';


export default function WatchList() {
    // TODO
    // query countStats
    // save the result in a counts variable
    const { loading, error, data, subscribeToMore } = useQuery(STATSCOUNT_QUERY);
    const counts = null;

    // TODO
    // use subscription
    // console.log("constants: ", constants)
    // console.log("loading data: ", loading?loading({
    //                             variables:{
    //                                 severity:1,
    //                                 locationKeywords:"基隆市"
    //                             }}):false)
    
    // DO NOT MODIFY BELOW THIS LINE
    return (
        <table>
        <tbody>
            <tr>
                <th>Keyword</th>
                <th>Count</th>
            </tr>
            {
                constants.watchList.map(
                    (keyword, idx) => {
                        console.log()
                        return (<tr key={keyword}>
                                    <td>{keyword}</td>
                                    {/* You might need to see this */}
                                    <td id={`count-${idx}`}>{!counts || ! counts.statsCount || counts.statsCount[idx]}</td>
                                </tr>)
                    }
                    
                )
            }
        </tbody>
        </table>
    );
}