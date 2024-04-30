import {useState} from 'react';
import Password from './Password';
import EditProfile from './EditProfile';

const Profile = () => {
    const authToken = localStorage.getItem('token')
    // const config = {'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NmQ3YTQyODJiYmE2MzJjZDVjZjBlMCIsInRva2VuVmVyc2lvbiI6MCwiaWF0IjoxNzAxNjczNTcyfQ.ddG0VTMD-ZE0dJxGQL5SbHtAQyqO2MlZ_U121M5B8gY"};
    console.log(authToken)
    const [isChangePassword, setIsChangePassword] = useState(false)
    const [config, setConfig] = useState({'Authorization': authToken});

    return (
            <div className="col-start-3 col-span-8 gap-3 max-w-[1536px]" id="main-components">
                {isChangePassword
                ?
                    <Password action={() => setIsChangePassword(!isChangePassword)} config={config} changeConfig={(newConfig) => setConfig(newConfig)}></Password>
                :
                    <EditProfile action={() => setIsChangePassword(!isChangePassword)} config={config} ></EditProfile>
                }
            </div>
  );
};
export default Profile;
