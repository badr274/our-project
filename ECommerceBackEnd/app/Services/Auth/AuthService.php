<?php

namespace App\Services\Auth;

use App\Repositories\UserRepository;
use App\Exceptions\AuthException;
use Illuminate\Support\Facades\Hash;
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
        $token = $this->createUserToken($user, 'user');
        return ['token' => $token, 'user' => $user];
    }

    public function login(array $data, string $role)
    {
        $user = $this->userRepository->findByEmail($data['email']);

        if (!$user || !Hash::check($data['password'], $user->password)) {
            throw AuthException::invalidCredentials();
        }

        if ($role === 'admin' && !in_array($user->role, ['admin', 'manager'])) {
            throw AuthException::insufficientPermissions();
        }

        $token = $this->createUserToken($user, $role);
        return ['token' => $token, 'user' => $user];
    }

    public function logout(Request $request)
    {
        if (!$request->user()) {
            throw AuthException::unauthenticated();
        }
        $request->user()->currentAccessToken()->delete();
        return ['message' => 'Logged out successfully'];
    }

    private function createUserToken($user, string $role): string
    {
        $tokenName = match ($role) {
            'admin', 'manager' => 'admin-token',
            default => 'auth_token'
        };
        return $user->createToken($tokenName)->plainTextToken;
    }
}
