import React from 'react'
import { Nav, Buttons } from './styled'
function NavBar({ onSignClicked }) {
    return (
        <Nav>
            <h1 className='logo text-[20px] font-bold'>RATE</h1>
            <div className='rightNav flex flex-row items-center gap-5'>
                <Buttons onClick={onSignClicked} className='signBtn border-[1px] border-[#D45171] min-w-max w-[6rem] rounded-full h-8 text-[#D45171]'>
                    Sign In
                </Buttons>
                <div>
                    <p>5th October, 2023</p>
                </div>
            </div>
        </Nav>
    )
}

export default NavBar
