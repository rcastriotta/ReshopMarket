import axios from 'axios';
import {
  decodeId,
  formatProductJSON,
  formatProductArray,
} from '../../../utils/api';

export default async function handler(req, res) {
  const id = decodeId(req.query.id);
  const { data } = await axios({
    method: 'GET',
    url: `https://www.mercari.com/v1/api?operationName=productQuery&variables=%7B%22id%22%3A%22${id}%22%2C%22limit%22%3A42%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%228382241d8311adf850d3eee6f073b7b43c2efe1e094ad5948218366e8325bc25%22%7D%7D`,
    headers: {
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
      'accept-language': 'en-US,en;q=0.9',
    },
  });
  const {
    item,
    similarItems: { items: similarItems },
  } = data.data;
  res.send({
    ...formatProductJSON(item),
    similarItems: similarItems ? formatProductArray(similarItems) : [],
  });
}
