<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserLoginApiTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testItReturnValidationErrorIfNotValid()
    {

        $response = $this->withHeader('Accept', 'application/json')
                    ->post('/api/login');

        $response->assertStatus(422);

    }

    public function testItRedirectIfNotValidCredentials()
    {
      $response = $this->withHeader('Accept', 'application/json')
                ->post('api/login', ['email' => 'dasdad@das.cas', 'password' => 123456]);

      $response->assertStatus(403);
      $response->assertJson([
        'message' => 'Invalid login credentials'
      ]);
    }

    public function testItCanReturnUserDataIfValidCredentials()
    {
      $response = $this->withHeaders([
        'Accept' => 'application/json'
      ])->post('/api/login', ['email' => 'm.k_chemist@yahoo.com', 'password' => 123456]);

      $response->assertStatus(200);
      $response->assertJson([
        'name' => 'Mohamed Kamal'
      ]);

    }
}
