import React from 'react'
import { NavLink } from 'react-router-dom'
import { isActiveStyles, isNotActiveStyles } from '../utils/styles'

const DBLeftSection = () => {
  return (
    <div className='h-full py-12 flex flex-col bg-lightOverlay backdrop-blur-md shadow-md min-w-210 max-w-300 gap-3'>
      <NavLink to={"/"} className="flex items-center justify-start px-6">
        <img src="/logo.png" className="w-12" alt="" />
        <p className="font-semibold text-xl">FlavorFleet</p>
      </NavLink>
      <hr/>
      <ul className='flex flex-col gap-4'>
      <NavLink
            to={"/dashboard/home"}
            className={({ isActive }) =>
              isActive ? isActiveStyles+ "px-4 py-2 border-l-8 border-red-500": isNotActiveStyles
            }
          >
            Home
          </NavLink>
          <NavLink
            to={"/dashboard/orders"}
            className={({ isActive }) =>
              isActive ? isActiveStyles + "px-4 py-2 border-l-8 border-red-500": isNotActiveStyles
            }
          >
            Orders
          </NavLink>
          <NavLink
            to={"/dashboard/items"}
            className={({ isActive }) =>
              isActive ? isActiveStyles + "px-4 py-2 border-l-8 border-red-500": isNotActiveStyles
            }
          >
            Items
          </NavLink>
          <NavLink
            to={"/dashboard/newItems"}
            className={({ isActive }) =>
              isActive ? isActiveStyles + "px-4 py-2 border-l-8 border-red-500": isNotActiveStyles
            }
          >
            Add new item
          </NavLink> 
          <NavLink
            to={"/dashboard/users"}
            className={({ isActive }) =>
              isActive ? isActiveStyles + "px-4 py-2 border-l-8 border-red-500": isNotActiveStyles
            }
          >
            Users
          </NavLink>  
      </ul>
    </div>
  )
}

export default DBLeftSection