import { ABoxContainer, ABoxContent, ABoxFooter, ABoxHead } from '@/Components/ABox';
import IconButton from '@/Components/IconButton';
import SearchInput from '@/Components/SearchInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { IoAdd, IoTrash } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import ToastMessage from '@/Components/ToastMessages/message';
import { ATable, ATBody, ATd, ATh, ATHead, ATr } from '@/Components/ATables';
import DeleteButton from '@/Components/DeleteModal';
import Pagination from '@/Components/Pagination';

const Customers = ({ customers, flash }: any) => {

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
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Clientes
        </h2>}
    >
      <Head title="Clientes" />
      <ToastContainer />
      <ABoxContainer>
        <ABoxHead>
          <div>
            <SearchInput placeholder={''} url="customers.index" />
          </div>
          <div>
            <IconButton
              href={route('customers.create')}
            >
              <IoAdd size={18} />
            </IconButton>
          </div>
        </ABoxHead>
        <ABoxContent>
          <ATable>
            <ATHead>
              <ATr>
                <ATh>#</ATh>
                <ATh>Nome</ATh>
                <ATh>E-mail</ATh>
                <ATh>CPF/CNPJ</ATh>
                <ATh>Telefone</ATh>
                <ATh>Cadastro</ATh>
                <ATh><></></ATh>
              </ATr>
            </ATHead>
            <ATBody>
              {customers.data?.map((customer: any) => (
                <ATr key={customer.id}>
                  <ATd>{customer.id}</ATd>
                  <ATd>{customer.name}</ATd>
                  <ATd>{customer.mail}</ATd>
                  <ATd>{customer.cpf}</ATd>
                  <ATd>{customer.phone}</ATd>
                  <ATd>{customer.created_at}</ATd>
                  <ATd>
                    <DeleteButton param={customer.id} action="este usuário" />
                  </ATd>
                </ATr>
              ))}
            </ATBody>
          </ATable>
        </ABoxContent>
        <ABoxFooter>
          {customers.total > customers.per_page &&
            <Pagination data={customers} />
          }
        </ABoxFooter>
      </ABoxContainer>
    </Authenticated>
  )
}

export default Customers;