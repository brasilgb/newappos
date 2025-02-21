import { ABoxContainer, ABoxContent, ABoxFooter, ABoxHead } from '@/Components/ABox';
import IconButton from '@/Components/IconButton';
import SearchInput from '@/Components/SearchInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { IoAdd, IoCalendar } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import ToastMessage from '@/Components/ToastMessages/message';
import { ATable, ATBody, ATd, ATh, ATHead, ATr } from '@/Components/ATables';
import Pagination from '@/Components/Pagination';
import { BiEdit } from 'react-icons/bi';
import HeaderTop from '@/Components/HeaderTop';
import { BreadCrumbTop } from '@/Components/BreadCrumbTop';
import moment from 'moment';
import { statusAgendaByValue } from '@/Utils/functions';
import DeleteModal from '@/Components/DeleteModal';
import { colorStatus } from '@/Components/colors';
import { DataFilter } from '@/Components/Calendar/DataFilter';
import { useAppContext } from '@/Contexts/AppContext';
import { statusAgenda, statusOrcamento } from '@/Utils/dataSelect';

const Schedule = ({ schedules, flash }: any) => {

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
          icon={<IoCalendar />}
          title='Agenda'
          breadcrumb={
            <BreadCrumbTop
              links={[
                { url: null, label: "Agenda" },
              ]}
            />
          }
        />
      }
    >
      <Head title="Agenda" />
      <ToastContainer />
      <ABoxContainer>
        <ABoxHead>
          <div>
            <SearchInput placeholder="Buscar por ( id, serviço, cliente ou técnico)" url="schedule.index" />
          </div>
          <div>
            <DataFilter select={statusAgenda} url="schedule.index" />
          </div>
          <div>
            <IconButton
              title="Inserir agenda"
              href={route('schedule.create')}
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
                <ATh>Horário da Visita</ATh>
                <ATh>Serviço</ATh>
                <ATh>Técnico</ATh>
                <ATh>Status</ATh>
                <ATh>Solicitação</ATh>
                <ATh><></></ATh>
              </ATr>
            </ATHead>
            <ATBody>
              {schedules.data?.map((schedule: any) => (
                <ATr key={schedule.id}>
                  <ATd>{schedule.id}</ATd>
                  <ATd>{schedule.customer.name}</ATd>
                  <ATd>{moment(schedule.schedules).format("DD/MM/YYYY HH:mm")}</ATd>
                  <ATd>{schedule.service}</ATd>
                  <ATd>{schedule.user.name}</ATd>
                  <ATd><span className={colorStatus(schedule.status)}>{statusAgendaByValue(schedule.status)}</span></ATd>
                  <ATd>{moment(schedule.created_at).format("DD/MM/YYYY")}</ATd>
                  <ATd>
                    <p className='flex justify-end gap-2'>
                      <IconButton
                        variant="edit"
                        href={route('schedule.edit', schedule.id)}
                      >
                        <BiEdit size={18} />
                      </IconButton>
                      <DeleteModal param={schedule.id} action="esta agenda" routerName="schedule" />
                    </p>
                  </ATd>
                </ATr>
              ))}
            </ATBody>
          </ATable>
        </ABoxContent>
        <ABoxFooter>
          {schedules.total > schedules.per_page &&
            <Pagination data={schedules} />
          }
        </ABoxFooter>
      </ABoxContainer>
    </Authenticated>
  )
}

export default Schedule;