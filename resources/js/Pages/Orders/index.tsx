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
import { statusOrdemByValue } from '@/Utils/functions';
import { colorStatus } from '@/Components/colors';

const Orders = ({ orders, flash }: any) => {

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
          title='Ordens'
          breadcrumb={
            <BreadCrumbTop
              links={[
                { url: null, label: "Ordens" },
              ]}
            />
          }
        />
      }
    >
      <Head title="Ordens" />
      <ToastContainer />
      <ABoxContainer>
        <ABoxHead>
          <div>
            <SearchInput placeholder="Buscar por ordem" url="ordens.index" />
          </div>
          <div>
            <IconButton
              title="Inserir ordem de seviço"
              href={route('orders.create')}
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
                <ATh>Cliente</ATh>
                <ATh>Telefone</ATh>
                <ATh>Recebimento</ATh>
                <ATh>Equipamento</ATh>
                <ATh>Modelo</ATh>
                <ATh>Status</ATh>
                <ATh>Entrega</ATh>
                <ATh><></></ATh>
              </ATr>
            </ATHead>
            <ATBody>
              {orders.data?.map((order: any) => (
                <ATr key={order.id}>
                  <ATd>{order.id}</ATd>
                  <ATd>{order.customer.name}</ATd>
                  <ATd>{maskPhone(order.customer.phone)}</ATd>
                  <ATd>{moment(order.created_at).format("DD/MM/YYYY")}</ATd>
                  <ATd>{order.equipment}</ATd>
                  <ATd>{order.model}</ATd>
                  <ATd><span className={colorStatus(order.service_status)}>{statusOrdemByValue(order.service_status)}</span></ATd>
                  <ATd>{order.delivery_date && moment(order.delivery_date).format("DD/MM/YYYY")}</ATd>
                  <ATd>
                    <p className='flex justify-end gap-2'>
                      <IconButton
                        variant="order"
                        href={route('orders.edit', order.id)}
                      >
                        <IoConstruct size={18} />
                      </IconButton>
                      <IconButton
                        variant="edit"
                        href={route('orders.edit', order.id)}
                      >
                        <BiEdit size={18} />
                      </IconButton>
                      <DeleteButton param={order.id} action="esta ordem" />
                    </p>
                  </ATd>
                </ATr>
              ))}
            </ATBody>
          </ATable>
        </ABoxContent>
        <ABoxFooter>
          {orders.total > orders.per_page &&
            <Pagination data={orders} />
          }
        </ABoxFooter>
      </ABoxContainer>
    </Authenticated>
  )
}

export default Orders;