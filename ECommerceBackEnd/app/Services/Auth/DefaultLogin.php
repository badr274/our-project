<?php

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Hash;


class DefaultLogin implements LoginStrategy
{
    public function login(array $data)
    {
        $user = User::where('email', $data['email'])->first();
        if (!$user || !Hash::check($data['password'], $user->password)) {
            return null;
        }

        return [
            'user' => $user,
            'token' => TokenService::generateToken($user)
        ];
    }
}
