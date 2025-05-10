<?php

namespace App\Http\Requests\API\Admin\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => 'required|string|min:2',
            'email' => 'required|string|email|unique:users',
            'role' => 'required|in:user,admin,manager',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg',
        ];

        if ($this->isMethod('POST')) {
            $rules['password'] = ['required', Password::min(8)->mixedCase()->numbers()->symbols()];
        } else {
            $rules['password'] = ['nullable', Password::min(8)->mixedCase()->numbers()->symbols()];
        }

        return $rules;
    }
}
