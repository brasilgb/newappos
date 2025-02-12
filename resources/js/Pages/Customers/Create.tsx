import { ABoxContainer, ABoxContent, ABoxFooter, ABoxHead } from '@/Components/ABox';
import BackButton from '@/Components/BackButton';
import { BreadCrumbTop } from '@/Components/BreadCrumbTop';
import HeaderTop from '@/Components/HeaderTop';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { maskCep, maskCpfCnpj, maskDate, maskPhone, unMask } from '@/Utils/mask';
import { Head, useForm } from '@inertiajs/react';
import React, { FormEventHandler } from 'react';
import { IoHome, IoPeople, IoPerson, IoSave } from 'react-icons/io5';

const Create = () => {

    const { data, setData, post, errors, processing, reset, clearErrors } = useForm({
        'name': '',
        'birth': '',
        'cpf': '',
        'mail': '',
        'cep': '',
        'uf': '',
        'city': '',
        'neighborhood': '',
        'street': '',
        'complement': '',
        'number': '',
        'phone': '',
        'contact': '',
        'whatsapp': '',
        'phonecontact': '',
        'obs': ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('customers.store'), {
            onSuccess: () => reset(),
        });
    }
    
    const getCep = (cep: string) => {
        const cleanCep = unMask(cep);
        fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
            .then((response) => response.json())
            .then((result) => {
                setData((data) => ({ ...data, uf: result.uf }));
                setData((data) => ({ ...data, city: result.localidade }));
                setData((data) => ({ ...data, neighborhood: result.bairro }));
                setData((data) => ({ ...data, street: result.logradouro }));
                setData((data) => ({
                    ...data,
                    complement: result.complemento,
                }));
            })
            .catch((error) => console.error(error));
    };

    return (
        <Authenticated
            header={
                <HeaderTop
                    icon={<IoHome />}
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
                <form onSubmit={submit}>
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
                                    maxLength={15}
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
                                <InputLabel htmlFor="mail" value="E-mail" />
                                <TextInput
                                    id="mail"
                                    className="mt-1 block w-full"
                                    value={data.mail}
                                    onChange={(e) => setData('mail', e.target.value)}
                                    onFocus={() => clearErrors('mail')}
                                    autoComplete="mail"
                                />
                                <InputError className="mt-2" message={errors.mail} />
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
                                    onBlur={(e) => getCep(e.target.value)}
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
                            <InputLabel htmlFor="obs" value="Observações" />
                            <textarea
                                id="obs"
                                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full"
                                value={data.obs}
                                onChange={(e) => setData('obs', e.target.value)}
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