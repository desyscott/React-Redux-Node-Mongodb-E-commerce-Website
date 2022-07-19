import React from 'react'
import NavBar from "../NavBar/index"
import Footer from "../Footer/index"

const  index= ({children})=> {
  return (
    <div >

      <NavBar />
    
      <div>{children}</div>
      
      {/* <Footer/> */}

    </div>
  )
}

export default index;