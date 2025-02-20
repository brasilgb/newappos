<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerRequest;
use App\Models\Customer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('q');
        $query = Customer::orderBy('id', 'DESC');
        if ($search) { 
            $query->where('name', 'like', '%' . $search . '%')
                  ->orWhere('cpf', 'like', '%' . $search . '%');
        }
        $customers = $query->paginate(12);
        return Inertia::render('Customers/index', ['customers' => $customers]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Customers/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store( CustomerRequest $request ): RedirectResponse
    {
        $data = $request->all();
        $validated = $request->validated();
        $data['id'] = Customer::exists() ? Customer::latest()->first()->id + 1 : 1;
        Customer::create($data);
        return Redirect::route('customers.index')->with(['title' => 'Cadastra Cliente', 'success' => 'Cliente cadastrado com sucesso']);
    }

    /**
     * Display the specified resource.
     */
    public function show( Customer $customer )
    {
        return Inertia::render('Customers/edit', ['customer' => $customer]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        return Redirect::route('customers.show', ['customer' => $customer]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update( Customer $customer, CustomerRequest $request ): RedirectResponse
    {
        $data = $request->all();
        $validated = $request->validated();
        $customer->update($data);
        return Redirect::route('customers.index')->with(['title' => 'Editar Cliente', 'success' => 'Cliente editado com sucesso']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        $customer->delete();
        return Redirect::route('customers.index')->with(['title' => 'Excluir Cliente', 'error' => 'Cliente excluido com sucesso']);
    }
}
