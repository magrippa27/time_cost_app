<?php

use App\Models\DemocracyPost;
use App\Models\User;

test('authenticated user can view democracy page', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get(route('democracy'));

    $response->assertOk();
});

test('authenticated user can create a democracy post', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->post(route('democracy.posts.store'), [
        'title' => 'My title',
        'body' => 'My body text',
    ]);

    $response->assertRedirect(route('democracy'));

    $this->assertDatabaseHas('democracy_posts', [
        'user_id' => $user->id,
        'title' => 'My title',
        'body' => 'My body text',
    ]);
});

test('user cannot update another users democracy post', function () {
    $owner = User::factory()->create();
    $other = User::factory()->create();
    $post = DemocracyPost::query()->create([
        'user_id' => $owner->id,
        'title' => 'Original',
        'body' => 'Original body',
    ]);

    $this->actingAs($other);

    $response = $this->from(route('democracy'))->patch(route('democracy.posts.update', $post), [
        'title' => 'Hacked',
        'body' => 'Hacked body',
    ]);

    $response->assertForbidden();
    expect($post->fresh()->title)->toBe('Original');
    expect($post->fresh()->body)->toBe('Original body');
});

test('user cannot delete another users democracy post', function () {
    $owner = User::factory()->create();
    $other = User::factory()->create();
    $post = DemocracyPost::query()->create([
        'user_id' => $owner->id,
        'title' => 'Original',
        'body' => 'Original body',
    ]);

    $this->actingAs($other);

    $response = $this->from(route('democracy'))->delete(route('democracy.posts.destroy', $post));

    $response->assertForbidden();
    expect(DemocracyPost::query()->whereKey($post->id)->exists())->toBeTrue();
});

test('user can update own democracy post', function () {
    $user = User::factory()->create();
    $post = DemocracyPost::query()->create([
        'user_id' => $user->id,
        'title' => 'Original',
        'body' => 'Original body',
    ]);

    $this->actingAs($user);

    $response = $this->patch(route('democracy.posts.update', $post), [
        'title' => 'Updated',
        'body' => 'Updated body',
    ]);

    $response->assertRedirect(route('democracy'));
    expect($post->fresh()->title)->toBe('Updated');
    expect($post->fresh()->body)->toBe('Updated body');
});

test('user can delete own democracy post', function () {
    $user = User::factory()->create();
    $post = DemocracyPost::query()->create([
        'user_id' => $user->id,
        'title' => 'Original',
        'body' => 'Original body',
    ]);

    $this->actingAs($user);

    $response = $this->delete(route('democracy.posts.destroy', $post));

    $response->assertRedirect(route('democracy'));
    $this->assertDatabaseMissing('democracy_posts', ['id' => $post->id]);
});
