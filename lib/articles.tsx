import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import remark from 'remark';
import html from 'remark-html';
import { articleYearsDirectory, getAllYears } from './years';

export const getAllArticlesPaths = () => {
    const articlesPerYear = getArticlesForYears(getAllYears());
    const paths = new Array<{ params: { year: string, article: string }}>();

    // map articles per year to possible urls
    articlesPerYear.forEach((value, key) => {
        for (const articleName of value) {
            paths.push({ params: { year: key, article: articleName } })
        }
    })

    return paths;
}

export const getArticleData = async (year: string, id: string) => {
    const fullPath = path.join(articleYearsDirectory, year, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContent);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the id and contentHtml
    return {
        id,
        contentHtml,
        ...(matterResult.data as {
            date: string;
            title: string;
            facebookUrl: string;
            youtubeUrl: string;
            imgurCoverImageId: string;
            imgurAlbumId: string;
        })
    }
}

export const getRecentArticles = async (amount = 10) => {
    const years = getYears();
    const articles = [];

    while (articles.length <= 10 && years.length) {
        const articlesPerYear = getArticlesInfoForYear(years[years.length - 1])?.items;
        articles.push(
            ...(articlesPerYear.slice(0, Math.min(articlesPerYear.length, amount)))
        );
        years.splice(-1, 1);
    }

    return articles;
}

const getYears = () => {
    return fs.readdirSync(articleYearsDirectory);
}

const getArticlesForYears = (years: string[]) => {
    const map = new Map<string, string[]>();
    for (const year of years) {
        map.set(year, getArticlesForYear(year));
    }
    return map;
}

const getArticlesForYear = (year: string) => {
    const directory = path.join(articleYearsDirectory, year);
    return fs.readdirSync(directory)
        .map(f => f.replace(/\.md$/, ''));
}

const getArticlesInfoForYear = (year: string) => {
    const directory = path.join(articleYearsDirectory, year, `${year}.json`);
    return JSON.parse('' + fs.readFileSync(directory));
}
