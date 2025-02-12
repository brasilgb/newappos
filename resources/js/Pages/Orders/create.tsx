import { ABoxContainer, ABoxContent, ABoxFooter, ABoxHead } from '@/Components/ABox';
import BackButton from '@/Components/BackButton';
import { BreadCrumbTop } from '@/Components/BreadCrumbTop';
import HeaderTop from '@/Components/HeaderTop';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { statusOrcamento } from '@/Utils/dataSelect';
import { maskCep, maskCpfCnpj, maskDate, maskPhone, unMask } from '@/Utils/mask';
import { Head, useForm } from '@inertiajs/react';
import React, { FormEventHandler } from 'react';
import { IoHome, IoPeople, IoPerson, IoSave } from 'react-icons/io5';
import Select from 'react-select';

const Create = ({ customers }: any) => {

    const options = customers.map((customer: any) => ({
        value: customer.id,
        label: customer.name,
    }));

    const { data, setData, post, errors, processing, reset, clearErrors } = useForm({
        'customer_id': '',
        'equipment': '', // equipamento
        'model': '',
        'password': '',
        'defect': '',
        'state_conservation': '', //estado de conservação
        'accessories': '',
        'budget_description': '', // descrição do orçamento
        'budget_value': '', // valor do orçamento
        'services_performed': '', // servicos executados
        'parts': '',
        'parts_value': '',
        'service_value': '',
        'service_cost': '', // custo
        'delivery_forecast': '', // previsao de entrega
        'service_status': '',
        'delivery_date': '', // data de entrega
        'responsible_technician': '', // tecnico
        'observations': ''
    });
    const handleChange = (selected: any) => {
        setData(
          'customer_id',
          selected.map((v: any) => v.value)
        );
      };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('orders.store'), {
            onSuccess: () => reset(),
        });
    }

    return (
        <Authenticated
            header={
                <HeaderTop
                    icon={<IoHome />}
                    title='Ordens'
                    breadcrumb={
                        <BreadCrumbTop
                            links={[
                                { url: "/orders", label: "Ordens" },
                                { url: null, label: "Adicionar ordem" },
                            ]}
                        />
                    }
                />
            }
        >
            <Head title="Ordens" />
            <ABoxContainer>
                <ABoxHead>
                    <BackButton href="customers.index">Cancelar</BackButton>
                </ABoxHead>
                <form onSubmit={submit}>
                    <ABoxContent className='p-3'>
                        <div className='sm:grid grid-cols-6 gap-4 sm:mt-4'>
                            <div className='col-span-2'>
                                <InputLabel htmlFor="name" value="Cliente" />
                                <Select
                                    options={options}
                                    onChange={handleChange}
                                    placeholder="Selecione o cliente"
                                    styles={{
                                        multiValueLabel: base => ({
                                            ...base,
                                            backgroundColor: '#00AEEF',
                                            color: 'white',
                                        }),
                                    }}
                                />
                                <InputError className="mt-2" message={errors.customer_id} />
                            </div>
                            <div>
                                <InputLabel htmlFor="equipment" value="Tipo de equipamento" />
                                <Select
                                    options={options}
                                    onChange={handleChange}
                                    placeholder="Selecione o equipamento"
                                    styles={{
                                        multiValueLabel: base => ({
                                            ...base,
                                            backgroundColor: '#00AEEF',
                                            color: 'white',
                                        }),
                                    }}
                                />
                                <InputError className="mt-2" message={errors.equipment} />
                            </div>
                            <div>
                                <InputLabel htmlFor="model" value="Modelo do equipamento" />
                                <TextInput
                                    id="model"
                                    className="mt-1 block w-full"
                                    value={data.model}
                                    onChange={(e) => setData('model', e.target.value)}
                                    autoComplete="model"
                                />
                            </div>
                            <div className='col-span-2'>
                                <InputLabel htmlFor="password" value="Senha" />
                                <TextInput
                                    id="password"
                                    className="mt-1 block w-full"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    onFocus={() => clearErrors('password')}
                                    autoComplete="password"
                                />
                                <InputError className="mt-2" message={errors.password} />
                            </div>
                        </div>
                        <div className='sm:grid grid-cols-7 gap-4 sm:mt-4'>
                            <div>
                                <InputLabel htmlFor="delivery_forecast" value="Previsão de entrega" />
                                <TextInput
                                type='datetime-local'
                                    id="delivery_forecast"
                                    className="mt-1 block w-full"
                                    value={maskCep(data.delivery_forecast)}
                                    onChange={(e) => setData('delivery_forecast', e.target.value)}
                                    autoComplete="delivery_forecast"
                                    maxLength={9}
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="defect" value="Defeito relatado" />
                                <TextInput
                                    id="defect"
                                    className="mt-1 block w-full"
                                    value={data.defect}
                                    onChange={(e) => setData('defect', e.target.value)}
                                    autoComplete="defect"
                                />
                            </div>
                            <div className='col-span-3'>
                                <InputLabel htmlFor="state_conservation" value="Estado de conservação" />
                                <TextInput
                                    id="state_conservation"
                                    className="mt-1 block w-full"
                                    value={data.state_conservation}
                                    onChange={(e) => setData('state_conservation', e.target.value)}
                                    autoComplete="state_conservation"
                                />
                            </div>
                            <div className='col-span-2'>
                                <InputLabel htmlFor="accessories" value="Acessórios" />
                                <TextInput
                                    id="accessories"
                                    className="mt-1 block w-full"
                                    value={data.accessories}
                                    onChange={(e) => setData('accessories', e.target.value)}
                                    autoComplete="accessories"
                                />
                            </div>
                        </div>
                        <div className='sm:grid grid-cols-5 gap-4 sm:mt-4'>
                            <div className='col-span-2'>
                                <InputLabel htmlFor="budget_description" value="Descrição pré-orçamento" />
                                <TextInput
                                    id="budget_description"
                                    className="mt-1 block w-full"
                                    value={data.budget_description}
                                    onChange={(e) => setData('budget_description', e.target.value)}
                                    autoComplete="budget_description"
                                />
                            </div>
                            <div className='col-span-2'>
                                <InputLabel htmlFor="budget_value" value="Valor pré-orçamento" />
                                <TextInput
                                    id="budget_value"
                                    className="mt-1 block w-full"
                                    value={data.budget_value}
                                    onChange={(e) => setData('budget_value', e.target.value)}
                                    autoComplete="budget_value"
                                />
                            </div>
                            <div className=''>
                                <InputLabel htmlFor="service_status" value="Status do orçamento" />
                                <Select
                                    options={statusOrcamento}
                                    onChange={handleChange}
                                    placeholder="Selecione o equipamento"
                                    styles={{
                                        multiValueLabel: base => ({
                                            ...base,
                                            backgroundColor: '#00AEEF',
                                            color: 'white',
                                        }),
                                    }}
                                />
                            </div>
                        </div>
                        <div className='my-4'>
                            <InputLabel htmlFor="observations" value="Observações" />
                            <textarea
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

export default Create;