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
import { equipamento, statusServico } from '@/Utils/dataSelect';
import { maskMoney, maskMoneyDot } from '@/Utils/mask';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';
import { IoHome, IoSave } from 'react-icons/io5';
import Select from 'react-select';

const Edit = ({ customers, order }: any) => {

    const optionsCustomer = customers.map((customer: any) => ({
        value: customer.id,
        label: customer.name,
    }));

    const { data, setData, patch, errors, processing, reset, clearErrors } = useForm({
        'customer_id': order.customer_id,
        'equipment': order.equipment, // equipamento
        'model': order.model,
        'password': order.password,
        'defect': order.defect,
        'state_conservation': order.state_conservation, //estado de conservação
        'accessories': order.accessories,
        'budget_description': order.budget_description, // descrição do orçamento
        'budget_value': order.budget_value, // valor do orçamento

        'services_performed': order.services_performed, // servicos executados
        'parts': order.parts,
        'parts_value': order.parts_value,
        'service_value': order.service_value,
        'service_cost': order.service_cost, // custo
        'delivery_date': order.delivery_date, // data de entrega
        'responsible_technician': order.responsible_technician, // tecnico

        'service_status': order.service_status,
        'delivery_forecast': order.delivery_forecast, // previsao de entrega
        'observations': order.observations
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // setData('budget_value', maskMoneyDot(data?.budget_value));
        patch(route('orders.update', order?.id));
    }

    useEffect(() => {
        if (data?.budget_value) {
            setData((data: any) => ({ ...data, budget_value: maskMoneyDot(data?.budget_value) }));
            setData((data: any) => ({ ...data, parts_value: maskMoneyDot(data?.parts_value) }));
            setData((data: any) => ({ ...data, service_value: maskMoneyDot(data?.service_value) }));
            setData((data: any) => ({ ...data, service_cost: maskMoneyDot(data?.service_cost) }));
        }
    }, [])

    const changeCustomer = (selected: any) => {
        setData('customer_id', selected?.value);
    }

    const changeEquipment = (selected: any) => {
        setData('equipment', selected?.value);
    };

    const changeServiceStatus = (selected: any) => {
        setData('service_status', selected?.value);
    };

    const changeResponsibleTechnician = (selected: any) => {
        setData('responsible_technician', selected?.value);
    };

    const defaultCustomer = optionsCustomer?.filter((o: any) => o.value == order?.customer_id).map((opt: any) => ({ value: opt.value, label: opt.label }));
    const defaultEquipament = equipamento?.filter((o: any) => o.value == order?.equipment).map((opt: any) => ({ value: opt.value, label: opt.label }));
    const statusDefault = statusServico?.filter((o: any) => o.value == order?.service_status).map((opt: any) => ({ value: opt.value, label: opt.label }));

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
                            <div className='col-span-2'>
                                <InputLabel htmlFor="equipment" value="Tipo de equipamento" />
                                <Select
                                    menuPosition='fixed'
                                    defaultValue={defaultEquipament}
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
                        <div className='sm:grid grid-cols-3 gap-4 sm:mt-4'>
                            <div className='col-span-2'>
                                <InputLabel htmlFor="budget_description" value="Descrição do orçamento" />
                                <TextTextarea
                                    id="budget_description"
                                    className="mt-1 block w-full"
                                    value={data.budget_description}
                                    onChange={(e) => setData('budget_description', e.target.value)}
                                    autoComplete="budget_description"
                                />
                            </div>
                            <div className=''>
                                <InputLabel htmlFor="budget_value" value="Valor do orçamento" />
                                <TextInput
                                    id="budget_value"
                                    className="mt-1 block w-full"
                                    value={maskMoney(data.budget_value)}
                                    onChange={(e) => setData('budget_value', e.target.value)}
                                    autoComplete="budget_value"
                                />
                            </div>
                        </div>

                        <div className='sm:grid grid-cols-5 gap-4 sm:mt-4'>
                            <div className='col-span-2'>
                                <InputLabel htmlFor="parts" value="Peças adicionadas" />
                                <TextInput
                                    id="parts"
                                    className="mt-1 block w-full"
                                    value={data.parts}
                                    onChange={(e) => setData('parts', e.target.value)}
                                    autoComplete="parts"
                                />
                            </div>
                            <div className=''>
                                <InputLabel htmlFor="parts_value" value="Valor das peças" />
                                <TextInput
                                    id="parts_value"
                                    className="mt-1 block w-full"
                                    value={maskMoney(data.parts_value.toString())}
                                    onChange={(e) => setData('parts_value', e.target.value)}
                                    autoComplete="parts_value"
                                />
                            </div>
                            <div className=''>
                                <InputLabel htmlFor="service_value" value="Valor do serviço" />
                                <TextInput
                                    id="service_value"
                                    className="mt-1 block w-full"
                                    value={maskMoney(data.service_value.toString())}
                                    onChange={(e) => setData('service_value', e.target.value)}
                                    autoComplete="service_value"
                                />
                            </div>
                            <div className=''>
                                <InputLabel htmlFor="service_cost" value="Valor total" />
                                <TextInput
                                    id="service_cost"
                                    className="mt-1 block w-full"
                                    value={maskMoney(data.service_cost.toString())}
                                    onChange={(e) => setData('service_cost', e.target.value)}
                                    autoComplete="service_cost"
                                />
                            </div>
                        </div>

                        <div className='sm:grid grid-cols-2 gap-4 sm:mt-4'>
                            <div className=''>
                                <InputLabel htmlFor="responsible_technician" value="Técnico Responsável" />
                                <Select
                                    menuPosition='fixed'
                                    options={statusServico}
                                    onChange={changeResponsibleTechnician}
                                    placeholder="Selecione o técnico"
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
                            <div className=''>
                                <InputLabel htmlFor="service_status" value="Status da Ordem" />
                                <Select
                                    menuPosition='fixed'
                                    defaultValue={statusDefault}
                                    options={statusServico}
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

                        <div className='sm:grid grid-cols-2 gap-4 sm:mt-4'>
                            <div className='my-4'>
                                <InputLabel htmlFor="services_performed" value="Serviços executados" />
                                <TextTextarea
                                    id="services_performed"
                                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full"
                                    value={data.services_performed}
                                    onChange={(e) => setData('services_performed', e.target.value)}
                                />
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