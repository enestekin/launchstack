import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  params: { slug: string };
}

export default async function LaunchPageDetail({ params }: Props) {
  const { slug } = await params;
  const page = await prisma.launchPage.findUnique({
    where: { slug: slug },
    include: {
      comments: true,
      votes: true,
    },
  });

  if (!page) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
      <p className="text-muted-foreground mb-4">{page.description}</p>
      <p className="text-sm text-muted-foreground mb-4">
        🔼 {page.votes.length} oy — 💬 {page.comments.length} yorum
      </p>

      <section className="space-y-4 mt-8">
        <h2 className="text-lg font-semibold">Yorumlar</h2>

        {page.comments.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Henüz yorum yapılmamış.
          </p>
        )}

        {page.comments.map((comment) => (
          <Card key={comment.id}>
            <CardContent className="p-4">
              <p className="text-sm">{comment.content}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
