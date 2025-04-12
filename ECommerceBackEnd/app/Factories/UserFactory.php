<?php


namespace App\Factories;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserFactory
{
    public function create(array $data): User
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }
}
