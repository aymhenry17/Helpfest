<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    function creeProduct(Request $request)
    {

        $product = new Product;
        $product->name = $request->name;
        $product->price = $request->price;
        $product->category = $request->category;
        $product->save();

        return response()->json([
            "message" => "creation d'un product reussi",
            "products" => $product,
        ], 201);
    }
}
