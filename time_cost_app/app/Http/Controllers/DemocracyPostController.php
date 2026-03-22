<?php

namespace App\Http\Controllers;

use App\Http\Requests\Democracy\StoreDemocracyPostRequest;
use App\Http\Requests\Democracy\UpdateDemocracyPostRequest;
use App\Models\DemocracyPost;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;

class DemocracyPostController extends Controller
{
    use AuthorizesRequests;

    public function store(StoreDemocracyPostRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $title = isset($validated['title']) ? trim((string) $validated['title']) : '';
        $request->user()->democracyPosts()->create([
            'title' => $title !== '' ? $title : null,
            'body' => $validated['body'],
        ]);

        return redirect()->route('democracy');
    }

    public function update(UpdateDemocracyPostRequest $request, DemocracyPost $democracyPost): RedirectResponse
    {
        $validated = $request->validated();
        $title = isset($validated['title']) ? trim((string) $validated['title']) : '';
        $democracyPost->update([
            'title' => $title !== '' ? $title : null,
            'body' => $validated['body'],
        ]);

        return redirect()->route('democracy');
    }

    public function destroy(DemocracyPost $democracyPost): RedirectResponse
    {
        $this->authorize('delete', $democracyPost);
        $democracyPost->delete();

        return redirect()->route('democracy');
    }
}
