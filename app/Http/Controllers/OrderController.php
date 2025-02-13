<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Models\Customer;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('q');
        $query = Order::with('customer')->orderBy('id', 'DESC');
        if ($search) { 
            $query->where('id', 'like', '%' . $search . '%');
        }
        $orders = $query->paginate(12)->withQueryString();
        return Inertia::render('Orders/index', ['orders' => $orders]);
    
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $customers = Customer::get();
        return Inertia::render('Orders/create', ['customers' => $customers]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store( OrderRequest $request ): RedirectResponse
    {
        $data = $request->all();
        $validated = $request->validated();
        $data['id'] = Order::exists() ? Order::latest()->first()->id + 1 : 1;
        Order::create($data);
        return Redirect::route('orders.index')->with(['title' => 'Cadastrar Ordem', 'success' => 'Ordem cadastrada com sucesso']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
