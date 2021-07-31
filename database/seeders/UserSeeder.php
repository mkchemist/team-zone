<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
          [
            'name' => 'Mohamed Kamal',
            'email' => 'm.k_chemist@yahoo.com',
            'password' => Hash::make(123456),
            'api_token' => Str::random()
          ],
          [
            'name' => 'Alaa Adel',
            'email' => 'alaa_adel@nerhadou.com',
            'password' => Hash::make(123456),
            'api_token' => Str::random()
          ],
          [
            'name' => 'Heba Abdelaal',
            'email' => 'heba_abdelaal@nerhadou.com',
            'password' => Hash::make(123456),
            'api_token' => Str::random()
          ],
        ]);
    }
}
