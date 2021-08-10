<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CreateServiceCommand extends Command
{


    protected $serviceNamespace = "App\Services";
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:service {service} {--model=} {--force}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create new model service class';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $service = $this->argument('service');
        $model = $this->option("model");
        $force = $this->option('force');
        if($model) {
          $model = "App\\Models\\$model;";
        }
        $class = $this->getClassName($service);
        $this->info("Creating {$class->name} service");
        $template = file_get_contents(base_path()."/stubs/service.stub");
        $template = str_replace([
          "{{ class }}",
          "{{ namespace }}",
          "{{ serviceModelRequire }}",
          "{{ serviceModel }}"
        ], [
          $class->name,
          $class->namespace,
          "use ".$model,
          $model
        ], $template);
        if(file_exists($class->classFullPath) && !$force) {
          $this->error('File already exists');
          return 0;
        }
        $this->createServiceFile($class->dirFullPath, $class->classFullPath, $template);
        $this->info("Service {$class->name} created");
        return 0;
    }

    private function getClassName(string $class)
    {
      $namespace = $this->serviceNamespace;
      $name = $class;
      $dir = "";

      if(strpos($class, "/")) {
        $parts = explode("/", $class);
        $namespace .= "\\".$parts[0];
        $dir = $parts[0];
        $name = $parts[1];
      }

      $dirFullPath =app_path().DIRECTORY_SEPARATOR."Services".DIRECTORY_SEPARATOR.$dir;
      $classFullPath = $dirFullPath.DIRECTORY_SEPARATOR.$name.".php";

      return (object)[
        'name' => $name,
        'namespace' => $namespace,
        "dir" => $dir,
        'dirFullPath' => $dirFullPath,
        'classFullPath' => $classFullPath
      ];
    }


    private function createServiceFile($dir, $class, $content)
    {
      if(!is_dir($dir)) {
        mkdir($dir);
      }

      file_put_contents($class, $content);
    }
  }
