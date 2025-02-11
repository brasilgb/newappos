<?php

namespace App\Http\Controllers;

use App\AddsToast;
use App\Http\Requests\StoreCustomerRequest;
use App\Models\Customer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = Customer::paginate(2);

        return Inertia::render('Customers/index', ['customers' => $customers]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Customers/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store( StoreCustomerRequest $request ): RedirectResponse
    {
        $data = $request->all();
        $validated = $request->validated();
        $data['id'] = Customer::latest()->first()->id + 1;
        Customer::create($data);
        return Redirect::route('customers.index')->with(['title' => 'Cadastro', 'success' => 'Cliente cadastrado com sucesso']);

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
    public function destroy(Customer $customer)
    {
        $customer->delete();
        return Redirect::route('customers.index')->with(['title' => 'Excluido', 'error' => 'Cliente excluido com sucesso']);
    }
}
