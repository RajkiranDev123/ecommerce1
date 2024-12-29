import UserMenu from "./UserMenu"
import { IoClose } from "react-icons/io5"

const UserMobileMenu = () => {

    return (
        <div className='bg-white p-2'>
            <IoClose className="cursor-pointer ml-auto" onClick={()=>window.history.back()}/>
            <UserMenu />

        </div>
    )
}

export default UserMobileMenu