<?php

namespace App\Services\User;

use App\Repositories\UserRepository;

use App\Models\User;
use Illuminate\Http\Request;
use App\Traits\HasImage;

class UserService
{

    use HasImage;

    protected UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getAllUsers()
    {
        return $this->userRepository->getAllUsers();
    }

    public function createUser(array $data, Request $request)
    {
        $data['image'] = $this->handleImageUpload($request, 'users') ?? null;
        $this->userRepository->create($data);
    }

    public function updateUser(User $user, array $data, Request $request)
    {
        $data['image'] = $this->handleImageUpload($request, 'users', $user->image);
        return $this->userRepository->update($user, $data);
    }

    public function deleteUser(User $user)
    {
        $this->deleteImage($user->image, 'users');
        return $this->userRepository->delete($user);
    }
}
