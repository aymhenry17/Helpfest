<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
   public function register(Request $request) {
       $fields = $request->validate([
           'username' => 'required|string',
           'password' => 'required|string|confirmed'
           
       ]);
      $user = User::create([
          'username' => $fields['username'],
          'password' => bcrypt($fields['password'])
      ]);

      $token = $user->createToken('myapptoken')->plainTextToken;

      $response = [
          'user' => $user,
          'token' => $token
      ];

      return response($response, 201);
   }
}