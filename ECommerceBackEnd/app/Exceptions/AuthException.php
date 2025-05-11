<?php

namespace App\Exceptions;

use Exception;

class AuthException extends Exception
{
    public static function invalidCredentials(): self
    {
        return new self('Email or password is incorrect');
    }

    public static function insufficientPermissions(): self
    {
        return new self('Access denied. Not an admin or manager');
    }

    public static function unauthenticated(): self
    {
        return new self('Unauthenticated');
    }
} 