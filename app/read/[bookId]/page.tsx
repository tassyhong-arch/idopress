
import EbookReader from './EbookReader';

export async function generateStaticParams() {
  // Return static book IDs directly without accessing the store
  // This includes both the classic books and some common IDs
  return [
    { bookId: 'chunhyang' },
    { bookId: 'simcheong' },
    { bookId: 'heungbu' },
    { bookId: '1' },
    { bookId: '2' },
    { bookId: '3' },
    { bookId: '4' },
    { bookId: '5' },
    { bookId: '6' },
    { bookId: '7' },
    { bookId: '8' },
    { bookId: '9' },
    { bookId: '10' }
  ];
}

export default function ReadPage({ params }: { params: { bookId: string } }) {
  return <EbookReader bookId={params.bookId} />;
}
