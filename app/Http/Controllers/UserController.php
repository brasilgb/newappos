<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('q');
        $query = User::orderBy('id', 'DESC');
        if ($search) {
            $query->where('name', 'like', '%' . $search . '%');
        }
        $users = $query->paginate(12);
        return Inertia::render('Users/index', ['users' => $users]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Users/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request): RedirectResponse
    {
        $data = $request->all();
        $validate = $request->validated();
        $data['id'] = User::exists() ? User::latest()->first()->id + 1 : 1;
        User::create($data);
        return Redirect::route('users.index')->with(['title' => 'Cadastra Usuário', 'success' => 'Usuário cadastrado com sucesso']);
    }

    /**
     * Display the specified resource.
     */
    public function show( User $user )
    {
        return Inertia::render('Users/edit', ['user' => $user]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit( User $user )
    {
        return Redirect::route('users.show', ['user' => $user]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update( User $user, UserRequest $request ): RedirectResponse
    {
        $data = $request->all();
        $validated = $request->validated();
        $data['password'] = $request->password ? Hash::make($request->password) : $user->password;
        $user->update($data);
        return Redirect::route('users.index')->with(['title' => 'Editar Usuário', 'success' => 'Usuário editado com sucesso']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( User $user )
    {
        $user->delete();
        return Redirect::route('users.index')->with(['title' => 'Excluir Usuário', 'error' => 'Usuário excluido com sucesso']);
    }
}
