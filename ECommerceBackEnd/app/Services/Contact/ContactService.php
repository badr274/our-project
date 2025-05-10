<?php

namespace App\Services\Contact;

use App\Models\Contact;
use App\Repositories\ContactRepository;

class ContactService
{
    protected $contactRepository;

    public function __construct(ContactRepository $contactRepository)
    {
        $this->contactRepository = $contactRepository;
    }

    public function store($data)
    {
        return $this->contactRepository->store($data);
    }

    public function getAll()
    {
        return $this->contactRepository->getAll();
    }
}
