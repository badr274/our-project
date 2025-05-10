<?php

namespace App\Http\Controllers\API\Admin\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\API\Web\Auth\LoginRequest;
use App\Services\Auth\AuthService;

class AuthController extends Controller
{
    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }


    public function login(LoginRequest $request)
    {
        $data = $this->authService->login($request->validated(), 'admin');
        return response()->json([
            'message' => 'Admin logged in successfully',
            'token' => $data['token'],
            'user' => $data['user'],
        ], 200);
    }

    public function logout(Request $request)
    {
        $this->authService->logout($request);
        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}
