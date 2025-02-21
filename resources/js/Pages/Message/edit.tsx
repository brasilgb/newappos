import { ABoxContainer, ABoxContent, ABoxFooter, ABoxHead } from '@/Components/ABox';
import BackButton from '@/Components/BackButton';
import { BreadCrumbTop } from '@/Components/BreadCrumbTop';
import HeaderTop from '@/Components/HeaderTop';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import TextTextarea from '@/Components/TextTextarea';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { statusAgenda } from '@/Utils/dataSelect';
import { Head, useForm } from '@inertiajs/react';
import React, { FormEventHandler } from 'react';
import { IoCalendar, IoSave } from 'react-icons/io5';
import Select from 'react-select';

const Edit = ({ schedule, customers, technicals }: any) => {

    const optionsCustomer = customers.map((customer: any) => ({
        value: customer.id,
        label: customer.name,
    }));
    const optionsTechnical = technicals.map((technical: any) => ({
        value: technical.id,
        label: technical.name,
    }));

    const { data, setData, patch, errors, processing, reset, clearErrors } = useForm({
        'customer_id': schedule?.customer_id,
        'schedules': schedule?.schedules,
        'service': schedule?.service,
        'details': schedule?.details,
        'user_id': schedule?.user_id,
        'status': schedule?.status,
        'observations': schedule?.observations
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('schedule.update', schedule?.id));
    }

    const changeCustomer = (selected: any) => {
        setData('customer_id', selected?.value);
    }

    const changeTechnical = (selected: any) => {
        setData('user_id', selected?.value);
    }

    const changeStatus = (selected: any) => {
        setData('status', selected?.value);
    }

    const defaultCustomer = optionsCustomer?.filter((o: any) => o.value == schedule?.customer_id).map((opt: any) => ({ value: opt.value, label: opt.label }));
    const defaultTechnical = optionsTechnical?.filter((o: any) => o.value == schedule?.user_id).map((opt: any) => ({ value: opt.value, label: opt.label }));
    const defaultStatus = statusAgenda?.filter((o: any) => o.value == schedule?.status).map((opt: any) => ({ value: opt.value, label: opt.label }));

    return (
        <Authenticated
            header={
                <HeaderTop
                    icon={<IoCalendar />}
                    title='Agenda'
                    breadcrumb={
                        <BreadCrumbTop
                            links={[
                                { url: "/schedule", label: "Agenda" },
                                { url: null, label: "Editar agenda" },
                            ]}
                        />
                    }
                />
            }
        >
            <Head title="Agendas" />
            <ABoxContainer>
                <ABoxHead>
                    <BackButton href="schedule.index">Cancelar</BackButton>
                </ABoxHead>
                <form onSubmit={submit} autoComplete='off'>
                    <ABoxContent className='p-3'>
                        <div className='sm:grid grid-cols-3 gap-4 sm:mt-4'>
                            <div className='col-span-2'>
                                <InputLabel htmlFor="name" value="Cliente" />
                                <Select
                                    menuPosition='fixed'
                                    defaultValue={defaultCustomer}
                                    options={optionsCustomer}
                                    onChange={changeCustomer}
                                    placeholder="Selecione o cliente"
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            fontSize: '15px',
                                            paddingTop: '2.5px',
                                            paddingBottom: '2.5px',
                                            marginTop: '4px'
                                        }),
                                        dropdownIndicator: (base) => ({
                                            ...base,
                                            paddingTop: '2.5px',
                                            paddingBottom: '2.5px',
                                        }),
                                        menuList: (base) => ({
                                            ...base,
                                            fontSize: '14px',
                                        }),
                                    }}
                                />
                                <InputError className="mt-2" message={errors.customer_id} />
                            </div>
                            <div>
                                <InputLabel htmlFor="schedules" value="Horário da Visita" />
                                <TextInput
                                    id="schedules"
                                    type='datetime-local'
                                    className="mt-1 block w-full"
                                    value={data.schedules}
                                    onChange={(e) => setData('schedules', e.target.value)}
                                    onFocus={() => clearErrors('schedules')}
                                    autoComplete="schedules"
                                />
                                <InputError className="mt-2" message={errors.schedules} />
                            </div>
                        </div>

                        <div className='sm:grid grid-cols-2 gap-4 sm:mt-4'>
                            <div>
                                <InputLabel htmlFor="service" value="Serviços Requisitados" />
                                <TextTextarea
                                    id="service"
                                    className="mt-1 block w-full"
                                    value={data.service}
                                    onChange={(e) => setData('service', e.target.value)}
                                    onFocus={() => clearErrors('service')}
                                    autoComplete="service"
                                />
                                <InputError className="mt-2" message={errors.service} />
                            </div>
                            <div>
                                <InputLabel htmlFor="details" value="Detalhes do Serviço" />
                                <TextTextarea
                                    id="details"
                                    className="mt-1 block w-full"
                                    value={data.details}
                                    onChange={(e) => setData('details', e.target.value)}
                                    onFocus={() => clearErrors('details')}
                                    autoComplete="details"
                                />
                                <InputError className="mt-2" message={errors.details} />
                            </div>
                        </div>

                        <div className='sm:grid grid-cols-2 gap-4 sm:mt-4'>
                            <div>
                                <InputLabel htmlFor="user_id" value="Técnico Responsável" />
                                <Select
                                    menuPosition='fixed'
                                    defaultValue={defaultTechnical}
                                    options={optionsTechnical}
                                    onChange={changeTechnical}
                                    placeholder="Selecione o Técnico"
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            fontSize: '15px',
                                            paddingTop: '2.5px',
                                            paddingBottom: '2.5px',
                                            marginTop: '4px'
                                        }),
                                        dropdownIndicator: (base) => ({
                                            ...base,
                                            paddingTop: '2.5px',
                                            paddingBottom: '2.5px',
                                        }),
                                        menuList: (base) => ({
                                            ...base,
                                            fontSize: '14px',
                                        }),
                                    }}
                                />
                                <InputError className="mt-2" message={errors.user_id} />
                            </div>
                            <div>
                                <InputLabel htmlFor="status" value="Status da Agenda" />
                                <Select
                                    menuPosition='fixed'
                                    defaultValue={defaultStatus}
                                    options={statusAgenda}
                                    onChange={changeStatus}
                                    placeholder="Selecione o status"
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            fontSize: '15px',
                                            paddingTop: '2.5px',
                                            paddingBottom: '2.5px',
                                            marginTop: '4px'
                                        }),
                                        dropdownIndicator: (base) => ({
                                            ...base,
                                            paddingTop: '2.5px',
                                            paddingBottom: '2.5px',
                                        }),
                                        menuList: (base) => ({
                                            ...base,
                                            fontSize: '14px',
                                        }),
                                    }}
                                />
                                <InputError className="mt-2" message={errors.status} />
                            </div>
                        </div>
                        <div className='my-4'>
                            <InputLabel htmlFor="observations" value="Outras Informações" />
                            <TextTextarea
                                id="observations"
                                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full"
                                value={data.observations}
                                onChange={(e) => setData('observations', e.target.value)}
                            />
                        </div>
                    </ABoxContent>
                    <ABoxFooter className='border-t'>
                        <PrimaryButton disabled={processing} className='gap-2'>
                            <IoSave className='text-base' /> Salvar
                        </PrimaryButton>
                    </ABoxFooter>
                </form>
            </ABoxContainer>
        </Authenticated>
    )
}

export default Edit;