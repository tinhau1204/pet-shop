import { Breadcrumbs, Anchor } from "@mantine/core";
import {usePathname} from "next/navigation";
import Link from "next/link";
import React from "react";
export type ItemProps = {title: string, href: string} 

export type BreadCrumbsProps = {
    homeElement: React.ReactNode;
    separator?: React.ReactNode;
    containerClasses?: string;
    listClasses?: string;
    activeClasses?: string;
    capitalizeLinks?: boolean;
    // items?: ItemProps[];
}


const item = [
    { title: 'Home', href: '#' },
    { title: 'Dog', href: '#' },
    { title: 'Small Dog', href: '#' },
].map((item, index) => (
    <Anchor href={item.href} key={index} className="font-normal text-sm text-black-normal">
        {item.title}
    </Anchor>
));

export default function BreadCrumbs({
    homeElement,
    separator,
    containerClasses,
    listClasses,
    activeClasses,
    capitalizeLinks,
    // items,
}: BreadCrumbsProps) {
    const paths = usePathname();
    const pathNames = paths.split('/').filter(path => path)
    return (
        <div>
            <ul className={containerClasses}>
                <li className={listClasses}><Link href={'/'}>{homeElement}</Link></li>
                {pathNames.length > 0 && separator}
            {
                pathNames.map( (link, index) => {
                    let href = `/${pathNames.slice(0, index + 1).join('/')}`
                    let itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses
                    let itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link
                    return (
                        <React.Fragment key={index}>
                            <li className={itemClasses} >
                                <Link href={href} >{itemLink}</Link>
                            </li>
                            {pathNames.length !== index + 1 && separator}
                        </React.Fragment>
                    )
                })
            }
            </ul>
        </div>
    );
}

