<?php

namespace App\Repositories;

use App\Models\Contact;

class ContactRepository
{
    public function store($data)
    {
        return Contact::create($data);
    }

    public function getAll()
    {
        return Contact::all();
    }
}
