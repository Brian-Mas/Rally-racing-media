import fs from 'fs';
import path from 'path';

export const articleYearsDirectory = path.join(process.cwd(), 'articles')

export const getYearPaths = () => {
    const articlesPerYear = getAllYears();
    const paths: { params: { year: string }}[] = [];
    for (const year of articlesPerYear) {
        paths.push({ params: { year: year }})
    }

    return paths;
}

export const getAllYears = () => {
    return fs.readdirSync(articleYearsDirectory);
}
