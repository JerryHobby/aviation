import React from 'react';

import {
    BiBookAlt,
    BiBuildings,
    BiCodeBlock,
    BiConversation,
    BiCustomize,
    BiFile,
    BiHive,
    BiHome,
    BiSitemap,
    BiSlider,
    BiSolidPlaneTakeOff
} from "react-icons/bi";

const pageIcons = new Map<string, any>();
const iconClass = "inline-block align-text-bottom pr-2"

pageIcons.set("home", <BiHome className={iconClass}/>);
pageIcons.set("admin", <BiSlider className={iconClass}/>);
pageIcons.set("articles", <BiBookAlt className={iconClass}/>);
pageIcons.set("leadership", <BiBuildings className={iconClass}/>);
pageIcons.set("technical", <BiCodeBlock className={iconClass}/>);
pageIcons.set("experience", <BiCustomize className={iconClass}/>);
pageIcons.set("projects", <BiHive className={iconClass}/>);
pageIcons.set("buildProcess", <BiSitemap className={iconClass}/>);
pageIcons.set("resume", <BiFile className={iconClass}/>);
pageIcons.set("contact", <BiConversation className={iconClass}/>);
pageIcons.set("airports", <BiSolidPlaneTakeOff className={iconClass}/>);



interface Props {
    title: string
    icon: string
}

const Title = ({title, icon}: Props) => {
    return (
        <>
            <div className="pt-2 pb-10 text-5xl text-center">{pageIcons.get(icon)}{title}</div>
            <hr className="border-b-1 border-gray-500 pb-10"></hr>
        </>
    );
};

export default Title;