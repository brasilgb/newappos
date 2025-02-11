import { ABoxContainer, ABoxContent, ABoxFooter, ABoxHead } from '@/Components/ABox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React, { FormEventHandler } from 'react';
import { IoPeople, IoPerson, IoSave } from 'react-icons/io5';

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

    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    <IoPeople size={30} /> Clientes
                </h2>
            }
        >
            <Head title="Clientes" />
            <ABoxContainer>
                <ABoxHead>Header</ABoxHead>
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
                                    value={data.cpf}
                                    onChange={(e) => setData('cpf', e.target.value)}
                                    onFocus={() => clearErrors('cpf')}
                                    isFocused
                                    autoComplete="cpf"
                                />
                                <InputError className="mt-2" message={errors.cpf} />
                            </div>
                            <div>
                                <InputLabel htmlFor="birth" value="Nascimento" />
                                <TextInput
                                    id="birth"
                                    className="mt-1 block w-full"
                                    value={data.birth}
                                    onChange={(e) => setData('birth', e.target.value)}
                                    isFocused
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
                                    isFocused
                                    autoComplete="mail"
                                />
                                <InputError className="mt-2" message={errors.mail} />
                            </div>
                        </div>
                        <div className='sm:grid grid-cols-6 gap-4 sm:mt-4'>
                            <div>
                                <InputLabel htmlFor="cep" value="CEP" />
                                <TextInput
                                    id="cep"
                                    className="mt-1 block w-full"
                                    value={data.cep}
                                    onChange={(e) => setData('cep', e.target.value)}
                                    isFocused
                                    autoComplete="cep"
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="uf" value="UF" />
                                <TextInput
                                    id="uf"
                                    className="mt-1 block w-full"
                                    value={data.uf}
                                    onChange={(e) => setData('uf', e.target.value)}
                                    isFocused
                                    autoComplete="uf"
                                />
                            </div>
                            <div className='col-span-2'>
                                <InputLabel htmlFor="city" value="Cidade" />
                                <TextInput
                                    id="city"
                                    className="mt-1 block w-full"
                                    value={data.city}
                                    onChange={(e) => setData('city', e.target.value)}
                                    isFocused
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
                                    isFocused
                                    autoComplete="neighborhood"
                                />
                            </div>
                        </div>
                        <div className='sm:grid grid-cols-5 gap-4 sm:mt-4'>
                            <div>
                                <InputLabel htmlFor="phone" value="Telefone" />
                                <TextInput
                                    id="phone"
                                    className="mt-1 block w-full"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    onFocus={() => clearErrors('phone')}
                                    isFocused
                                    autoComplete="phone"
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
                                    isFocused
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
                                    isFocused
                                    autoComplete="contact"
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="phonecontact" value="Tel. Contato" />
                                <TextInput
                                    id="phonecontact"
                                    className="mt-1 block w-full"
                                    value={data.phonecontact}
                                    onChange={(e) => setData('phonecontact', e.target.value)}
                                    isFocused
                                    autoComplete="phonecontact"
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
                            <IoSave className='text-lg' /> Save
                        </PrimaryButton>
                    </ABoxFooter>
                </form>
            </ABoxContainer>
        </Authenticated>
    )
}

export default Create;