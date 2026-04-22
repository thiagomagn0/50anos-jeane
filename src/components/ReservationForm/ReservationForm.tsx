import "./ReservationForm.css";
import type { Dispatch, SetStateAction } from "react";

type FormData = {
  name: string;
  phone: string;
};

type Props = {
  itemName: string;
  form: FormData;
  setForm: Dispatch<SetStateAction<FormData>>;
  onConfirm: () => void;
  onClose: () => void;
  loading: boolean; // 👈 ESSENCIAL
};

export function ReservationForm({ itemName, form, setForm, onConfirm, onClose, loading }: Props) {
  const handlePhoneChange = (value: string) => {
  // remove tudo que não for número
  let numbers = value.replace(/\D/g, "");

  // limita a 11 dígitos
  numbers = numbers.slice(0, 11);

  // aplica máscara
  let formatted = numbers;

  if (numbers.length > 2) {
    formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  }

  if (numbers.length > 7) {
    formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  }

  setForm({ ...form, phone: formatted });
};
  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose} />

      <div className="modal__content">
        <div className="modal__header"> 
        <h2 className="modal__title">Presentear: {itemName}</h2>
         {/* <button className="modal__close" onClick={onClose}>
          ✕
        </button> */}
        </div>
     

        <input
          className="modal__input"
          autoFocus
          placeholder="Seu nome"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          className="modal__input"
          placeholder="Celular (Whatsapp)"
          value={form.phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
        />
        <button
            className="modal__button"
            onClick={onConfirm}
            disabled={loading}
            >
            {loading ? "Salvando..." : "Confirmar"}
            </button>
      </div>
    </div>
  );
}