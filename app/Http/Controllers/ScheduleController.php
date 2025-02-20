<?php

namespace App\Http\Controllers;

use App\Http\Requests\ScheduleRequest;
use App\Models\Customer;
use App\Models\Schedule;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('q');
        $sdate = $request->get('dt');
        $status = $request->get('st');

        $query = Schedule::orderBy('id', 'DESC');
        if($sdate) {
            $query->whereDate('schedules', $sdate);
        }
        if($status) {
            $query->where('status', 'like', "%$status%");
        }
        if ($search) {
            $query = Schedule::where(function ($query) use ($search) {
                $query->where('id', 'like', "%$search%")
                    ->orWhere('service', 'like', "%$search%")
                    ->orWhere('schedules', 'like', "%$search%");
            })
                ->orWhereHas('customer', function ($query) use ($search) {
                    $query->where('name', 'like', "%$search%");
                })
                ->orWhereHas('user', function ($query) use ($search) {
                    $query->where('name', 'like', "%$search%");
                });
        }
        $schedules = $query->with('user')->with('customer')->paginate(12);
        return Inertia::render('Schedule/index', ['schedules' => $schedules]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $customers = Customer::get();
        $technicals = User::where('roles', 'tech')->orWhere('roles', 'admin')->where('status', 1)->get();
        return Inertia::render('Schedule/create', ['customers' => $customers, 'technicals' => $technicals]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ScheduleRequest $request): RedirectResponse
    {
        $data = $request->all();
        $validated = $request->validated();
        $data['id'] = Schedule::exists() ? Schedule::latest()->first()->id + 1 : 1;
        Schedule::create($data);
        return Redirect::route('schedule.index')->with(['title' => 'Cadastrar Agenda', 'success' => 'Agenda cadastrada com sucesso']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Schedule $schedule)
    {
        $customers = Customer::get();
        $technicals = User::where('roles', 'tech')->orWhere('roles', 'admin')->where('status', 1)->get();
        return Inertia::render('Schedule/edit', ['schedule' => $schedule, 'customers' => $customers, 'technicals' => $technicals]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Schedule $schedule)
    {
        return Redirect::route('schedule.show', ['schedule' => $schedule]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Schedule $schedule, ScheduleRequest $request): RedirectResponse
    {
        $data = $request->all();
        // dd($data);
        $validated = $request->validated();
        $schedule->update($data);
        return Redirect::route('schedule.index')->with(['title' => 'Editar Agenda', 'success' => 'Agenda editada com sucesso']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Schedule $schedule)
    {
        $schedule->delete();
        return Redirect::route('schedule.index')->with(['title' => 'Excluir Agenda', 'error' => 'Agenda excluida com sucesso']);
    }
}
