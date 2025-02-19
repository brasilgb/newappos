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
import { equipamento, statusOrcamento } from '@/Utils/dataSelect';
import { maskMoney, maskMoneyDot, unMask } from '@/Utils/mask';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';
import { IoHome, IoSave } from 'react-icons/io5';
import Select from 'react-select';

const Create = ({ customers }: any) => {

    const optionsCustomer = customers.map((customer: any) => ({
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
        'service_status': '',
        'delivery_forecast': '', // previsao de entrega
        'observations': '',
    });

    useEffect(() => {
        if (data?.budget_value) {
            setData('budget_value', maskMoneyDot(data?.budget_value));
        }
    }, [data])

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('orders.store'), {
            onSuccess: () => reset(),
        });
    }

    const changeCustomer = (selected: any) => {
        setData('customer_id', selected?.value);
    }

    const changeEquipment = (selected: any) => {
        setData('equipment', selected?.value);
    };

    const changeServiceStatus = (selected: any) => {
        setData('service_status', selected?.value);
    };

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
                    <BackButton href="orders.index">Cancelar</BackButton>
                </ABoxHead>
                <form onSubmit={submit} autoComplete='off'>
                    <ABoxContent className='p-3'>
                        <div className='sm:grid grid-cols-8 gap-4 sm:mt-4'>
                            <div className='col-span-2'>
                                <InputLabel htmlFor="name" value="Cliente" />
                                <Select
                                    menuPosition='fixed'
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
                            <div className='col-span-2'>
                                <InputLabel htmlFor="equipment" value="Tipo de equipamento" />
                                <Select
                                    menuPosition='fixed'
                                    options={equipamento}
                                    onChange={changeEquipment}
                                    placeholder="Selecione o equipamento"
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
                                <InputError className="mt-2" message={errors.equipment} />
                            </div>
                            <div className='col-span-2'>
                                <InputLabel htmlFor="model" value="Modelo do equipamento" />
                                <TextInput
                                    id="model"
                                    className="mt-1 block w-full"
                                    value={data.model}
                                    onChange={(e) => setData('model', e.target.value)}
                                    autoComplete="model"
                                />
                            </div>
                            <div className=''>
                                <InputLabel htmlFor="password" value="Senha" />
                                <TextInput
                                    id="password"
                                    className="mt-1 block w-full"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    onFocus={() => clearErrors('password')}
                                    autoComplete="password"
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="delivery_forecast" value="Previsão de entrega" />
                                <TextInput
                                    type='date'
                                    id="delivery_forecast"
                                    className="mt-1 block w-full"
                                    value={data.delivery_forecast}
                                    onChange={(e) => setData('delivery_forecast', e.target.value)}
                                    autoComplete="delivery_forecast"
                                />
                            </div>
                        </div>
                        <div className='sm:grid grid-cols-3 gap-4 sm:mt-4'>
                            <div>
                                <InputLabel htmlFor="defect" value="Defeito relatado" />
                                <TextTextarea
                                    id="defect"
                                    className="mt-1 block w-full"
                                    value={data.defect}
                                    onChange={(e) => setData('defect', e.target.value)}
                                    autoComplete="defect"
                                />
                                <InputError className="mt-2" message={errors.defect} />
                            </div>
                            <div>
                                <InputLabel htmlFor="state_conservation" value="Estado de conservação" />
                                <TextTextarea
                                    id="state_conservation"
                                    className="mt-1 block w-full"
                                    value={data.state_conservation}
                                    onChange={(e) => setData('state_conservation', e.target.value)}
                                    autoComplete="state_conservation"
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="accessories" value="Acessórios" />
                                <TextTextarea
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
                                <TextTextarea
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
                                    value={maskMoney(data.budget_value)}
                                    onChange={(e) => setData('budget_value', e.target.value)}
                                    autoComplete="budget_value"
                                />
                            </div>
                            <div className=''>
                                <InputLabel htmlFor="service_status" value="Status do orçamento" />
                                <Select
                                    menuPosition='fixed'
                                    options={statusOrcamento}
                                    onChange={changeServiceStatus}
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
                            </div>
                        </div>
                        <div className='my-4'>
                            <InputLabel htmlFor="observations" value="Observações" />
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

export default Create;