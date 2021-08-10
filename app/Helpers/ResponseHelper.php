<?php

namespace App\Helpers;

use Exception;

class ResponseHelper {

  /**
   * return server error response
   *
   * @param Exception $e
   * @return \Illuminate\Http\Response
   */
  public static function serverError(Exception $e) {
    return response([
      'error' => $e->getMessage(),
      "line" => $e->getLine(),
      "file" => $e->getFile(),
      "timestamp" => date("20y-m-d h:i:s a")
    ], 500);
  }

  /**
   * return Item already exists
   *
   * @param string $text
   * @return \Illuminate\Http\Response
   */
  public static function alreadyExists(array $additional = [])
  {

    $response = array_merge([
      'message' => "ITEM ALREADY EXISTS",
      'status' => 409,
      'timestamp' => date('20y-m-d h:i:s a'),
    ], $additional);
    return response($response, 409);
  }

  /**
   * Invalid resource Id response
   *
   * @param string $text
   * @return \Illuminate\Http\Response
   */
  public static function invalidResourceId(array $additional = [])
  {

    $response = array_merge([
      'message' => 'RESOURCE NOT FOUND',
      'status' => 409,
      'timestamp' => date('20y-m-d h:i:s a'),
    ], $additional);

    return response($response, 404);
  }


  public static function unauthorized(array $data = [])
  {
    $response = array_merge([
      'message' => 'UNAUTHORIZED ACTION',
      'timestamp' => date('20y-m-d h:i:s a'),
      'status' => 401
    ]);

    return response($response, 401);
  }
}
