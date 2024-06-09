import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const archivedProducts = [
    { id: 1, name: 'T-shirt', shortDescription: 'Red T-shirt', image: '/images/tshirt.jpg' },
    { id: 2, name: 'Jeans', shortDescription: 'Blue Jeans', image: '/images/jeans.jpg' },
    // Adicione mais produtos conforme necessário
  ];
  res.status(200).json(archivedProducts);
}
