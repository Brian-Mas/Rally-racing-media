import { GetStaticPaths, GetStaticProps } from 'next';
import { getYearPaths } from '../../lib/years';

export default function Post() {
    return (
        <>
            <h1>Year</h1>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: getYearPaths(),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    console.log(params);
    return {
        props: {
            year: 'abc'
        }
    }
}
