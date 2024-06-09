import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const archivedProducts = [
    { id: 1, name: 'Suits', shortDescription: 'Suits', image: '/images/Product1.jpg' },
    { id: 2, name: 'Jeans', shortDescription: 'Blue Jeans', image: '/images/jeans.jpg' },
    { id: 3, name: 'Dress', shortDescription: 'Red T-shirt', image: '/images/dress.jpg' },
    // Add more products as needed
  ];
  return NextResponse.json(archivedProducts);
}


