<?php

namespace App\Http\Controllers;

use App\Models\DemocracyPost;
use Inertia\Inertia;
use Inertia\Response;

class DemocracyController extends Controller
{
    public function index(): Response
    {
        $posts = DemocracyPost::query()
            ->with('user:id,name')
            ->latest()
            ->get()
            ->map(fn (DemocracyPost $post) => [
                'id' => $post->id,
                'title' => $post->title,
                'body' => $post->body,
                'user_id' => $post->user_id,
                'author_name' => $post->user?->name ?? '',
                'created_at' => $post->created_at?->toIso8601String() ?? '',
            ]);

        return Inertia::render('democracy', [
            'posts' => $posts,
        ]);
    }
}
