import { format, parseISO } from 'date-fns';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { getAllArticlesPaths, getArticleData } from '../../../lib/articles';

export default function Post({ articleData, year }) {
    return (
        <>
            <Head>
                <title>{articleData.title} - {format(parseISO(articleData.date), 'yyyy')}</title>
            </Head>
            <article>
                <h1>{articleData.title}</h1>
                {articleData.date} <br/>
                {articleData.facebookUrl} <br/>
                <div dangerouslySetInnerHTML={{ __html: articleData.contentHtml }} />
                <iframe width="560"
                        height="315"
                        src={articleData.youtubeUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen />
            </article>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async (context) => {
    return {
        paths: getAllArticlesPaths(),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const articleData = await getArticleData(params.year as string, params.article as string);

    return {
        props: {
            articleData
        }
    }
}
