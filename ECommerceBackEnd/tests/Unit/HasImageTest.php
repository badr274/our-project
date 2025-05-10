<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Traits\HasImage;

class HasImageTest extends TestCase
{
    use HasImage;

    public function test_handle_image_upload_saves_file()
    {
        Storage::fake('public');

        $file = UploadedFile::fake()->image('test.jpg');

        $request = Request::create('/upload', 'POST', [], [], ['image' => $file]);

        $path = $this->handleImageUpload($request, 'test-uploads');

        $this->assertTrue(Storage::disk('public')->exists($path));
    }

    public function test_handle_image_upload_returns_null_if_no_file()
    {
        $request = Request::create('/upload', 'POST');

        $this->assertNull($this->handleImageUpload($request, 'test-uploads'));
    }

    public function test_delete_image_removes_existing_file()
    {
        Storage::fake('public');

        $file = UploadedFile::fake()->image('delete-me.jpg');
        $path = $file->store('test-uploads', 'public');

        $this->deleteImage($path, 'test-uploads');

        $this->assertFalse(Storage::disk('public')->exists($path));
    }
}
