import "./ReservationForm.css";
import { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useToast } from "../../hooks/useToast";

type FormData = {
  name: string;
  phone: string;
};

type Props = {
  itemName: string;
  form: FormData;
  setForm: Dispatch<SetStateAction<FormData>>;
 onConfirm: (isPix?: boolean) => Promise<void>;
  onClose: () => void;
  loading: boolean;
};

export function ReservationForm({
  itemName,
  form,
  setForm,
  onConfirm,
  onClose,
  loading,
}: Props) {
  const [closing, setClosing] = useState(false);
  const [copied, setCopied] = useState(false);

  const { showToast } = useToast(); // ✅ AGORA NO LUGAR CERTO
  const validateForm = () => {
    if (!form.name.trim()) {
      showToast("Informe seu nome", "error");
      return false;
    }

    if (!form.phone || form.phone.length < 14) {
      showToast("Telefone inválido", "error");
      return false;
    }

    return true;
  };
  // 🔒 trava scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(20);
    }

    setClosing(true);

    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handlePhoneChange = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 11);

    let formatted = numbers;

    if (numbers.length > 2) {
      formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }

    if (numbers.length > 7) {
      formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    }

    setForm({ ...form, phone: formatted });
  };

  // 🔥 copiar PIX + confirmar
  const copyPix = async () => {
    if (!validateForm()) return;

    try {
      await navigator.clipboard.writeText("71999999999");

      if ("vibrate" in navigator) {
        navigator.vibrate([20, 40, 20]);
      }

      await onConfirm(true); // 🔥 salva no firebase

      showToast("PIX copiado e presente confirmado 💛", "success");

      setCopied(true);

      setTimeout(() => {
        handleClose();
      }, 800);

    } catch {
      showToast("Erro ao copiar PIX 😢", "error");
    }
  };

  const handleConfirm = async () => {
    if (!validateForm()) return;

    try {
      await onConfirm(false);
      showToast("Presente confirmado 🎉", "success");
      handleClose();
    } catch {
      showToast("Erro ao confirmar 😢", "error");
    }
  };

  return (
    <div
      className={`sheet-overlay ${closing ? "fade-out" : ""}`}
      onClick={handleClose}
    >
      <div
        className={`sheet ${closing ? "slide-down" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-handle" />

        <h2 className="sheet-title">Presentear 🎁</h2>
        <p className="sheet-subtitle">{itemName}</p>

        <div className="form-group">
          <input
            placeholder="Seu nome"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Celular (WhatsApp)"
            value={form.phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
          />
        </div>

        <button
          className="sheet-confirm"
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? "Salvando..." : "Confirmar presente 🎉"}
        </button>

        {/* 💰 PIX */}
        <div className="pix">
          <h3 className="pix__title">Prefere enviar um PIX? 💛</h3>

          <p className="pix__key">Chave: 71999999999</p>

          <QRCodeCanvas
            value="71999999999"
            size={140}
            bgColor="#ffffff"
            fgColor="#5c4b44"
          />

          <button className="pix__button" onClick={copyPix} >
            {copied ? "Copiado! 💛" : "Copiar chave PIX"}
          </button>
        </div>

        <button className="sheet-close" onClick={handleClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
}