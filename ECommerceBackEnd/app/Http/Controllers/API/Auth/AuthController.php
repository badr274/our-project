<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Requests\API\Auth\LoginRequest;
use App\Http\Requests\API\Auth\RegisterRequest;
use Illuminate\Http\Request;
use App\Services\Auth\UserFactory;
use App\Services\Auth\TokenService;
use App\Services\Auth\LoginContext;

class AuthController
{
    public function register(RegisterRequest $request)
    {
        try {
            $data = UserFactory::createUser($request->only('name', 'email', 'password'));

            return response()->json([
                'message' => 'User registered successfully',
                'token' => $data['token'],
                'user' => $data['user']
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function login(LoginRequest $request)
    {
        try {
            $loginContext = new LoginContext();
            $data = $loginContext->login($request->only('email', 'password'));

            if (!$data) {
                return response()->json(['message' => 'Email or password is incorrect'], 401);
            }

            return response()->json(['token' => $data['token'], 'user' => $data['user']]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            if (!$request->user()) {
                return response()->json(['message' => 'Unauthenticated'], 401);
            }

            TokenService::revokeToken($request->user());
            return response()->json(['message' => 'Logged out successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
