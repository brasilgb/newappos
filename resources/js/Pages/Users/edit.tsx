import { ABoxContainer, ABoxContent, ABoxFooter, ABoxHead } from '@/Components/ABox';
import BackButton from '@/Components/BackButton';
import { BreadCrumbTop } from '@/Components/BreadCrumbTop';
import HeaderTop from '@/Components/HeaderTop';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { rolesUser, statusUser } from '@/Utils/dataSelect';
import { maskCep, maskCpfCnpj, maskDate, maskPhone, unMask } from '@/Utils/mask';
import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeClosed } from 'lucide-react';
import React, { FormEventHandler, useState } from 'react';
import { IoHome, IoPerson, IoSave } from 'react-icons/io5';
import Select from 'react-select';

const Create = ({user}:any) => {
    const [showPasswordOne, setShowPasswordOne] = useState<boolean>(false);
    const [showPasswordTwo, setShowPasswordTwo] = useState<boolean>(false);

    const { data, setData, patch, errors, processing, reset, clearErrors } = useForm({
        name: user?.name,
        email: user?.email,
        telephone: user?.telephone,
        whatsapp: user?.whatsapp,
        roles: user?.roles,
        status: user?.status,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('users.update', user.id));
    }
    const changeRoles = (selected: any) => {
        setData('roles', selected?.value);
    }

    const changeStatus = (selected: any) => {
        setData('status', selected?.value);
    }

    const statusDefault = statusUser?.filter((o: any) => o.value == user?.status).map((opt: any) => ({ value: opt.value, label: opt.label }));
    const roleDefault = rolesUser?.filter((o: any) => o.value == user?.roles).map((opt: any) => ({ value: opt.value, label: opt.label }));
    
    return (
        <Authenticated
            header={
                <HeaderTop
                    icon={<IoPerson />}
                    title='Usuários'
                    breadcrumb={
                        <BreadCrumbTop
                            links={[
                                { url: "/users", label: "Usuários" },
                                { url: null, label: "Alterar usuário" },
                            ]}
                        />
                    }
                />
            }
        >
            <Head title="Usuários" />
            <ABoxContainer>
                <ABoxHead>
                    <BackButton href="users.index">Cancelar</BackButton>
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
                            <div className='col-span-2'>
                                <InputLabel htmlFor="email" value="E-mail" />
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
                            <div>
                                <InputLabel htmlFor="telephone" value="Telefone" />
                                <TextInput
                                    id="telephone"
                                    className="mt-1 block w-full"
                                    value={maskPhone(data.telephone)}
                                    onChange={(e) => setData('telephone', e.target.value)}
                                    autoComplete="telephone"
                                    maxLength={15}
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="whatsapp" value="WhatsApp" />
                                <TextInput
                                    id="whatsapp"
                                    className="mt-1 block w-full"
                                    value={data.whatsapp}
                                    onChange={(e) => setData('whatsapp', e.target.value)}
                                    onFocus={() => clearErrors('whatsapp')}
                                    autoComplete="whatsapp"
                                    maxLength={13}
                                />
                            </div>
                        </div>
                        <div className='sm:grid grid-cols-2 gap-4 sm:mt-4'>
                            <div>
                                <InputLabel htmlFor="password" value="Senha" />
                                <div className='relative'>
                                    <TextInput
                                        id="password"
                                        className="mt-1 block w-full"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        onFocus={() => clearErrors('password')}
                                        autoComplete="password"
                                        type={showPasswordOne ? 'text' : 'password'}
                                    />
                                    <div className='absolute top-2.5 right-2 text-gray-600'>
                                        <button
                                            type='button'
                                            onClick={() => setShowPasswordOne(!showPasswordOne)}
                                        >
                                            {showPasswordOne ? <EyeClosed /> : <Eye />}
                                        </button>
                                    </div>
                                </div>
                                <InputError className="mt-2" message={errors.password} />
                            </div>
                            <div>
                                <InputLabel htmlFor="password_confirmation" value="Repita a Senha" />
                                <div className='relative'>
                                <TextInput
                                    id="password_confirmation"
                                    className="mt-1 block w-full"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    onFocus={() => clearErrors('password_confirmation')}
                                    autoComplete="password_confirmation"
                                    type={showPasswordTwo ? 'text' : 'password'}
                                />
                                <div className='absolute top-2.5 right-2 text-gray-600'>
                                    <button
                                        type='button'
                                        onClick={() => setShowPasswordTwo(!showPasswordTwo)}
                                    >
                                        {showPasswordTwo ? <EyeClosed /> : <Eye />}
                                    </button>
                                </div>
                            </div>
                                <InputError className="mt-2" message={errors.password_confirmation} />
                            </div>
                        </div>
                        <div className='sm:grid grid-cols-2 gap-4 sm:mt-4'>
                            <div>
                                <InputLabel htmlFor="equipment" value="Função do usuário" />
                                <Select
                                    menuPosition='fixed'
                                    defaultValue={roleDefault}
                                    options={rolesUser}
                                    onChange={changeRoles}
                                    placeholder="Selecione o função"
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
                                <InputError className="mt-2" message={errors.roles} />
                            </div>
                            <div>
                                <InputLabel htmlFor="equipment" value="Status do usuário" />
                                <Select
                                    menuPosition='fixed'
                                    defaultValue={statusDefault}
                                    options={statusUser}
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