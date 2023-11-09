'use client'
import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import {CaretDownIcon} from '@radix-ui/react-icons';

const iconClass = 'inline align-text-top text-md mr-1';
const logo = "/jh2.png";


const dropTriggerClassName = "text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]";
const caretClassName = "text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180";
const navContentClassName = "data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto"
const ul1ColClassName = "border-2 bg-gray-50 one m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr]";
const ul2ColClassName = "border-2 bg-gray-50 m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[300px] sm:grid-flow-col sm:grid-rows-2";

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

const NavBar = () => {
    const navBarClassName = "center m-0 flex list-none rounded-[6px] bg-gray-50 p-1 shadow-gray-500 shadow-[0_1px_3px]"

    return (
        <NavigationMenu.Root className="relative z-[1] flex w-screen justify-center">
            <NavigationMenu.List className={navBarClassName}>
                {basicNavItem("Home", "/")}
                {basicNavItem("Airlines", "/airlines")}
                {basicNavItem("Airports", "/airports")}
                {basicNavItem("US Hubs", "/hubs")}
                {basicNavItem("Contact", "/contact")}


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
