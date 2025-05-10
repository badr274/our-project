<?php

namespace App\Http\Controllers\Api\Web\Contact;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Web\Contact\ContactRequest;
use App\Services\Contact\ContactService;


class ContactController extends Controller
{
    protected ContactService $contactService;

    public function __construct(ContactService $contactService)
    {
        $this->contactService = $contactService;
    }

    public function index()
    {
        $contacts = $this->contactService->getAll();
        return response()->json(['contacts' => $contacts]);
    }

    public function store(ContactRequest $request)
    {
        $this->contactService->store($request->validated());

        return response()->json(['message' => 'Message sent successfully'], 200);
    }
}
