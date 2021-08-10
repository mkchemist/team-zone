<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserLoginTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testItCanRedirectIfNoCredentials()
    {
        $response = $this->post('/login');

        $response->assertRedirect('/');
        $response->assertSessionHasErrors([
          'email',
          'password'
        ]);
    }

    public function testItRedirectIfNotValidCredentials()
    {
      $response = $this->post('login', ['email' => 'dasdad@das.cas', 'password' => 123456]);

      $response->assertStatus(302);

      $response->assertSessionHas('error', 'Invalid login credentials');
    }

    public function testItRedirectAuthenticatedUsersToDashbaord()
    {
      $response = $this->post('/login', ['email' => 'm.k_chemist@yahoo.com', 'password' => 123456]);

      $response->assertRedirect('/dashboard');
    }
}
