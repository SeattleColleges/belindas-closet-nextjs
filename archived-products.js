
export default function handler(req, res) {
    const archivedProducts = [
      { id: 1, name: 'Suit', shortDescription: 'Blue Size 4', image: '/images/Product1.jpg' },
      { id: 2, name: 'Jeans', shortDescription: 'Blue Jeans', image: '/images/jeans.jpg' },
      { id: 3, name: 'Dress', shortDescription: 'Pink Size 2', image: '/images/dress.jpg' },
      { id: 4, name: 'Jeans', shortDescription: 'Blue Jeans', image: '/images/jeans.jpg' },
      // Add more products as needed
    ];
    res.status(200).json(archivedProducts);
  }
  