import { ABoxContainer, ABoxContent, ABoxFooter, ABoxHead } from '@/Components/ABox';
import IconButton from '@/Components/IconButton';
import SearchInput from '@/Components/SearchInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { IoAdd, IoConstruct, IoPeople, IoPerson, IoTrash } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import ToastMessage from '@/Components/ToastMessages/message';
import { ATable, ATBody, ATd, ATh, ATHead, ATr } from '@/Components/ATables';
import DeleteButton from '@/Components/DeleteModal';
import Pagination from '@/Components/Pagination';
import { BiEdit } from 'react-icons/bi';
import HeaderTop from '@/Components/HeaderTop';
import { BreadCrumbTop } from '@/Components/BreadCrumbTop';
import { maskCpfCnpj, maskPhone } from '@/Utils/mask';
import moment from 'moment';
import { roleUserByValue, statusUserByValue } from '@/Utils/functions';

const Users = ({ users, flash }: any) => {

  useEffect(() => {
    if (flash.message.success) {
      toast.success(ToastMessage, {
        data: {
          title: flash.message.title,
          message: flash.message.success
        },
        className: 'sm:w-96 border border-green-600/50',
      },
      );
    }

    if (flash.message.error) {
      toast.error(ToastMessage, {
        data: {
          title: flash.message.title,
          message: flash.message.error
        },
        className: 'sm:w-96 border border-red-600/50',
      },
      );
    }
  }, [flash]);

  return (
    <Authenticated
      header={
        <HeaderTop
          icon={<IoPerson />}
          title='Usuários'
          breadcrumb={
            <BreadCrumbTop
              links={[
                { url: null, label: "Usuários" },
              ]}
            />
          }
        />
      }
    >
      <Head title="Usuários" />
      <ToastContainer />
      <ABoxContainer>
        <ABoxHead>
          <div>
            <SearchInput placeholder="Buscar por nome" url="users.index" />
          </div>
          <div>
            <IconButton
              title="Inserir usuário"
              href={route('users.create')}
            >
              <IoAdd size={20} />
            </IconButton>
          </div>
        </ABoxHead>
        <ABoxContent>
          <ATable>
            <ATHead>
              <ATr>
                <ATh>#</ATh>
                <ATh>Nome</ATh>
                <ATh>Telefone</ATh>
                <ATh>Função</ATh>
                <ATh>Status</ATh>
                <ATh>Cadastro</ATh>
                <ATh><></></ATh>
              </ATr>
            </ATHead>
            <ATBody>
              {users.data?.map((user: any) => (
                <ATr key={user.id}>
                  <ATd>{user.id}</ATd>
                  <ATd>{user.name}</ATd>
                  <ATd>{user.telephone}</ATd>
                  <ATd>{roleUserByValue(user.roles)}</ATd>
                  <ATd>{statusUserByValue(user.status)}</ATd>
                  <ATd>{moment(user.created_at).format("DD/MM/YYYY")}</ATd>
                  <ATd>
                    <p className='flex justify-end gap-2'>
                      <IconButton
                        variant="order"
                        href={route('users.edit', user.id)}
                      >
                        <IoConstruct size={18} />
                      </IconButton>
                      <IconButton
                        variant="edit"
                        href={route('users.edit', user.id)}
                      >
                        <BiEdit size={18} />
                      </IconButton>
                      <DeleteButton param={user.id} action="este usuário" />
                    </p>
                  </ATd>
                </ATr>
              ))}
            </ATBody>
          </ATable>
        </ABoxContent>
        <ABoxFooter>
          {users.total > users.per_page &&
            <Pagination data={users} />
          }
        </ABoxFooter>
      </ABoxContainer>
    </Authenticated>
  )
}

export default Users;