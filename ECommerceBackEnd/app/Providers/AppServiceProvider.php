<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Strategies\Login\LoginStrategyInterface;
use App\Strategies\Login\DefaultLoginStrategy;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register()
    {
        $this->app->bind(LoginStrategyInterface::class, DefaultLoginStrategy::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
