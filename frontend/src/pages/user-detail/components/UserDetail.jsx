import { useNavigate } from "react-router-dom";

const UserDetail = (props) => {
    const { profile, token } = props;
    const navigate = useNavigate();
    const navigateToAddNewUser = () => {
        navigate('/admin/user/add-user');
    }
    const navigateToChangePassword = () => {
        navigate('/admin/user/changepassword', { state: { profile, token } });
    }

    const navigateToUserList = () => {
        navigate('/admin/userlist')
    }

    return (
        <div className="ml-10">
            <div className="p-2 mb-2 hover:cursor-pointer hover:bg-[#B6D6F2] rounded-3xl" onClick={navigateToUserList}>User List</div>
            <div className="mb-2 p-2 hover:cursor-pointer hover:bg-[#B6D6F2] rounded-3xl" onClick={navigateToAddNewUser}>Add New User</div>
            <div className="p-2 hover:cursor-pointer hover:bg-[#B6D6F2] rounded-3xl" onClick={navigateToChangePassword}>Change Password</div>
        </div>
    )
}
export default UserDetail;
