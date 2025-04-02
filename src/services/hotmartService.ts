import axios from 'axios';

const HOTMART_API_URL = 'https://api-sec-vlc.hotmart.com/product/api/v2/products';
const TOKEN = process.env.HOTMART_TOKEN;

export async function fetchHotmartProducts() {
  try {
    const response = await axios.get(HOTMART_API_URL, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });

    if (!response.data || !response.data.products) {
      throw new Error('Produtos não encontrados na resposta da API');
    }

    const rawProducts = response.data.products;

    const rankedProducts = rawProducts.map((product: any) => {
      const temperature = product.temperature || 0;
      const commission = product.commission_percentage || 0;
      const price = product.price?.value || 0;

      const score = temperature * 0.5 + commission * 0.3 + price * 0.2;

      return {
        name: product.name,
        temperature,
        commission,
        price,
        score: parseFloat(score.toFixed(2)),
      };
    });

    return rankedProducts.sort((a: any, b: any) => b.score - a.score);
  } catch (error) {
    console.error('Erro ao buscar produtos da Hotmart:', error);
    throw new
