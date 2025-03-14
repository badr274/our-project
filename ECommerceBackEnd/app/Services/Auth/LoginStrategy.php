<?php

namespace App\Services\Auth;

interface LoginStrategy
{
    public function login(array $data);
}
