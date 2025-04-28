<?php

namespace App\Http\Requests\API\Cart;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Product;

class CartRequest extends FormRequest
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
        return [
            'product_id' => 'required|exists:products,id',
            'quantity' => [
                'required',
                'numeric',
                function ($attribute, $value, $fail) {
                    $product = Product::find($this->product_id);
                    if ($product && $value > $product->stock) {
                        $fail('The quantity cannot be greater than the available stock.');
                    }
                },
            ],
        ];
    }
}
