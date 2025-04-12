<?php

namespace App\Strategies\Login;

interface LoginStrategyInterface
{
    public function login(array $credentials): array;
}
