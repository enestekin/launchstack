import prisma from '@/lib/prisma';
// import LaunchCard from '../components/LaunchCard';
import { LaunchPage, Vote, Comment } from '@prisma/client';

export default async function HomePage() {
  const pages: (LaunchPage & {
    votes: Vote[];
    comments: Comment[];
  })[] = await prisma.launchPage.findMany({
    include: {
      votes: true,
      comments: true,
    },
  });

  const sortedPages = pages
    .sort((a, b) => b.votes.length - a.votes.length)
    .slice(0, 10);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-4">
      <h1 className="text-3xl font-bold mb-6">🔥 Top 10 Launch Pages</h1>

      {/* {sortedPages.map((page) => (
        <LaunchCard key={page.id} page={page} />
      ))} */}
    </main>
  );
}
