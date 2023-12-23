import { Breadcrumbs, Anchor } from "@mantine/core";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
export type ItemProps = { title: string; href: string };

export type BreadCrumbsProps = {
    homeElement: React.ReactNode;
    separator?: React.ReactNode;
    containerClasses?: string;
    listClasses?: string;
    activeClasses?: string;
    capitalizeLinks?: boolean;
    // items?: ItemProps[];
};

export default function BreadCrumbs({
    homeElement,
    separator,
    containerClasses,
    listClasses,
    activeClasses,
    capitalizeLinks, // items,
}: BreadCrumbsProps) {
    const paths = usePathname();
    const pathNames = paths.split("/").filter((path) => path);
    return (
        <div>
            <ul
                className={
                    pathNames.length > 0 ? containerClasses : "display:none"
                }
            >
                <li className={listClasses}>
                    <Link href={"/"}>
                        {pathNames.length > 0 ? homeElement : ""}
                    </Link>
                </li>
                {pathNames.length > 0 && separator}
                {pathNames.map((link, index) => {
                    let href = `/${pathNames.slice(0, index + 1).join("/")}`;
                    let itemClasses =
                        paths === href
                            ? `${listClasses} ${activeClasses}`
                            : listClasses;
                    let itemLink = capitalizeLinks
                        ? link[0].toUpperCase() + link.slice(1, link.length)
                        : link;
                    return (
                        <React.Fragment key={index}>
                            <li className={itemClasses}>
                                <Link href={href}>{itemLink}</Link>
                            </li>
                            {pathNames.length !== index + 1 && separator}
                        </React.Fragment>
                    );
                })}
            </ul>
        </div>
    );
}
