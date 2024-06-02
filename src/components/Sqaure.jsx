import {useState} from 'react';
const Sqaure = ({value,onSqaureClick}) => {

    return ( 
        <button onClick={onSqaureClick} className='border border-1 border-black p-2 h-10 font-bold text-xl '>{value}</button>
    
     );
}
 
export default Sqaure;