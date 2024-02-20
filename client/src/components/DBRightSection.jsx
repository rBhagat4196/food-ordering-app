import React from 'react'
import DbHeader from './DbHeader'
import { Route, Routes } from 'react-router-dom'
import {DbHome,DbOrders,DbItems,DbNewItems,DbUsers} from "../components"

const DBRightSection = () => {
  return (
    <div className='flex flex-col py-12 flex-1 h-full px-12'>
      <DbHeader/>
      <div className='flex flex-col flex-1 overflow-y-scroll scrollbar-none'>
        <Routes>
            <Route path="/home" element={<DbHome/>} />
            <Route path="/orders" element={<DbOrders/>} />
            <Route path="/items" element={<DbItems/>} />
            <Route path="/newItems" element={<DbNewItems/>} />
            <Route path="/users" element={<DbUsers/>} />

        </Routes>
      </div>
    </div>
  )
}

export default DBRightSection
