import React from 'react'
import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <div>
      <img width={40} height={60} alt='loading' src="/logo.png" />
      <div style={{ alignSelf:'center', display: 'flex', justifyContent:'center', marginTop:10 }}>
        <ReactLoading type={'spin'} height={20} width={20}  color="#000" />
      </div>
    </div>
    
  )
}
