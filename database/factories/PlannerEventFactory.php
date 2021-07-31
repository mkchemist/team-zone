<?php

namespace Database\Factories;

use App\Models\PlannerEvent;
use Illuminate\Database\Eloquent\Factories\Factory;

class PlannerEventFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = PlannerEvent::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $date = $this->faker->date('20y-08-d');
        return [
          'user_id' => rand(1,3),
          'planner_id' => rand(1,4),
          'title' => $this->faker->name,
          'start' => $date,
          'end' => $date,
          'allDay' => $this->faker->boolean(),
          'fav' => $this->faker->boolean()
        ];
    }
}
