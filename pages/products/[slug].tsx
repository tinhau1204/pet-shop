import { GetServerSideProps, GetServerSidePropsContext } from "next";

type PageProps = {
    [name: string]: any;
};

export default function Page(props: PageProps) {
    // Render data...
    return (
        <div className="">
            <p>Page: {props.page}</p>
            <p>Slug: {props.slug}</p>
        </div>
    );
}

// This gets called on every request
export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { params } = context;

    // Pass data to the page via props
    return { props: { page: "product", slug: params?.slug || "" } };
}
