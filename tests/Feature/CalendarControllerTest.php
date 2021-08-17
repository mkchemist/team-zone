<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CalendarControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testItGetAllCalendars()
    {
        $response = $this->withHeader('Accept', 'application/json')
                      ->get('/api/users/calendars?api_token=v7UM3RTtIgdhWIaT');

        $response->assertStatus(200);


        $response->assertJsonCount(3, "data");
    }


}
