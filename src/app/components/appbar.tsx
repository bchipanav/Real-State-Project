"use client"
import { HomeModernIcon } from "@heroicons/react/16/solid"
import { Navbar, NavbarContent, NavbarMenuToggle, NavbarBrand, NavbarItem, NavbarMenu } from "@heroui/react"
import Link from "next/link"
import React, {ReactNode} from "react"

interface AppBarProps {
    children: ReactNode;
}

const AppBar = ({children}: AppBarProps) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    return (
        <Navbar className="shadow-md" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
            <Link href={"/"} className="flex items-center text-primary-400 hover:text-primary-600 transition-colors gap-2">
        <HomeModernIcon className="w-16" />
          <p className="font-bold text-inherit">Chipana Inmobiliaria</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href="#">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
      {children}
      </NavbarContent>
      <NavbarMenu>
      </NavbarMenu>
    </Navbar>
    )
}
export default AppBar