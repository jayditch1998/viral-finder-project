const { ApifyClient } = require('apify-client');

exports.processApifyAPI = async (req, res) => {
  console.log('request: ', req.body);

  const { username } = req.body;
  console.log(username);
  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    // const client = new ApifyClient({ token: process.env.APIFY_API_TOKEN });
    const client = new ApifyClient({ token: 'apify_api_5Bz3X77frYBWORCfDD1Xj2ghw8WpGW2tdhgs' });
    const input = {
      directUrls: [`https://www.instagram.com/${username}/`],
      resultsLimit: 6,
    };

    const run = await client.actor("apify/instagram-scraper").call(input);
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    
    res.json(items);
    console.log(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
};