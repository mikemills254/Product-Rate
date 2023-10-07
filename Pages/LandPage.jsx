import React, { useState } from 'react'
import NavBar from '../Components/NavBar'
import { Buttons } from '../Components/styled'
import { AiOutlineArrowRight, AiOutlineGithub, AiOutlineStar, AiOutlineMail, AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'
import { BiSearchAlt, BiLogoFacebook } from 'react-icons/bi'
import { BsCartCheck } from 'react-icons/bs'
import { IoAnalyticsOutline, IoPersonOutline,  } from 'react-icons/io5'
import { SignUp, SignIn, ResetPassword } from '../Utils/Auth'
import { Db } from '../Utils/Firebase'
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik'
import Input from '../Components/Input'
import Button from '../Components/Button'
import styles from '../Utils/styles.module.css'
import { FiLock } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import * as Yup from 'yup'
import { Oval } from 'react-loader-spinner'
import { setIsAuthenticated, setAccessToken } from '../Utils/Slicer'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'

const SignUpModal = ({ isOpen, handleClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [ isLoading, setLoading ] = useState(false)
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)


    const toggleIcon = () => {
        setIsVisible(!isVisible);
        setPasswordVisible(!isPasswordVisible);
    };

    const Socials = [
        {name: 'Google', icon: <FcGoogle size={30}/> },
        {name: 'Facebook', icon: <BiLogoFacebook size={30} color='blue'/> },
        {name: 'Github', icon: <AiOutlineGithub size={30}/> }
    ]

    const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
    
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Please provide a username')
                .max(15, 'Must be 15 characters or less'),
            email: Yup.string()
                .required('Please provide a valid email address')
                .email('Invalid email address'),
            password: Yup.string()
                .required('Please provide a password')
                // .matches(passwordRules, { message: 'Please provide a strong password' })
        }),
        onSubmit: async (values, { resetForm }) => {
            setLoading(true)
            try {
                await SignUp.EmailandPassword(values.email, values.password, values.username)
                    .then((user) => {
                        console.log('Before dispatch', isAuthenticated)
                        const authToken = Cookies.set('AccessToken', user.accessToken)
                        console.log(authToken)
                        dispatch(setAccessToken(authToken))
                        dispatch(setIsAuthenticated(true))
                        console.log('After dispatch', isAuthenticated)
                    })
                setLoading(false)
            } catch (error) {
                console.log(error.message);
            } finally {
                resetForm()
            }
        }
        
    });

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            className='modal flex items-center justify-center px-[30%] py-10'
        >
            <div className='SignInContainer flex flex-col w-[90%] bg-[#FCFBFA] h-full rounded-lg py-5 px-[3rem] items-center'>
                <h1 className='title text-center text-[2rem] font-bold tracking-wide text-[#0a115c]'>WELCOME.</h1>
                <form onSubmit={formik.handleSubmit}>
                    <Input
                        placeholder={'Username'}
                        IconBefore={IoPersonOutline}
                        ContainerStyles={styles.InputContainer}
                        InputStyles={styles.inputstyles}
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={isLoading}
                    />
                        {formik.touched.username && formik.errors.username ? (
                            <small className='error text-[12px] text-center text-[red]'>{formik.errors.username}</small>
                        ) : null}
                    <Input
                        placeholder={'Email Address'}
                        IconBefore={AiOutlineMail}
                        ContainerStyles={styles.InputContainer}
                        InputStyles={styles.inputstyles}
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={isLoading}
                    />
                        {formik.touched.email && formik.errors.email ? (
                                <small className='error text-[12px] text-center text-[red]'>{formik.errors.email}</small>
                            ) : null}
                    <Input
                        placeholder={'Password'}
                        IconBefore={FiLock}
                        ContainerStyles={styles.InputContainer}
                        IconAfter={isVisible ? AiOutlineEye : AiOutlineEyeInvisible}
                        type={isPasswordVisible ? 'text' : 'password'}
                        onIconAfterClicked={() => toggleIcon()}
                        IconStyleAfter={styles.eyeStyle}
                        InputStyles={styles.inputstyles}
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={isLoading}
                    />
                        {formik.touched.password && formik.errors.password ? (
                                <small className='error text-[12px] text-center text-[red]'>{formik.errors.password}</small>
                            ) : null}
                            <Button
                                type="submit"
                                text={'Create Account'}
                                ContainerStyle={styles.signUpBtn}
                                disabled={formik.isSubmitting}
                                renderChildren={
                                    <Oval height={25} strokeWidth={5} secondaryColor='white' color='white' visible={isLoading} />
                                }
                            />
                </form>
                <p className='text-center my-10'>-----------or------------</p>
                <div className='socials w-full flex flex-row items-center gap-10 justify-center'>
                    {Socials.map((item) => (
                        <div key={item.name} className='social cursor-pointer'>
                            {item.icon}
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    )
}


const SignInModal = ({ isOpen, handleClose, }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [ isForgot, setForgot ] = useState(false)
    const [ isLoading, setLoading ] = useState(false)
    const dispatch = useDispatch()

    const toggleIcon = () => {
        setIsVisible(!isVisible);
        setPasswordVisible(!isPasswordVisible);
    };


    const Socials = [
        {name: 'Google', icon: <FcGoogle size={30}/> },
        {name: 'Facebook', icon: <BiLogoFacebook size={30} color='blue'/> },
        {name: 'Github', icon: <AiOutlineGithub size={30}/> }
    ]

    const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
    
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Please provide a valid email address')
                .email('Invalid email address'),
            password: Yup.string()
                .required('Please provide a password')
                // .matches(passwordRules, { message: 'Please provide a strong password' })
        }),
        onSubmit: async (values, { resetForm }) => {
            setLoading(true)
            try {
                await SignIn.EmailandPassword(values.email, values.password)
                    .then((user) =>{
                        const authToken = Cookies.set('AccessToken', user.accessToken)
                        dispatch(setAccessToken(authToken))
                        dispatch(setIsAuthenticated(true))
                    })
            setLoading(false)
            } catch (error) {
                console.log(error.message)
            } finally {
                resetForm()
            }
        }
    });

    const handleToggle = () => {
        setForgot(true)
    }

    const forgotFormik = useFormik({
        initialValues: {
            address: '',
        },
        validationSchema: Yup.object({
            address: Yup.string()
                .required('Please provide email address')
                .email('Invalid email address')
        }),
        onSubmit: async (values, { resetForm}) => {
            try {
                const res = await ResetPassword(values.address)
                setForgot(false)
                resetForm()
            } catch (error) {
                console.log(error.message)
            }
        }
    })

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            className='modal flex items-center justify-center px-[30%] py-10'
        >
        <div className='SignInContainer flex flex-col w-[90%] bg-[#FCFBFA] h-full rounded-lg py-5 px-[3rem] items-center'>
            {!isForgot ? (
                <>
                    <h1 className='title text-center text-[2rem] font-bold tracking-wide text-[#D45171] mt-10'>Welcome Back.</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <Input
                            placeholder={'Email Address'}
                            IconBefore={AiOutlineMail}
                            ContainerStyles={styles.InputContainer}
                            InputStyles={styles.inputstyles}
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                            {formik.touched.email && formik.errors.email ? (
                                    <small className='error text-[12px] text-center text-[red]'>{formik.errors.email}</small>
                                ) : null}
                        <Input
                            placeholder={'Password'}
                            IconBefore={FiLock}
                            ContainerStyles={styles.InputContainer}
                            IconAfter={isVisible ? AiOutlineEye : AiOutlineEyeInvisible}
                            type={isPasswordVisible ? 'text' : 'password'}
                            onIconAfterClicked={() => toggleIcon()}
                            IconStyleAfter={styles.eyeStyle}
                            InputStyles={styles.inputstyles}
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                            {formik.touched.password && formik.errors.password ? (
                                    <small className='error text-[12px] text-center text-[red]'>{formik.errors.password}</small>
                                ) : null}
                        <Button
                            type="submit"
                            text={'Sign In'}
                            ContainerStyle={styles.signInBtn}
                            disabled={formik.isSubmitting}
                            renderChildren={<Oval height={25} strokeWidth={5} secondaryColor='white' color='white' visible={isLoading} />}
                        />
                        <small className='forgot cursor-pointer' onClick={handleToggle}>Forgot Password?</small>
                    </form>
                    <p className='text-center my-10'>-----------or------------</p>
                    <div className='socials w-full flex flex-row items-center gap-10 justify-center'>
                        {Socials.map((item) => (
                            <div key={item.name} className='social cursor-pointer'>
                                {item.icon}
                            </div>
                        ))}
                    </div>
                </>
            ): (
                <div className='forgot'>
                    <h1 className='title text-center text-[2rem] font-bold tracking-wide text-[#D45171] mt-10'>Forgot Pass.</h1>
                    <small>Please provide a valid email address and then check you email for instructions</small>
                    <form onSubmit={forgotFormik.handleSubmit}>
                        <Input
                            placeholder={'Email Address'}
                            IconBefore={AiOutlineMail}
                            ContainerStyles={styles.InputContainer}
                            InputStyles={styles.inputstyles}
                            name="address"
                            value={forgotFormik.values.address}
                            onChange={forgotFormik.handleChange}
                            onBlur={forgotFormik.handleBlur}
                        />
                            {forgotFormik.touched.address && forgotFormik.errors.address ? (
                                    <small className='error text-[12px] text-center text-[red]'>{forgotFormik.errors.address}</small>
                                ) : null}
                        <Button
                            type="submit"
                            text={'Reset Password'}
                            ContainerStyle={styles.signInBtn}
                            disabled={forgotFormik.isSubmitting}
                        />
                    </form>
                </div>
            )}
        </div>
        </Modal>
    )
}


function LandPage() {
    const [ isOpen, setIsOpen ] = useState(false)
    const [ isSignInOpen, setSignInOpen ] = useState(false)
    const handleClose = () => setIsOpen(false)
    const handleSignInClose = () => setSignInOpen(false)

    const process = [
        {process: 'Discover and Explore', icon: <BiSearchAlt size={30}/>},
        {process: 'Analyze and Compare', icon: <IoAnalyticsOutline size={30}/>},
        {process: 'Rate and Review', icon: <AiOutlineStar size={30}/>},
        {process: 'Make a purchase', icon: <BsCartCheck size={30}/>},
    ]

    const handleSignUp = () => {
        setIsOpen(true)
    }
    const handleSignIn = () => {
        setSignInOpen(true)
    }
    return (
        <>
        <SignInModal isOpen={isSignInOpen} handleClose={handleSignInClose}/>
        <SignUpModal isOpen={isOpen} handleClose={handleClose}/>
        <div className='landBody flex flex-col h-[100%] items-center'>
            <NavBar onSignClicked={handleSignIn}/>
            <h1 className='landTitle text-[2.5rem] w-[40rem] font-[700] font-[Aleo] text-center mt-[3rem]'>
                Your One Stop Shop for Product  Information
            </h1>
            <p className='description font-[400] font-[Aleo] text-center w-[32rem]'>
                Welcome to Rate where you can Seamlessly access product information and  reviews from top E-commerce markets all in one place
            </p>
            <Buttons onClick={handleSignUp} className='startBtn bg-[#000000] w-[10rem] my-5 gap-2 rounded-full text-white text-[15px] p-3'>
                Get Started
                <AiOutlineArrowRight/>
            </Buttons>
            <div className='footer w-full flex flex-row items-center mt-[10%] px-[10rem] justify-between text-[#D45171]'>
                {process.map((item) => (
                    <div key={item.process} className='process flex flex-col items-center p-5 gap-5 cursor-pointer hover:bg-[#fcf3f6]'>
                        <span>{item.icon}</span>
                        <h1 className='processName text-center'>{item.process}</h1>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}

export default LandPage
