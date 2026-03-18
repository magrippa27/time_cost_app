import { useState } from "react";

type Post = { id: number; title: string; body: string };

const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    title: "My thoughts on this topic",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.",
  },
  {
    id: 2,
    title: "My thoughts on this topic",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.",
  },
  {
    id: 3,
    title: "My thoughts on this topic",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.",
  },
  {
    id: 4,
    title: "My thoughts on this topic",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.",
  },
];

function PostCard({ post }: { post: Post }) {
  return (
    <article className="flex rounded-lg border-2 border-neutral-200 bg-white shadow-sm overflow-hidden min-h-[223px]">
      <div className="w-10 shrink-0 bg-neutral-100 flex flex-col items-center justify-start py-2 px-1.5" aria-label="Upvotes">
        <button type="button" className="text-neutral-500 hover:text-neutral-700 p-1 rounded leading-none" aria-label="Upvote">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      </div>
      <div className="flex-1 flex flex-col gap-2 p-5 min-w-0">
        <h3 className="font-medium text-lg text-neutral-900 leading-tight">
          {post.title}
        </h3>
        <p className="text-sm text-neutral-800 leading-[1.5] line-clamp-5">
          {post.body}
        </p>
      </div>
    </article>
  );
}

export default function HowToFixDemocracyPage() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [thoughts, setThoughts] = useState("");
  const [title, setTitle] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedBody = thoughts.trim();
    const trimmedTitle = title.trim() || "My thoughts on this topic";
    if (!trimmedBody) return;
    setPosts((prev) => [
      { id: Date.now(), title: trimmedTitle, body: trimmedBody },
      ...prev,
    ]);
    setThoughts("");
    setTitle("");
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 pb-24">
        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight text-neutral-900 mb-10">
          How to fix Democracy?
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg border-2 border-neutral-300 bg-white shadow-sm overflow-hidden focus-within:border-neutral-500 focus-within:ring-2 focus-within:ring-neutral-400/20 focus-within:ring-offset-0 max-w-3xl mx-auto"
        >
          <div className="p-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title (optional)"
              className="w-full border-0 outline-none text-lg font-medium text-neutral-900 placeholder:text-neutral-400 bg-transparent mb-2"
            />
            <textarea
              value={thoughts}
              onChange={(e) => setThoughts(e.target.value)}
              placeholder="What are your thoughts?"
              rows={4}
              className="w-full border-0 outline-none resize-none text-sm text-neutral-900 placeholder:text-neutral-400 bg-transparent leading-[1.5]"
            />
          </div>
          <div className="flex items-center justify-between gap-2 px-3 py-2 bg-neutral-50 border-t border-neutral-200">
            <div className="flex items-center gap-1">
              <span className="text-xs text-neutral-500">Add your answer</span>
            </div>
            <button
              type="submit"
              disabled={!thoughts.trim()}
              className="rounded-full bg-neutral-900 text-white text-sm font-medium px-4 py-2 flex items-center gap-2 hover:bg-black focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Reply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
