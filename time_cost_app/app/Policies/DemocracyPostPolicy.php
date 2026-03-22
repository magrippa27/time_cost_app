<?php

namespace App\Policies;

use App\Models\DemocracyPost;
use App\Models\User;

class DemocracyPostPolicy
{
    public function update(User $user, DemocracyPost $democracyPost): bool
    {
        return $user->id === $democracyPost->user_id;
    }

    public function delete(User $user, DemocracyPost $democracyPost): bool
    {
        return $user->id === $democracyPost->user_id;
    }
}
