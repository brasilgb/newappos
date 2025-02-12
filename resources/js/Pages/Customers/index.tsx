import { ABoxContainer, ABoxContent, ABoxFooter, ABoxHead } from '@/Components/ABox';
import IconButton from '@/Components/IconButton';
import SearchInput from '@/Components/SearchInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { IoAdd, IoConstruct, IoPeople, IoTrash } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import ToastMessage from '@/Components/ToastMessages/message';
import { ATable, ATBody, ATd, ATh, ATHead, ATr } from '@/Components/ATables';
import DeleteButton from '@/Components/DeleteModal';
import Pagination from '@/Components/Pagination';
import { BiEdit } from 'react-icons/bi';
import HeaderTop from '@/Components/HeaderTop';
import { BreadCrumbTop } from '@/Components/BreadCrumbTop';
import { maskCnpj, maskCpfCnpj, maskPhone } from '@/Utils/mask';
import moment from 'moment';

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
        <HeaderTop
          icon={<IoPeople />}
          title='Clientes'
          breadcrumb={
            <BreadCrumbTop
              links={[
                { url: null, label: "Clientes" },
              ]}
            />
          }
        />
      }
    >
      <Head title="Clientes" />
      <ToastContainer />
      <ABoxContainer>
        <ABoxHead>
          <div>
            <SearchInput placeholder="Buscar por nome ou CPF/CNPJ" url="customers.index" />
          </div>
          <div>
            <IconButton
              title="Inserir cliente"
              href={route('customers.create')}
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
                  <ATd>{maskCpfCnpj(customer.cpf)}</ATd>
                  <ATd>{maskPhone(customer.phone)}</ATd>
                  <ATd>{moment(customer.created_at).format("DD/MM/YYYY")}</ATd>
                  <ATd>
                    <p className='flex justify-end gap-2'>
                      <IconButton
                        variant="order"
                        href={route('customers.edit', customer.id)}
                      >
                        <IoConstruct size={18} />
                      </IconButton>
                      <IconButton
                        variant="edit"
                        href={route('customers.edit', customer.id)}
                      >
                        <BiEdit size={18} />
                      </IconButton>
                      <DeleteButton param={customer.id} action="este usuário" />
                    </p>
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