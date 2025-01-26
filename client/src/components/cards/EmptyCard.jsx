import React from 'react';

const EmptyCard = ({ img=null,message='Nothing here',action=null }) => {
    return (
        <div className='flex flex-col items-center justify-center cursor-pointer' onClick={()=>action(true)}>
            <img src={img} alt="" className='w-60'/>
            <p className="w-1/2 text-sm font-medium text-center leading-7 mt-5">
                {message}
            </p>
        </div>
    );
}

export default EmptyCard;
