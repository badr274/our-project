<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

trait HasImage
{
    public function handleImageUpload(Request $request, string $folder = 'uploads', $oldImage = null): ?string
    {
        if (!$request->hasFile('image')) {
            return null;
        }

        $this->deleteImage($oldImage, $folder);

        return $request->file('image')->store($folder, 'public');
    }

    public function deleteImage(?string $img, string $folder = 'uploads'): void
    {
        if ($img && Storage::disk('public')->exists($img)) {
            Storage::disk('public')->delete($img);
        }
    }
}
