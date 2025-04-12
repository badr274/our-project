<?php

namespace App\Services\Auth;

use App\Factories\UserFactory;
use App\Strategies\Login\LoginStrategyInterface;

class AuthService
{
    protected UserFactory $userFactory;
    protected LoginStrategyInterface $loginStrategy;

    public function __construct(UserFactory $userFactory, LoginStrategyInterface $loginStrategy)
    {
        $this->userFactory = $userFactory;
        $this->loginStrategy = $loginStrategy;
    }

    public function register(array $data)
    {
        $user = $this->userFactory->create($data);
        $token = $user->createToken('auth_token')->plainTextToken;

        return ['user' => $user, 'token' => $token];
    }

    public function login(array $data)
    {
        return $this->loginStrategy->login($data);
    }
}
