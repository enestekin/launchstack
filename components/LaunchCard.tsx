'use client';

import { useEffect, useState } from 'react';
import { LaunchPage, Vote, Comment } from '@prisma/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useUser } from '@/context/user-provider';

interface LaunchCardProps {
  page: LaunchPage & {
    votes: Vote[];
    comments: Comment[];
  };
}

export default function LaunchCard({ page }: LaunchCardProps) {
  const { user, isLoading } = useUser();
  const [votes, setVotes] = useState(page.votes.length);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading || !user) return;
    if (user.id) {
      const alreadyVoted = page.votes.some((vote) => vote.userId === user.id);
      setHasVoted(alreadyVoted);
    }
  }, [user, page.votes]);

  const handleVote = async () => {
    if (!user?.id || hasVoted) return;

    setLoading(true);
    const res = await fetch('/api/vote', {
      method: 'POST',
      body: JSON.stringify({ pageId: page.id }),
    });

    if (res.ok) {
      setVotes((v) => v + 1);
      setHasVoted(true);
    }

    setLoading(false);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="hover:shadow-md transition">
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{page.title}</h2>
          <span className="text-sm text-muted-foreground">{votes} votes</span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {page.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <Button
            onClick={handleVote}
            disabled={isLoading || !user?.id || hasVoted || loading}
            variant="secondary"
          >
            {hasVoted ? 'Voted' : 'Upvote'}
          </Button>

          <Link
            href={`/${page.slug}`}
            className="text-sm text-muted-foreground hover:underline z-10"
          >
            💬 {page.comments.length} yorum
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
