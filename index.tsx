import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to My Next.js App</h1>
      <p>
        Visit the <Link href="/archived-products">Archived Products Page</Link>
      </p>
    </div>
  );
};

export default HomePage;

