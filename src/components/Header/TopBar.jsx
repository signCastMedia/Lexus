import React from 'react'
import {Navbar,Logo,Tabs, MenuItem} from './TopBar.styled'
import logoLexus from '../../assests/logo/logo.webp'

const TopBar = () => {
  return (
    <Navbar>
      <Logo src={logoLexus} alt='Lexus Barrie'/>

      <Tabs>
        <MenuItem>NEW INVENTORY</MenuItem>
        <MenuItem>PRE-OWNED</MenuItem>
        <MenuItem>OFFERS</MenuItem>
        <MenuItem>SERVICE</MenuItem>
        <MenuItem>TIRES & ACCESSORIES</MenuItem>
        <MenuItem>ABOUT US</MenuItem>
        <MenuItem>BOOK APPOINTMENT</MenuItem>

      </Tabs>

    </Navbar>
  )
}

export default TopBar