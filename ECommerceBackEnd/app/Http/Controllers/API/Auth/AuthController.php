<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\API\Auth\RegisterRequest;
use App\Http\Requests\API\Auth\LoginRequest;


class AuthController extends Controller
{

    /**
     * Log in and obtain a JWT token.
     *
     * @param \App\Http\Requests\API\Auth\LoginRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function login(LoginRequest $request): JsonResponse
    {
        $validator = $request->validated();
        if (! $token = auth('api')->attempt($validator)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }


    /**
     * Register a new user.
     *
     * @param \App\Http\Requests\API\Auth\RegisterRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function register(RegisterRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message' => 'user created successfully',
            'user' => $user,
            'token' => $token,
        ], 200);
    }


    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function getAccount(): JsonResponse
    {
        return response()->json(auth('api')->user());
    }

    /**
     * Log out the authenticated user by invalidating their JWT token.
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function logout(): JsonResponse
    {
        auth('api')->logout();

        return response()->json(['message' => 'user logged out successfully']);
    }


    /**
     * Respond with a JSON containing the token details.
     *
     * @param string $token The JWT access token.
     *
     * @return \Illuminate\Http\JsonResponse A JSON response containing the access token, token type, and expiration time.
     */

    protected function respondWithToken($token): JsonResponse
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60
        ]);
    }
}
