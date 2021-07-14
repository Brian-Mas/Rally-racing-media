import FormData from 'form-data';
import axios from 'axios';

let IMGUR_TOKEN: string;

export const getImgurPictures = async (albumId: string) => {
    if (!IMGUR_TOKEN) { await getImgurAccessToken(); }
    return getImgurAlbum(albumId);
};

const getImgurAlbum = async (albumId: string) => {
    const data = new FormData();
    return axios({
        method: 'get',
        url: `https://api.imgur.com/3/album/${albumId}`,
        headers: {
            'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
            ...data.getHeaders()
        },
        data : data
    })
        .then(function (response) {
            const data = {
                cover: response.data.data.cover,
                images: response.data.data.images
            };
            // console.log('data', data);
            return data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

const getImgurAccessToken = () => {
    const data = new FormData();
    data.append('refresh_token', process.env.IMGUR_REFRESH_TOKEN);
    data.append('client_id', process.env.IMGUR_CLIENT_ID);
    data.append('client_secret', process.env.IMGUR_CLIENT_SECRET);
    data.append('grant_type', 'refresh_token');

    return axios({
        method: 'post',
        url: 'https://api.imgur.com/oauth2/token',
        headers: {
            ...data.getHeaders()
        },
        data : data
    })
        .then(function (response) {
            IMGUR_TOKEN = response.data.access_token;
            return IMGUR_TOKEN;
        })
        .catch(function (error) {
            console.log(error);
        });
}
