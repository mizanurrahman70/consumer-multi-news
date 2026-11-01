"use client";

import { useEffect } from "react";

import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

interface ErrorPageProps {
  error: Error & { digest?: string };
  retry: () => void;
}

export default function ErrorPage({ error, retry }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex flex-col items-start gap-4 py-20">
      <span className="text-kicker-label">Error</span>
      <h1 className="text-hero font-bold">Something went wrong.</h1>
      <p className="text-meta-muted">Please try again in a moment.</p>
      <button type="button" onClick={retry} className={buttonClasses("red")}>
        Try again
      </button>
    </Container>
  );
}
