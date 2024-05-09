const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');
// const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

// const client = new SecretManagerServiceClient();

// async function accessSecretVersion(secretName) {
//   const [version] = await client.accessSecretVersion({ name: secretName });
//   const payload = version.payload.data.toString('utf8');
//   return payload;
// }


async function getOAuth2Client() {
  let oauth2Client;

  try {
    // Attempt to use the default application credentials
    const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
    const client = new SecretManagerServiceClient();

    async function accessSecretVersion(secretName) {
      const [version] = await client.accessSecretVersion({ name: secretName });
      const payload = version.payload.data.toString('utf8');
      return payload;
    }

    const clientId = await accessSecretVersion('projects/993271206912/secrets/CLIENT_ID');
    const clientSecret = await accessSecretVersion('projects/993271206912/secrets/CLIENT_SECRET');
    const refreshToken = await accessSecretVersion('projects/993271206912/secrets/REFRESH_TOKEN/versions/2');

    oauth2Client = new OAuth2Client(clientId, clientSecret);
    oauth2Client.setCredentials({ refresh_token: refreshToken });
  } catch (error) {
    console.warn('Falling back to environment variables for OAuth2 credentials');

    // Fallback to using environment variables
    oauth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET
    );
    oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
  }

  return oauth2Client;
}


exports.listAlbums = async (req, res) => {
  try {
    const oauth2Client = await getOAuth2Client();
    const { token: accessToken } = await oauth2Client.getAccessToken();

    const albumsResponse = await axios.get('https://photoslibrary.googleapis.com/v1/albums', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const albums = albumsResponse.data.albums.map(album => ({
      id: album.id,
      title: album.title,
    }));

    res.json(albums);
  } catch (error) {
    console.error('Error fetching albums:', error.response ? error.response.data : error);
    res.status(500).json({ error: 'Failed to fetch albums', details: error.response ? error.response.data : error.message });
  }
};

exports.getAlbumImages = async (req, res) => {
  try {
    const oauth2Client = await getOAuth2Client();
    const { token: accessToken } = await oauth2Client.getAccessToken();
    const { albumId } = req.params;

    const photosResponse = await axios.post('https://photoslibrary.googleapis.com/v1/mediaItems:search', {
      albumId: albumId,
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const images = photosResponse.data.mediaItems.map(item => item.baseUrl);
    res.json(images);
  } catch (error) {
    console.error('Error fetching album images:', error.response ? error.response.data : error);
    res.status(500).json({ error: 'Failed to fetch album images', details: error.response ? error.response.data : error.message });
  }
};