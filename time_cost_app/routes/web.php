<?php

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

    Route::redirect('/time-cost-6', '/democracy');
    Route::redirect('/time-cost-3', '/about');

    Route::inertia('/democracy', 'democracy')->name('democracy');
    Route::inertia('/about', 'about')->name('about');
});

require __DIR__.'/settings.php';
