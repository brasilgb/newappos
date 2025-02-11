import { FormEventHandler, useState } from "react";
import SecondaryButton from "./SecondaryButton";
import DangerButton from "./DangerButton";
import Modal from "./Modal";
import { useForm } from "@inertiajs/react";
import { IoTrash } from "react-icons/io5";

export default function DeleteModal({
    param,
    action
}: any) {

    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);

    const {
        delete: destroy,
        processing
        } = useForm();

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route('customers.destroy',  param ), {
            preserveScroll: true,
            onSuccess: () => closeModal()
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
    };

    return (
        <>
            <DangerButton onClick={confirmUserDeletion} className="!p-1.5">
                <IoTrash size={18} />
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal} maxWidth="md">
                <form onSubmit={deleteUser}>
                    <h2 className="text-sm text-red-600 font-semibold border-b p-2 uppercase">
                        Excluir {`${action}`}
                    </h2>
                    <div className="flex items-center justify-center py-2 text-red-400">
                        <IoTrash size={50} />
                    </div>
                    <div>
                        <p className="text-center text-lg text-gray-600">
                            Tem certeza de que deseja excluir {`${action}`}?
                        </p>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Todos os seus dados serão excluídos permanentemente.
                        </p>
                    </div>

                    <div className="mt-6 flex justify-end p-3">
                        <SecondaryButton onClick={closeModal}>
                            Cancelar
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Excluir
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}
