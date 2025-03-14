<?php

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserFactory
{
    public static function createUser(array $data)
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        return [
            'user' => $user,
            'token' => $user->createToken('auth_token')->plainTextToken
        ];
    }

    public static function getUserByEmail(string $email)
    {
        return User::where('email', $email)->first();
    }

    public static function validatePassword(string $inputPassword, string $storedPassword)
    {
        return Hash::check($inputPassword, $storedPassword);
    }
}
