
import BookDetail from './BookDetail';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

export default function BookPage({ params }: { params: { id: string } }) {
  console.log('BookPage 렌더링 - params:', params);
  return <BookDetail bookId={params.id} />;
}
