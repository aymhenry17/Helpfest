<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Command;

class AddcommandController extends Controller
{
    function addCommand(Request $request)
    {

        $command = new Command();
        $command->product_id = $request->product_id;
        $command->users_id = $request->users_id;
        $command->tente_id = $request->tente_id;
        $command->statut = $request->statut;
        $command->price = $request->price;
        $command->date = $request->date;
        $command->save();

        return response()->json([
            "message" => "creation d'une commande reussi",
            "commands" => $command,
        ], 201);
    }
}
