
import React from 'react';
import { Text } from '@mantine/core';
import { GetServerSideProps, GetServerSidePropsContext } from "next";
//http://localhost:3000/checkout/success?orderId=INV-1703398510869


type PageProps = {
    [name: string]: any;
};

export default function Page(props: PageProps) {

    return (
        props.slug === "success" ? (
            <Text>Success</Text>
        ) : (
            <Text>Fail</Text>
        )
    )

}


// This gets called on every request
export async function getServerSideProps(context: GetServerSidePropsContext) {
    const queryParams = context.query;

    console.log('queryParams', queryParams)

    console.log('slug', (queryParams?.slug && queryParams?.slug?.length > 0) && queryParams.slug[0])
    console.log('orderId', queryParams?.orderId)
    // Pass data to the page via props
    return { props: { page: "checkout", slug:(queryParams?.slug && queryParams?.slug?.length > 0) && queryParams.slug[0] || "", params: queryParams?.orderId , message: queryParams?.message || ''} };
}