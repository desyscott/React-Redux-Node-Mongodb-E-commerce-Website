import React from 'react'
import Skeleton from 'react-loading-skeleton'
import "./index.css"

const CardSkeleton=({cards})=> {
  return Array(cards).fill(0).map((item,index)=>(
      <div key={index} className="card-skeleton">
      <div className="card-img">
        <Skeleton rectangle width={"100%"} height={"100%"}/>
      </div>
      <div className="card-info">
      <Skeleton className="card-name" width={"50%"}/>
      <Skeleton width={"70%"}/>
      <Skeleton  width={60} />
      </div>
     </div>))
    
  
}

export default CardSkeleton