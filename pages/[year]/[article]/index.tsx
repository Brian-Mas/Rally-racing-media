import { format, parseISO } from 'date-fns';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import { getAllArticlesPaths, getArticleData } from '../../../lib/articles';
import { getImgurPictures } from '../../../lib/imgur-pictures';

export default function Post({ articleData, pictures }) {
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
                <pre>{pictures.cover}</pre>
                <pre>{pictures.images[0].link}</pre>
                <Image src={pictures.images[0].link} width={1280} height={720} />
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
    const pictures = await getImgurPictures(articleData.imgurAlbumId);
    console.log(pictures);

    return {
        props: {
            articleData,
            pictures
        }
    }
}
