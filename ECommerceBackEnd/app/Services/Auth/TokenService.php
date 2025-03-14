<?php

namespace App\Services\Auth;

use App\Models\User;

class TokenService
{
    public static function generateToken(User $user)
    {
        $token = $user->createToken('auth_token')->plainTextToken;
        return $token;
    }

    public static function revokeToken(User $user)
    {
        $user->tokens()->delete();
    }
}
