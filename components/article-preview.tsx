import Image from 'next/image';

export default function ArticlePreview({ article }) {
    return (
        <div>
            <div>{article.title}</div>
            <div>{article.date}</div>
            <Image src={`https://i.imgur.com/${article.cover}.png`} width={248.89} height={140} />
        </div>
    )
}
