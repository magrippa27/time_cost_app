import { Form, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import DemocracyPostController from '@/actions/App/Http/Controllers/DemocracyPostController';
import InputError from '@/components/input-error';
import type { DemocracyPostProps } from '@/features/democracy/types';

const DEFAULT_TITLE = 'My thoughts on this topic';

function displayTitle(title: string | null): string {
    return title?.trim() ? title : DEFAULT_TITLE;
}

function PostCard({
    post,
    currentUserId,
}: {
    post: DemocracyPostProps;
    currentUserId: number;
}) {
    const [editing, setEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(post.title ?? '');
    const [editBody, setEditBody] = useState(post.body);
    const isOwner = post.user_id === currentUserId;

    function startEdit() {
        setEditTitle(post.title ?? '');
        setEditBody(post.body);
        setEditing(true);
    }

    function handleDelete() {
        if (!window.confirm('Delete this post?')) {
return;
}

        router.delete(
            DemocracyPostController.destroy.url({ democracy_post: post.id }),
            { preserveScroll: true },
        );
    }

    return (
        <article className="flex rounded-lg border-2 border-border bg-card shadow-sm overflow-hidden min-h-[223px]">
            <div
                className="w-10 shrink-0 bg-muted flex flex-col items-center justify-start py-2 px-1.5"
                aria-label="Upvotes"
            >
                <button
                    type="button"
                    className="text-neutral-500 hover:text-neutral-700 p-1 rounded leading-none"
                    aria-label="Upvote"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 15l-6-6-6 6" />
                    </svg>
                </button>
            </div>
            <div className="flex-1 flex flex-col gap-2 p-5 min-w-0">
                {editing ? (
                    <Form
                        {...DemocracyPostController.update.form({
                            democracy_post: post.id,
                        })}
                        options={{ preserveScroll: true }}
                        onSuccess={() => setEditing(false)}
                        className="flex flex-col gap-2 min-w-0"
                    >
                        {({ processing, errors }) => (
                            <>
                                <input
                                    type="text"
                                    name="title"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    className="w-full border border-border rounded-md px-2 py-1.5 text-lg font-medium text-foreground outline-none focus:border-ring bg-background"
                                />
                                <InputError message={errors.title} />
                                <textarea
                                    name="body"
                                    value={editBody}
                                    onChange={(e) => setEditBody(e.target.value)}
                                    rows={5}
                                    className="w-full border border-border rounded-md px-2 py-1.5 resize-none text-sm text-foreground outline-none focus:border-ring leading-[1.5] bg-background"
                                />
                                <InputError message={errors.body} />
                                <div className="flex items-center gap-2 flex-wrap">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-full bg-primary text-primary-foreground text-sm font-medium px-4 py-2 hover:bg-primary/90 disabled:opacity-50"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEditing(false)}
                                        className="rounded-full border border-border text-sm font-medium px-4 py-2 hover:bg-muted"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        )}
                    </Form>
                ) : (
                    <>
                        <div className="flex items-start justify-between gap-2 min-w-0">
                            <h3 className="font-medium text-lg text-foreground leading-tight">
                                {displayTitle(post.title)}
                            </h3>
                            {isOwner ? (
                                <div className="flex items-center gap-1 shrink-0">
                                    <button
                                        type="button"
                                        onClick={startEdit}
                                        className="text-xs font-medium text-muted-foreground hover:text-foreground px-2 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        className="text-xs font-medium text-red-600 hover:text-red-800 px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ) : null}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {post.author_name}
                        </p>
                        <p className="text-sm text-foreground/90 leading-[1.5] line-clamp-5">
                            {post.body}
                        </p>
                    </>
                )}
            </div>
        </article>
    );
}

export default function HowToFixDemocracyPage({
    posts,
}: {
    posts: DemocracyPostProps[];
}) {
    const { auth } = usePage().props;
    const currentUserId = auth.user.id;
    const [composerTitle, setComposerTitle] = useState('');
    const [composerBody, setComposerBody] = useState('');

    return (
        <div className="w-full min-h-screen bg-background">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 pb-24">
                <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight text-foreground mb-10">
                    How to fix Democracy?
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {posts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            currentUserId={currentUserId}
                        />
                    ))}
                </div>

                <Form
                    {...DemocracyPostController.store.form()}
                    options={{ preserveScroll: true }}
                    onSuccess={() => {
                        setComposerTitle('');
                        setComposerBody('');
                    }}
                    className="rounded-lg border-2 border-input bg-card shadow-sm overflow-hidden focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/50 focus-within:ring-offset-0 max-w-3xl mx-auto"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="p-4">
                                <input
                                    type="text"
                                    name="title"
                                    value={composerTitle}
                                    onChange={(e) =>
                                        setComposerTitle(e.target.value)
                                    }
                                    placeholder="Post title (optional)"
                                    className="w-full border-0 outline-none text-lg font-medium text-foreground placeholder:text-muted-foreground bg-transparent mb-2"
                                />
                                <InputError message={errors.title} />
                                <textarea
                                    name="body"
                                    value={composerBody}
                                    onChange={(e) =>
                                        setComposerBody(e.target.value)
                                    }
                                    placeholder="What are your thoughts?"
                                    rows={4}
                                    className="w-full border-0 outline-none resize-none text-sm text-foreground placeholder:text-muted-foreground bg-transparent leading-[1.5]"
                                />
                                <InputError message={errors.body} />
                            </div>
                            <div className="flex items-center justify-between gap-2 px-3 py-2 bg-muted/50 border-t border-border">
                                <div className="flex items-center gap-1">
                                    <span className="text-xs text-muted-foreground">
                                        Add your answer
                                    </span>
                                </div>
                                <button
                                    type="submit"
                                    disabled={
                                        processing || !composerBody.trim()
                                    }
                                    className="rounded-full bg-primary text-primary-foreground text-sm font-medium px-4 py-2 flex items-center gap-2 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition-colors cursor-pointer"
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    Reply
                                </button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </div>
    );
}
