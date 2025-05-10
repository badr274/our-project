<?php

namespace App\Http\Controllers\API\Web\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\Web\Auth\LoginRequest;
use App\Http\Requests\API\Web\Auth\RegisterRequest;
use Illuminate\Http\Request;
use App\Services\Auth\AuthService;

class AuthController extends Controller
{
    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(RegisterRequest $request)
    {
        try {
            $data = $this->authService->register($request->validated());
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
            $data = $this->authService->login($request->validated(), 'user');
            return response()->json($data);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function logout(Request $request)
    {
        $this->authService->logout($request);
        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}
