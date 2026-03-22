<?php

use App\Http\Controllers\DemocracyController;
use App\Http\Controllers\DemocracyPostController;
use App\Http\Controllers\TimeInflationController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return auth()->check()
        ? redirect('/time-cost')
        : redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::inertia('/time-cost', 'time-cost')->name('time-cost');
    Route::inertia('/time-inflation', 'time-inflation')->name('time-inflation');
    Route::get('/time-inflation/data', [TimeInflationController::class, 'data'])->name('time-inflation.data');

    Route::redirect('/time-cost-6', '/democracy');
    Route::redirect('/time-cost-3', '/about');

    Route::get('/democracy', [DemocracyController::class, 'index'])->name('democracy');
    Route::post('/democracy/posts', [DemocracyPostController::class, 'store'])->name('democracy.posts.store');
    Route::patch('/democracy/posts/{democracy_post}', [DemocracyPostController::class, 'update'])->name('democracy.posts.update');
    Route::delete('/democracy/posts/{democracy_post}', [DemocracyPostController::class, 'destroy'])->name('democracy.posts.destroy');
    Route::inertia('/about', 'about')->name('about');
});

require __DIR__.'/settings.php';
