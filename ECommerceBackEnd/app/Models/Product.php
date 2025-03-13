<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'price',
        'image',
        'category_id',
        'discount',
        'stock',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function orders()
    {
        return $this->belongsToMany(Order::class)->withPivot('quantity', 'price_at_order');
    }


    public function carts()
    {
        return $this->belongsToMany(Cart::class)->withPivot('quantity');
    }

    public function wishlists()
    {
        return $this->belongsToMany(Wishlist::class);
    }
}
