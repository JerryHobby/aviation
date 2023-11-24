'use client'
import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import {Session} from "next-auth";
import {CaretDownIcon} from '@radix-ui/react-icons';
import {useSession} from "next-auth/react";

const dropTriggerClassName = "text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]";
const caretClassName = "text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180";


const basicNavItem = (title: string, href: string) => {
    const linkClassName = "text-violet11 hover:underline focus:shadow-violet7 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]";
    return (
        <NavigationMenu.Item>
            <NavigationMenu.Link
                className={linkClassName}
                href={href}>
                {title}
            </NavigationMenu.Link>
        </NavigationMenu.Item>)
}

const adminMenu = (session: Session | null) => {
    if (!session) return null;
    const admin = session.user?.email === "jerry@anythinginternet.com";
    if (!admin) return null;

    return (
        <>
            {basicNavItem("Log Files", "/admin/logs")}
        </>
    );
}

const userMenu = (status: string, session: Session) => {
    return (
        <div className="dropdown dropdown-hover">
            <label tabIndex={0} className={dropTriggerClassName}>
                {!session && "User Menu"}
                {(session && session.user?.name)}
                <CaretDownIcon className={caretClassName} aria-hidden/>
            </label>

            <ul tabIndex={0}
                className="border dropdown-content z-[1] menu py-0 px-2 shadow bg-gray-50 rounded-box w-52">
                {adminMenu(session)}
                {(!session || null)
                    && (basicNavItem("Sign In", "/api/auth/signin"))
                    || (basicNavItem("Sign Out", "/api/auth/signout"))}
            </ul>
        </div>
    );
}
const NavBar = () => {
    const navBarClassName = "center m-0 flex list-none rounded-[6px] bg-gray-50 p-1 shadow-gray-500 shadow-[0_1px_3px]"
    const {status, data: session} = useSession();

    return (
        <NavigationMenu.Root className="relative z-[1] flex w-screen justify-center">
            <NavigationMenu.List className={navBarClassName}>
                {basicNavItem("Home", "/")}
                {basicNavItem("Airlines", "/airlines")}

                {/*the - forces the search page to load*/}
                {basicNavItem("Airports", "/airports/-")}
                {basicNavItem("Clocks", "/clocks/SFO EWR NRT LHR")}

                {basicNavItem("US Hubs", "/hubs")}
                {basicNavItem("Contact", "/contact")}
                {userMenu(status, session!)}


                <NavigationMenu.Indicator
                    className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
                    <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white"/>
                </NavigationMenu.Indicator>
            </NavigationMenu.List>

            <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
                <NavigationMenu.Viewport
                    className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]"/>
            </div>
        </NavigationMenu.Root>
    );
};

interface Props {
    href: string;
    title: string;
    children: React.ReactNode;
    className?: string;
}

const ListItem = React.forwardRef(({href, title, children, className}: Props, ref) => {
    const subNavLinkClassName = '!font-semi-bold focus:shadow-[0_0_0_2px] focus:shadow block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors';
    const subNavTitleClassName = "hover:underline mb-[5px] !font-semibold leading-[1.2]";
    return (
        <li>
            <NavigationMenu.Link asChild>
                <a
                    className={classNames(
                        subNavLinkClassName,
                        {className}
                    )}
                    href={href}
                >
                    <div
                        className={subNavTitleClassName}>{title}</div>
                    <p className="!text-gray-500 leading-[1.4]">{children}</p>
                </a>
            </NavigationMenu.Link>
        </li>
    );
});

ListItem.displayName = 'ListItem';
export default NavBar;
