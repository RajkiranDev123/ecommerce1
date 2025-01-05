import React from 'react'
import { useSelector } from 'react-redux'
import { isAdmin } from '../../utils/isAdmin'
const AdminPermissionHOC = ({children}) => {
    const user = useSelector(state => state.user)
    console.log("user from hoc", user)
    const AdminAccess = isAdmin(user?.role)
    return (<>
    {
        AdminAccess?children:<p className='bg-red-500 text-white rounded p-1 '>You don't have access to this page!</p>
    }
    </>)


}

export default AdminPermissionHOC