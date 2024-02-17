import React from 'react'

const Rectangle = (props) => {
    const {h, w, rounded, m} = props;
  return (
    <>
    <div className={`bg-gray-50 ${h} ${w} ${rounded} ${m} relative overflow-hidden`}>
        <div className='absolute w-2/4 h-full bg-green-400 drop-shadow-xl -skew-x-12 shimmer'></div>
    </div>
    </>
  )
}

export default Rectangle;
