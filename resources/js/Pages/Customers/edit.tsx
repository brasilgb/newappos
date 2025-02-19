import { ABoxContainer, ABoxContent, ABoxFooter, ABoxHead } from '@/Components/ABox';
import BackButton from '@/Components/BackButton';
import { BreadCrumbTop } from '@/Components/BreadCrumbTop';
import HeaderTop from '@/Components/HeaderTop';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { maskCep, maskCpfCnpj, maskPhone } from '@/Utils/mask';
import { Head, useForm } from '@inertiajs/react';
import React, { FormEventHandler } from 'react';
import { IoPeople, IoPerson, IoSave } from 'react-icons/io5';

const Edit = ({ customer }: any) => {

    const { data, setData, patch, errors, processing, reset, clearErrors } = useForm({
        'name': customer?.name,
        'birth': customer?.birth,
        'cpf': customer?.cpf,
        'email': customer?.email,
        'cep': customer?.cep,
        'uf': customer?.uf,
        'city': customer?.city,
        'neighborhood': customer?.neighborhood,
        'street': customer?.street,
        'complement': customer?.complement,
        'number': customer?.number,
        'phone': customer?.phone,
        'contact': customer?.contact,
        'whatsapp': customer?.whatsapp,
        'phonecontact': customer?.phonecontact,
        'observations': customer?.observations
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('customers.update', customer?.id));
    }

    return (
        <Authenticated
            header={
                <HeaderTop
                    icon={<IoPeople />}
                    title='Clientes'
                    breadcrumb={
                        <BreadCrumbTop
                            links={[
                                { url: "/customers", label: "Clientes" },
                                { url: null, label: "Adicionar cliente" },
                            ]}
                        />
                    }
                />
            }
        >
            <Head title="Clientes" />
            <ABoxContainer>
                <ABoxHead>
                    <BackButton href="customers.index">Cancelar</BackButton>
                </ABoxHead>
                <form onSubmit={submit} autoComplete='off'>
                    <ABoxContent className='p-3'>
                        <div className='sm:grid grid-cols-6 gap-4 sm:mt-4'>
                            <div className='col-span-2'>
                                <InputLabel htmlFor="name" value="Nome" />
                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    onFocus={() => clearErrors('name')}
                                    isFocused
                                    autoComplete="name"
                                />
                                <InputError className="mt-2" message={errors.name} />
                            </div>
                            <div>
                                <InputLabel htmlFor="cpf" value="CPF/CNPJ" />
                                <TextInput
                                    id="cpf"
                                    className="mt-1 block w-full"
                                    value={maskCpfCnpj(data.cpf)}
                                    onChange={(e) => setData('cpf', e.target.value)}
                                    onFocus={() => clearErrors('cpf')}
                                    autoComplete="cpf"
                                    maxLength={11}
                                />
                                <InputError className="mt-2" message={errors.cpf} />
                            </div>
                            <div>
                                <InputLabel htmlFor="birth" value="Nascimento" />
                                <TextInput
                                    type='date'
                                    id="birth"
                                    className="mt-1 block w-full"
                                    value={data.birth}
                                    onChange={(e) => setData('birth', e.target.value)}
                                    autoComplete="birth"
                                />
                            </div>
                            <div className='col-span-2'>
                                <InputLabel htmlFor="email" value="E-email" />
                                <TextInput
                                    id="email"
                                    className="mt-1 block w-full"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    onFocus={() => clearErrors('email')}
                                    autoComplete="email"
                                />
                                <InputError className="mt-2" message={errors.email} />
                            </div>
                        </div>
                        <div className='sm:grid grid-cols-7 gap-4 sm:mt-4'>
                            <div>
                                <InputLabel htmlFor="cep" value="CEP" />
                                <TextInput
                                    id="cep"
                                    className="mt-1 block w-full"
                                    value={maskCep(data.cep)}
                                    onChange={(e) => setData('cep', e.target.value)}
                                    autoComplete="cep"
                                    maxLength={9}
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="uf" value="UF" />
                                <TextInput
                                    id="uf"
                                    className="mt-1 block w-full"
                                    value={data.uf}
                                    onChange={(e) => setData('uf', e.target.value)}
                                    autoComplete="uf"
                                />
                            </div>
                            <div className='col-span-3'>
                                <InputLabel htmlFor="city" value="Cidade" />
                                <TextInput
                                    id="city"
                                    className="mt-1 block w-full"
                                    value={data.city}
                                    onChange={(e) => setData('city', e.target.value)}
                                    autoComplete="city"
                                />
                            </div>
                            <div className='col-span-2'>
                                <InputLabel htmlFor="neighborhood" value="Bairro" />
                                <TextInput
                                    id="neighborhood"
                                    className="mt-1 block w-full"
                                    value={data.neighborhood}
                                    onChange={(e) => setData('neighborhood', e.target.value)}
                                    autoComplete="neighborhood"
                                />
                            </div>
                        </div>
                        <div className='sm:grid grid-cols-5 gap-4 sm:mt-4'>
                            <div className='col-span-2'>
                                <InputLabel htmlFor="street" value="Logradouro" />
                                <TextInput
                                    id="street"
                                    className="mt-1 block w-full"
                                    value={data.street}
                                    onChange={(e) => setData('street', e.target.value)}
                                    autoComplete="street"
                                />
                            </div>
                            <div className='col-span-2'>
                                <InputLabel htmlFor="complement" value="Complemento" />
                                <TextInput
                                    id="complement"
                                    className="mt-1 block w-full"
                                    value={data.complement}
                                    onChange={(e) => setData('complement', e.target.value)}
                                    autoComplete="complement"
                                />
                            </div>
                            <div className=''>
                                <InputLabel htmlFor="number" value="Número" />
                                <TextInput
                                    id="number"
                                    className="mt-1 block w-full"
                                    value={data.number}
                                    onChange={(e) => setData('number', e.target.value)}
                                    autoComplete="number"
                                />
                            </div>
                        </div>
                        <div className='sm:grid grid-cols-5 gap-4 sm:mt-4'>
                            <div>
                                <InputLabel htmlFor="phone" value="Telefone" />
                                <TextInput
                                    id="phone"
                                    className="mt-1 block w-full"
                                    value={maskPhone(data.phone)}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    onFocus={() => clearErrors('phone')}
                                    autoComplete="phone"
                                    maxLength={15}
                                />
                                <InputError className="mt-2" message={errors.phone} />
                            </div>
                            <div>
                                <InputLabel htmlFor="whatsapp" value="WhatsApp" />
                                <TextInput
                                    id="whatsapp"
                                    className="mt-1 block w-full"
                                    value={data.whatsapp}
                                    onChange={(e) => setData('whatsapp', e.target.value)}
                                    autoComplete="whatsapp"
                                />
                            </div>
                            <div className='col-span-2'>
                                <InputLabel htmlFor="contact" value="Contato" />
                                <TextInput
                                    id="contact"
                                    className="mt-1 block w-full"
                                    value={data.contact}
                                    onChange={(e) => setData('contact', e.target.value)}
                                    autoComplete="contact"
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="phonecontact" value="Tel. Contato" />
                                <TextInput
                                    id="phonecontact"
                                    className="mt-1 block w-full"
                                    value={maskPhone(data.phonecontact)}
                                    onChange={(e) => setData('phonecontact', e.target.value)}
                                    autoComplete="phonecontact"
                                    maxLength={15}
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

export default Edit;