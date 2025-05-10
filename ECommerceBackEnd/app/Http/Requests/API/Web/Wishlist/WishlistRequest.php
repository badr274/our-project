<?php

namespace App\Http\Requests\API\Web\Wishlist;

use Illuminate\Foundation\Http\FormRequest;

class WishlistRequest extends FormRequest
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
        $userId = auth()->user()->id;
        return [
            'product_id' => 'required|exists:products,id|unique:wishlists,product_id,user_id,' . $userId,
        ];
    }
}
