import React, { useEffect, useState } from 'react';
import ImageUploadComponent from '../../Components/ImageUpload/ImageUpload';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { checkPassword, updateProfile } from '../../Actions/UserActions';
import Spinner from '../../Components/Client/Spinner';

import { jwtDecode as jwt_decode } from 'jwt-decode';
import { DangerAlert, SuccessAlert } from '../../Components/Alert/Alert';
import AddressSelector from '../../Components/Location/AddressSelector';
import normalAvatar from '../../Assets/Client/Images/default-avatar.png';
import { useUser } from '../../Context/UserContext';

import defaultLogo from '../../Assets/Client/Images/huong-sen-logo.png'
import { FetchInfoMembershipCard } from '../../Actions/MembershipActions';
import { formatDateTime } from '../../Utils/FormatDateTime';
import { FetchAllListMemberShipTiers, FetchMembershipTier } from '../../Actions/MembershipTiersActions';
import { formatNumber } from '../../Utils/FormatNumber';

function Account() {
    const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { passwordCheckMessage, error } = useSelector(state => state.user);
    const membershipData = useSelector(state => state.membership);
    const membershipTiersData = useSelector(state => state.membership_tiers);
    const { setUser } = useUser();

    const [profile, setProfile] = useState({
        fullname: '',
        email: '',
        avatar: '',
        tel: '',
        address: ''
    });

    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmNewPassword: false
    });

    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const [activeTab, setActiveTab] = useState('updateInfo');
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [, setInitialAvatar] = useState(null);
    const [, setInitialPassword] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    const [membershipLevel, setMembershipLevel] = useState('');
    const [activeInfoCardTab, setActiveInfoCardTab] = useState(membershipLevel);

    const memberInfo = {
        fullname: membershipData.membership.fullname || 'John Doe',
        membershipLevel: membershipLevel,
        totalPoints: membershipData.membership.point || 0,
        created_at: formatDateTime(membershipData.membership.created_at) || '23/10/2024',
    };

    const membershipLevels = {};
    membershipTiersData.membership_tiers.forEach(tier => {
        // Kiểm tra xem tier.description có tồn tại không
        if (tier.description) {
            const [condition, benefits] = tier.description.split("\r\n\r\n");

            membershipLevels[tier.name] = {
                condition: condition ? condition.replace("Điều kiện: ", "") : "",
                benefits: benefits ? benefits.replace("Ưu đãi: ", "") : ""
            };
        }
    });

    useEffect(() => {
        if (userId) {
            dispatch(FetchInfoMembershipCard(userId));
        }
    }, [dispatch, userId]);

    useEffect(() => {
        dispatch(FetchAllListMemberShipTiers());
    }, [dispatch]);

    useEffect(() => {
        const fetchMembershipData = async () => {
            if (userId) {
                const result = await FetchMembershipTier(userId);
                if (result) {
                    setMembershipLevel(result.tierName);
                }
            }
        };
        fetchMembershipData();
    }, [dispatch, userId]);

    const handleTabChange = (level) => {
        setActiveInfoCardTab(level);
    };

    useEffect(() => {
        setActiveInfoCardTab(membershipLevel);
    }, [membershipLevel]);

    useEffect(() => {
        if (profile.address) {
            setFullAddress(profile.address);
        }
    }, [profile.address]);

    const handleAddressChange = (newAddress) => {
        setFullAddress(newAddress.fullAddress);
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            const decodedToken = jwt_decode(accessToken);
            const userIdFromToken = decodedToken.id;
            setUserId(userIdFromToken);

            const storedProfile = localStorage.getItem('user');
            if (storedProfile) {
                const parsedProfile = JSON.parse(storedProfile);
                setProfile(parsedProfile);

                // Đặt giá trị ban đầu cho form
                setValue('fullname', parsedProfile.fullname);
                setValue('email', parsedProfile.email);
                setValue('tel', parsedProfile.tel);
                setValue('address', parsedProfile.address);

                // Lưu giá trị avatar và password ban đầu
                setInitialAvatar(parsedProfile.avatar);
                setInitialPassword(parsedProfile.password || '');
            }
        }
    }, [setValue]);

    const handleImageUpload = (fileNames) => {
        if (fileNames.length > 0) {
            setValue('avatar', fileNames[0]);
            setProfile(prev => ({ ...prev, avatar: fileNames[0] }));
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        setUser(null);
        navigate('/login');
    };

    const handleUpdateProfile = async (data) => {
        if (!userId) return;

        // Giữ nguyên avatar cũ nếu không thay đổi avatar
        const updatedProfile = {
            ...data,
            address: fullAddress,
            avatar: data.avatar || profile.avatar
        };

        try {
            await dispatch(updateProfile(userId, updatedProfile));
            localStorage.setItem('user', JSON.stringify(updatedProfile));

            setAlert({
                open: true,
                message: 'Profile updated successfully!',
                severity: 'success'
            });

            setProfile(updatedProfile);
        } catch (error) {
            setAlert({
                open: true,
                message: 'Profile update failed!',
                severity: 'error'
            });
        }
    };

    const handleChangePassword = async (data) => {
        try {
            setIsLoading(true);

            const email = profile.email;
            const currentPassword = getValues('currentPassword');
            const result = await dispatch(checkPassword(email, currentPassword));

            if (result === 'Password is correct') {
                await dispatch(updateProfile(userId, { password: data.newPassword }));

                setAlert({
                    open: true,
                    message: 'Password changed successfully!',
                    severity: 'success'
                });
            }
        } catch (error) {
            setAlert({
                open: true,
                message: 'Password change failed!',
                severity: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {isLoading ? <Spinner /> : (
                <>
                    <div className="container-fluid p-0 py-5 bg-dark hero-header mb-5">
                        <div className="container text-center my-5 pt-5 pb-4">
                            <h1 className="display-3 text-white mb-3">Account Information</h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb justify-content-center text-uppercase">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item text-white active">Account</li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                    <div className="container-xxl py-5">
                        <div className="row g-4">
                            <div className="col-md-4">
                                <div className="bg-white p-4 rounded text-center">
                                    <img src={profile.avatar || normalAvatar} alt="Avatar" className="rounded-circle" width="140" height="140" />
                                    <h5 className="text-primary mt-3">Full Name</h5>
                                    <p>{profile.fullname}</p>
                                    <h5 className="text-primary">Email</h5>
                                    <p>{profile.email}</p>
                                    <h5 className="text-primary">Phone Number</h5>
                                    <p>{profile.tel}</p>
                                    <h5 className="text-primary">Address</h5>
                                    <p>{profile.address}</p>
                                    <button className="btn btn-danger w-100" onClick={handleLogout}>Logout</button>
                                </div>
                            </div>
                        </div>

                        <SuccessAlert open={alert.open && alert.severity === 'success'} onClose={() => setAlert({ ...alert, open: false })} message={alert.message} />
                        <DangerAlert open={alert.open && alert.severity === 'error'} onClose={() => setAlert({ ...alert, open: false })} message={alert.message} />
                    </div>
                </>
            )}
        </div>
    );
}

export default Account;
