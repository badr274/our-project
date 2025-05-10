<?php

namespace App\Services\Auth;

use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;

class AuthService
{
    protected UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function register(array $data)
    {
        $user = $this->userRepository->create($data);
        $token = $user->createToken('auth_token')->plainTextToken;

        return ['token' => $token, 'user' => $user];
    }

    public function login(array $data, string $role)
    {
        $user = $this->userRepository->findByEmail($data['email']);

        if (!$user || !Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages(['email' => 'Email or password is incorrect']);
        }

        if ($role == 'admin') {

            if (!in_array($user->role, ['admin', 'manager'])) {
                return response()->json(['message' => 'Access denied. Not an admin or manager'], 403);
            }

            $token = $user->createToken('admin-token')->plainTextToken;
        } elseif ($role == 'user') {

            $token = $user->createToken('auth_token')->plainTextToken;
        }

        return ['token' => $token, 'user' => $user];
    }

    public function logout(Request $request)
    {
        try {
            if (!$request->user()) {
                return response()->json(['message' => 'Unauthenticated'], 401);
            }
            $request->user()->currentAccessToken()->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
