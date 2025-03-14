<?php

namespace App\Services\Auth;

class LoginContext
{
    private LoginStrategy $strategy;

    public function __construct(?LoginStrategy $strategy = null)
    {
        $this->strategy = $strategy ?? new DefaultLogin();
    }

    public function setStrategy(LoginStrategy $strategy)
    {
        $this->strategy = $strategy;
    }

    public function login(array $data)
    {
        return $this->strategy->login($data);
    }
}
